import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fetchAllData } from '../services/dataService'

function Recommend() {
    const [allItems, setAllItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [picking, setPicking] = useState(false)

    // Load all data on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const { india, global, movies } = await fetchAllData()

                // Add source type to each item for proper linking and display
                const indiaWithType = india.map(item => ({ ...item, sourceType: 'india' }))
                const globalWithType = global.map(item => ({ ...item, sourceType: 'global' }))
                const moviesWithType = movies.map(item => ({ ...item, sourceType: 'movies' }))

                const combined = [...indiaWithType, ...globalWithType, ...moviesWithType]
                setAllItems(combined)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    // Random selection function
    const pickRandom = useCallback(() => {
        if (allItems.length === 0) return

        setPicking(true)

        // Small delay for visual feedback
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * allItems.length)
            setSelectedItem(allItems[randomIndex])
            setPicking(false)
        }, 300)
    }, [allItems])

    // Format date helper
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Get route for detail link
    const getDetailRoute = (item) => {
        return `/release/${item.sourceType}/${item.id}`
    }

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Get a Recommendation | ReelRadar</title>
                </Helmet>
                <div className="page">
                    <div className="recommend-container">
                        <p className="text-muted animate-pulse">Loading recommendations...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Get a Recommendation | ReelRadar</title>
                <meta name="description" content="Can't decide what to watch? Let ReelRadar pick something random for you from our collection of movies and shows." />
            </Helmet>

            <div className="page">
                <div className="recommend-container">
                    <div className="recommend-icon">🎲</div>
                    <h1 className="recommend-title">Can't decide what to watch?</h1>
                    <p className="recommend-subtitle">
                        Let fate decide! Click the button below and we'll pick something random from our entire collection.
                    </p>

                    {!selectedItem ? (
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={pickRandom}
                            disabled={picking}
                        >
                            {picking ? '🎰 Picking...' : '🎬 Pick Something to Watch'}
                        </button>
                    ) : (
                        <div className="recommend-result">
                            <div className="recommend-result-card">
                                <h2 className="recommend-result-title">{selectedItem.title}</h2>
                                <div className="recommend-result-meta">
                                    {selectedItem.platform && (
                                        <span className="badge badge-platform">{selectedItem.platform}</span>
                                    )}
                                    {selectedItem.region && (
                                        <span className="badge badge-region">{selectedItem.region}</span>
                                    )}
                                    <span className="recommend-result-date">
                                        📅 {formatDate(selectedItem.releaseDate)}
                                    </span>
                                </div>
                                {selectedItem.genres && (
                                    <div className="recommend-result-genres">
                                        {selectedItem.genres.map(genre => (
                                            <span key={genre} className="badge badge-genre">{genre}</span>
                                        ))}
                                    </div>
                                )}
                                <p className="recommend-result-description">
                                    {selectedItem.description}
                                </p>
                                <Link to={getDetailRoute(selectedItem)} className="btn btn-ghost">
                                    View Full Details →
                                </Link>
                            </div>

                            <div className="recommend-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={pickRandom}
                                    disabled={picking}
                                >
                                    {picking ? '🎰 Picking...' : '🔄 Pick Another'}
                                </button>
                                <Link to="/" className="btn btn-ghost">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Recommend
