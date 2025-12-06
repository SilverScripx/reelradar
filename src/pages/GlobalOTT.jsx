import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ReleaseCard from '../components/ReleaseCard'
import FilterBar from '../components/FilterBar'

const PLATFORMS = ['HBO Max', 'Hulu', 'Disney+', 'Paramount+', 'Prime']

function GlobalOTT() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        fetch('/data/global.json')
            .then(res => res.json())
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const filteredData = activeFilter === 'all'
        ? data
        : data.filter(item => item.platform === activeFilter)

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
                <title>Global OTT Releases | ReelRadar</title>
                <meta name="description" content="Discover the latest OTT releases streaming globally on HBO Max, Hulu, Disney+, Paramount+, and Prime Video." />
            </Helmet>

            <div className="page">
                <div className="container">
                    <h1 className="page-title">Global OTT Releases</h1>
                    <p className="page-subtitle">Latest streaming releases worldwide</p>

                    <FilterBar
                        filters={PLATFORMS}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />

                    {filteredData.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🌍</div>
                            <p className="empty-state-title">No releases found</p>
                            <p>Try selecting a different platform filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cards">
                            {filteredData.map(release => (
                                <ReleaseCard key={release.id} release={release} type="global" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default GlobalOTT
