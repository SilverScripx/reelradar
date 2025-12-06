import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import IndiaOTT from './pages/IndiaOTT'
import GlobalOTT from './pages/GlobalOTT'
import Movies from './pages/Movies'
import Search from './pages/Search'
import ReleaseDetail from './pages/ReleaseDetail'
import Recommend from './pages/Recommend'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/india" element={<IndiaOTT />} />
                    <Route path="/global" element={<GlobalOTT />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/release/:type/:id" element={<ReleaseDetail />} />
                    <Route path="/recommend" element={<Recommend />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
