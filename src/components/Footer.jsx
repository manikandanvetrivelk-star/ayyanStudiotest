import "./Footer.css";

/**
 * Footer
 * Minimal brand strip without gallery.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__text">
          <span className="footer__brand">
            Ayyan Studio <em>Classics</em>
          </span>
          <span className="footer__info">
            © {year} · South Indian Wedding Specialists
          </span>
        </div>
      </div>
    </footer>
  );
}
