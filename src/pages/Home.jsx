import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReleaseCard from '../components/ReleaseCard'
import { fetchAllData } from '../services/dataService'

function Home() {
    const [indiaData, setIndiaData] = useState([])
    const [globalData, setGlobalData] = useState([])
    const [moviesData, setMoviesData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const { india, global, movies } = await fetchAllData()
                setIndiaData(india)
                setGlobalData(global)
                setMoviesData(movies)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (loading) {
        return (
            <div className="page">
                <div className="container text-center">
                    <p className="text-muted animate-pulse">Loading releases...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>ReelRadar - Track. Discover. Watch. Repeat.</title>
                <meta name="description" content="Track the latest OTT releases in India and globally, plus theatrical movie releases. Find what to watch next." />
            </Helmet>

            <div className="page">
                <div className="container">
                    {/* Hero Section */}
                    <section className="hero">
                        <h1 className="hero-title">Never Miss a Release</h1>
                        <p className="hero-subtitle">
                            Your radar for the latest OTT drops and theatrical releases.
                            Track what's streaming in India, across the globe, or hitting theaters near you.
                        </p>
                        <div className="flex-center gap-4">
                            <Link to="/search" className="btn btn-primary">
                                Start Exploring
                            </Link>
                            <Link to="/recommend" className="btn btn-secondary">
                                Feeling Lucky?
                            </Link>
                        </div>
                    </section>

                    {/* India OTT Section */}
                    <section className="section">
                        <div className="section-header">
                            <h2 className="section-title">India OTT Releases</h2>
                            <Link to="/india" className="section-link">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cards">
                            {indiaData.slice(0, 4).map(release => (
                                <ReleaseCard key={release.id} release={release} type="india" />
                            ))}
                        </div>
                    </section>

                    {/* Global OTT Section */}
                    <section className="section">
                        <div className="section-header">
                            <h2 className="section-title">Global OTT Releases</h2>
                            <Link to="/global" className="section-link">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cards">
                            {globalData.slice(0, 4).map(release => (
                                <ReleaseCard key={release.id} release={release} type="global" />
                            ))}
                        </div>
                    </section>

                    {/* Movies Section */}
                    <section className="section">
                        <div className="section-header">
                            <h2 className="section-title">Theatrical Releases</h2>
                            <Link to="/movies" className="section-link">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cards">
                            {moviesData.slice(0, 4).map(release => (
                                <ReleaseCard key={release.id} release={release} type="movies" />
                            ))}
                        </div>
                    </section>

                    {/* Feeling Lucky Section */}
                    <section className="section">
                        <Link to="/recommend" className="lucky-card">
                            <h3 className="lucky-title">🎲 Feeling Lucky?</h3>
                            <p className="lucky-subtitle">
                                Can't decide what to watch? Let us pick something for you!
                            </p>
                            <span className="btn btn-primary">Get a Recommendation</span>
                        </Link>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home
