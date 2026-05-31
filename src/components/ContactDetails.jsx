import { useState } from "react";
import { STUDIO } from "../data/photos";
import "./ContactDetails.css";

export default function ContactDetails() {
  const [mapOpen, setMapOpen] = useState(false);
  const [zoom, setZoom] = useState(14);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    STUDIO.name + ", " + STUDIO.location
  )}&z=${zoom}&output=embed`;

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__left">
          <p className="label">Contact</p>
          <div className="gold-divider" />
          <h2 className="contact__heading">
            Reach out for bookings.
          </h2>
          <div className="contact__list">
            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="contact__label">Studio Location</p>
                <p className="contact__text">{STUDIO.location}</p>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div>
                <p className="contact__label">Phone</p>
                <a className="contact__text contact__link" href={`tel:${STUDIO.phone.replace(/\s+/g, "")}`}>
                  {STUDIO.phone}
                </a>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37a4 4 0 1 1-7.93 1.16A4 4 0 0 1 16 11.37Z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="contact__label">Instagram</p>
                <a className="contact__text contact__link" href={`https://www.instagram.com/ayyan_studio_events?igsh=MWR3ZDg3ZnF5YXRhNA==`} target="_blank" rel="noreferrer">
                  {STUDIO.instagram}
                </a>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
                  <path d="M4 6.5l7.5 6 7.5-6" />
                </svg>
              </div>
              <div>
                <p className="contact__label">Email</p>
                <a className="contact__text contact__link" href={`mailto:${STUDIO.email}`}>
                  {STUDIO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact__right">
          <button
            type="button"
            className="contact__map-button"
            onClick={() => setMapOpen(true)}
            aria-label="Open map in popup"
          >
            <span>Open map in full view</span>
          </button>
          <iframe
            title="Studio location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {mapOpen && (
        <div className="map-popup" role="dialog" aria-modal="true" aria-label="Map popup">
          <div className="map-popup__backdrop" onClick={() => setMapOpen(false)} />
          <div className="map-popup__frame">
            <button
              type="button"
              className="map-popup__close"
              onClick={() => setMapOpen(false)}
              aria-label="Close map popup"
            >
              ×
            </button>
            <div className="map-popup__header">
              <div>
                <p className="map-popup__title">Studio Location</p>
                <p className="map-popup__subtitle">Zoom and explore the location in full view.</p>
              </div>
              <div className="map-popup__zoom-controls">
                <button type="button" onClick={() => setZoom((z) => Math.max(1, z - 1))} aria-label="Zoom out">
                  −
                </button>
                <span>{zoom}</span>
                <button type="button" onClick={() => setZoom((z) => Math.min(21, z + 1))} aria-label="Zoom in">
                  +
                </button>
              </div>
            </div>
            <iframe
              title="Full map view"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                STUDIO.name + ", " + STUDIO.location
              )}&z=${zoom}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </section>
  );
}
