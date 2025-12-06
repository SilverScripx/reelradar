import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/india', label: 'India OTT' },
    { path: '/global', label: 'Global OTT' },
    { path: '/movies', label: 'Movies' },
    { path: '/search', label: 'Search' },
    { path: '/recommend', label: '🎲 Lucky' },
]

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="logo">REEL RADAR</span>
                    <span className="tagline">Track. Discover. Watch. Repeat.</span>
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
                    {navItems.map(item => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
