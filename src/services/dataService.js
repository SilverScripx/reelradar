// GitHub Raw URLs for data files
const BASE_URL = 'https://raw.githubusercontent.com/SilverScripx/reelradar/main/public/data'

export const DATA_URLS = {
    india: `${BASE_URL}/india.json`,
    global: `${BASE_URL}/global.json`,
    movies: `${BASE_URL}/movies.json`,
}

// Fetch functions
export const fetchIndiaData = () => fetch(DATA_URLS.india).then(res => res.json())
export const fetchGlobalData = () => fetch(DATA_URLS.global).then(res => res.json())
export const fetchMoviesData = () => fetch(DATA_URLS.movies).then(res => res.json())

// Fetch all data at once
export const fetchAllData = async () => {
    const [india, global, movies] = await Promise.all([
        fetchIndiaData(),
        fetchGlobalData(),
        fetchMoviesData(),
    ])
    return { india, global, movies }
}

// Get data URL by type
export const getDataUrl = (type) => {
    switch (type) {
        case 'india':
            return DATA_URLS.india
        case 'global':
            return DATA_URLS.global
        case 'movies':
            return DATA_URLS.movies
        default:
            throw new Error('Invalid data type')
    }
}
