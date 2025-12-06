import { Link } from 'react-router-dom'

function ReleaseCard({ release, type }) {
    const getTypeRoute = () => {
        switch (type) {
            case 'india':
                return 'india'
            case 'global':
                return 'global'
            case 'movies':
                return 'movies'
            default:
                return 'india'
        }
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <Link to={`/release/${getTypeRoute()}/${release.id}`} className="card">
            <img
                src={release.poster}
                alt={release.title}
                className="card-image"
                loading="lazy"
            />
            <div className="card-content">
                <h3 className="card-title">{release.title}</h3>
                <div className="card-meta">
                    {release.platform && (
                        <span className="badge badge-platform">{release.platform}</span>
                    )}
                    {release.region && (
                        <span className="badge badge-region">{release.region}</span>
                    )}
                    <span className="card-date">{formatDate(release.releaseDate)}</span>
                </div>
                <div className="card-genres">
                    {release.genre?.slice(0, 2).map(g => (
                        <span key={g} className="badge badge-genre">{g}</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default ReleaseCard
