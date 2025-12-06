import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ReleaseCard from '../components/ReleaseCard'
import FilterBar from '../components/FilterBar'
import { fetchIndiaData } from '../services/dataService'

const PLATFORMS = ['Netflix', 'Prime', 'Hotstar', 'Zee5', 'JioCinema']

function IndiaOTT() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        fetchIndiaData()
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
                <title>India OTT Releases | ReelRadar</title>
                <meta name="description" content="Discover the latest OTT releases streaming in India on Netflix, Prime Video, Hotstar, Zee5, and JioCinema." />
            </Helmet>

            <div className="page">
                <div className="container">
                    <h1 className="page-title">India OTT Releases</h1>
                    <p className="page-subtitle">Latest streaming releases in India</p>

                    <FilterBar
                        filters={PLATFORMS}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />

                    {filteredData.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📺</div>
                            <p className="empty-state-title">No releases found</p>
                            <p>Try selecting a different platform filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cards">
                            {filteredData.map(release => (
                                <ReleaseCard key={release.id} release={release} type="india" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default IndiaOTT
