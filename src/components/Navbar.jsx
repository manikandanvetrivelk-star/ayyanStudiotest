import { NavLink } from "react-router-dom";
import { VIEWS, STUDIO } from "../data/photos";
import "./Navbar.css";

function scrollToContact() {
  const section = document.getElementById("contact");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar({ onBookClick, onServicesClick }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        <span className="navbar__logo-main">{STUDIO.name}</span>
        <span className="navbar__logo-sub">{STUDIO.established}</span>
      </NavLink>

      <div className="navbar__views">
        {VIEWS.map(({ key, label, path }) => {
          if (path === "/contact") {
            return (
              <button
                key={key}
                type="button"
                className="navbar__tab"
                onClick={scrollToContact}
              >
                {label}
              </button>
            );
          }

          if (key === "services") {
            return (
              <button
                key={key}
                type="button"
                className="navbar__tab"
                onClick={onServicesClick}
              >
                {label}
              </button>
            );
          }

          return (
            <NavLink
              key={key}
              to={path}
              className={({ isActive }) =>
                `navbar__tab${isActive ? " navbar__tab--active" : ""}`
              }
            >
              {label}
            </NavLink>
          );
        })}
      </div>

      <button type="button" className="navbar__cta" onClick={onBookClick}>
        Book a Session
      </button>
    </nav>
  );
}
