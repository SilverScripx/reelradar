import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function ReleaseDetail() {
    const { type, id } = useParams()
    const [release, setRelease] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRelease = async () => {
            try {
                let dataFile
                switch (type) {
                    case 'india':
                        dataFile = '/data/india.json'
                        break
                    case 'global':
                        dataFile = '/data/global.json'
                        break
                    case 'movies':
                        dataFile = '/data/movies.json'
                        break
                    default:
                        throw new Error('Invalid release type')
                }

                const data = await fetch(dataFile).then(res => res.json())
                const found = data.find(item => item.id === id)

                if (!found) {
                    throw new Error('Release not found')
                }

                setRelease(found)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchRelease()
    }, [type, id])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getBackLink = () => {
        switch (type) {
            case 'india': return '/india'
            case 'global': return '/global'
            case 'movies': return '/movies'
            default: return '/'
        }
    }

    const getBackLabel = () => {
        switch (type) {
            case 'india': return 'India OTT'
            case 'global': return 'Global OTT'
            case 'movies': return 'Movies'
            default: return 'Home'
        }
    }

    if (loading) {
        return (
            <div className="page">
                <div className="container text-center">
                    <p className="text-muted animate-pulse">Loading release details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">❌</div>
                        <p className="empty-state-title">{error}</p>
                        <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{release.title} | ReelRadar</title>
                <meta name="description" content={release.description?.slice(0, 160)} />
            </Helmet>

            <div className="page">
                <div className="container">
                    <Link to={getBackLink()} className="btn btn-ghost mb-8">
                        ← Back to {getBackLabel()}
                    </Link>

                    <div className="detail-container">
                        <div className="detail-poster">
                            <img src={release.poster} alt={release.title} />
                        </div>

                        <div className="detail-info">
                            <h1 className="detail-title">{release.title}</h1>

                            <div className="detail-meta">
                                {release.platform && (
                                    <span className="badge badge-platform">{release.platform}</span>
                                )}
                                {release.region && (
                                    <span className="badge badge-region">{release.region}</span>
                                )}
                                {release.rating && (
                                    <span className="badge badge-genre">{release.rating}</span>
                                )}
                            </div>

                            <p className="text-muted">
                                📅 {formatDate(release.releaseDate)}
                            </p>

                            {release.genre && (
                                <div className="detail-meta">
                                    {release.genre.map(g => (
                                        <span key={g} className="badge badge-genre">{g}</span>
                                    ))}
                                </div>
                            )}

                            <p className="detail-description">{release.description}</p>

                            {release.director && (
                                <div className="detail-section">
                                    <h3 className="detail-section-title">Director</h3>
                                    <p>{release.director}</p>
                                </div>
                            )}

                            {release.cast && release.cast.length > 0 && (
                                <div className="detail-section">
                                    <h3 className="detail-section-title">Cast</h3>
                                    <div className="detail-cast">
                                        {release.cast.map(member => (
                                            <span key={member} className="detail-cast-member">{member}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {release.language && (
                                <div className="detail-section">
                                    <h3 className="detail-section-title">Language</h3>
                                    <p>{release.language}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReleaseDetail
