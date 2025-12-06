import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ReleaseCard from '../components/ReleaseCard'
import FilterBar from '../components/FilterBar'

const REGIONS = ['India', 'Hollywood']

function Movies() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        fetch('/data/movies.json')
            .then(res => res.json())
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const filteredData = activeFilter === 'all'
        ? data
        : data.filter(item => item.region === activeFilter)

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
                <title>Movie Releases | ReelRadar</title>
                <meta name="description" content="Track the latest theatrical movie releases from India and Hollywood. Find upcoming premieres and blockbusters." />
            </Helmet>

            <div className="page">
                <div className="container">
                    <h1 className="page-title">Theatrical Releases</h1>
                    <p className="page-subtitle">Latest movies hitting the big screen</p>

                    <FilterBar
                        filters={REGIONS}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />

                    {filteredData.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🎬</div>
                            <p className="empty-state-title">No releases found</p>
                            <p>Try selecting a different region filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cards">
                            {filteredData.map(release => (
                                <ReleaseCard key={release.id} release={release} type="movies" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Movies
