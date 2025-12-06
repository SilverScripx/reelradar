function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-links">
                    <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
                <p className="footer-copyright">
                    © {currentYear} ReelRadar. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
