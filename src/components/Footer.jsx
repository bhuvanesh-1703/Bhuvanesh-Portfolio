import { portfolioData } from '../data/portfolio.js';
import '../css/Footer.css';

function Footer() {
  const { hero } = portfolioData;
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p className="mb-1">&lt;/&gt; with <i className="bi bi-heart-fill footer-heart"></i> by <strong>{hero.name}</strong></p>
        <p className="mb-0">&copy; 2026 Bhuvanesh. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
