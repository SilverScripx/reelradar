import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import ReleaseCard from '../components/ReleaseCard'
import SearchInput from '../components/SearchInput'

function Search() {
    const [indiaData, setIndiaData] = useState([])
    const [globalData, setGlobalData] = useState([])
    const [moviesData, setMoviesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [india, global, movies] = await Promise.all([
                    fetch('/data/india.json').then(res => res.json()),
                    fetch('/data/global.json').then(res => res.json()),
                    fetch('/data/movies.json').then(res => res.json()),
                ])
                setIndiaData(india)
                setGlobalData(global)
                setMoviesData(movies)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const searchResults = useMemo(() => {
        if (!query.trim()) return { india: [], global: [], movies: [] }

        const searchTerm = query.toLowerCase()

        const filterFn = (item) =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description?.toLowerCase().includes(searchTerm) ||
            item.genre?.some(g => g.toLowerCase().includes(searchTerm)) ||
            item.cast?.some(c => c.toLowerCase().includes(searchTerm)) ||
            item.director?.toLowerCase().includes(searchTerm)

        return {
            india: indiaData.filter(filterFn),
            global: globalData.filter(filterFn),
            movies: moviesData.filter(filterFn),
        }
    }, [query, indiaData, globalData, moviesData])

    const totalResults = searchResults.india.length + searchResults.global.length + searchResults.movies.length

    if (loading) {
        return (
            <div className="page">
                <div className="container text-center">
                    <p className="text-muted animate-pulse">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Search Releases | ReelRadar</title>
                <meta name="description" content="Search across all OTT and theatrical releases. Find movies and shows by title, genre, cast, or director." />
            </Helmet>

            <div className="page">
                <div className="container">
                    <h1 className="page-title">Search</h1>
                    <p className="page-subtitle">Find movies and shows across all platforms</p>

                    <SearchInput
                        value={query}
                        onChange={setQuery}
                        placeholder="Search by title, genre, cast, director..."
                    />

                    {query.trim() === '' ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <p className="empty-state-title">Start typing to search</p>
                            <p>Search across all OTT and theatrical releases</p>
                        </div>
                    ) : totalResults === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">😕</div>
                            <p className="empty-state-title">No results found</p>
                            <p>Try a different search term</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-muted mb-8">
                                Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                            </p>

                            {searchResults.india.length > 0 && (
                                <section className="section">
                                    <h2 className="section-title">India OTT ({searchResults.india.length})</h2>
                                    <div className="grid grid-cards">
                                        {searchResults.india.map(release => (
                                            <ReleaseCard key={release.id} release={release} type="india" />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {searchResults.global.length > 0 && (
                                <section className="section">
                                    <h2 className="section-title">Global OTT ({searchResults.global.length})</h2>
                                    <div className="grid grid-cards">
                                        {searchResults.global.map(release => (
                                            <ReleaseCard key={release.id} release={release} type="global" />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {searchResults.movies.length > 0 && (
                                <section className="section">
                                    <h2 className="section-title">Theatrical Releases ({searchResults.movies.length})</h2>
                                    <div className="grid grid-cards">
                                        {searchResults.movies.map(release => (
                                            <ReleaseCard key={release.id} release={release} type="movies" />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Search
