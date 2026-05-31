import { useState } from "react";
import "./Hero.css";

const HERO_IMAGE = "images/banner-collage.png";

export default function Hero({ onWorkClick, onBookClick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          className={`hero__bg-img${loaded ? " hero__bg-img--loaded" : ""}`}
        />
      </div>

      {/* Decorative gold border frame */}
      <div className="hero__frame" aria-hidden="true" />

      <div className="hero__content">
        <p className="label fade-in">Chennai · Tamil Nadu · Since 2014</p>
        <div className="gold-divider fade-in fade-in-delay-1" />
        <h1 className="hero__title fade-in fade-in-delay-1">
          AYYAN STUDIO AND EVENTS
        </h1>
        <p className="hero__subtitle fade-in fade-in-delay-2">
          Capturing Memories, Creating Celebrations and turning special moments into unforgettable experiences.
        </p>
        <div className="hero__actions fade-in fade-in-delay-3">
          <button type="button" className="hero__btn hero__btn--primary" onClick={onWorkClick}>
            View Our Work
          </button>
          <button type="button" className="hero__btn hero__btn--outline" onClick={onBookClick}>
            Book a Session
          </button>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>

      {/* Bottom stats bar */}
      <div className="hero__stats">
        {[
          { num: "320+", label: "Weddings" },
          { num: "15000+", label: "Happy Families" },
          { num: "12", label: "Years of Trust" },
          { num: "95%", label: "Returning Clients" },
        ].map(({ num, label }) => (
          <div key={label} className="hero__stat">
            <span className="hero__stat-num">{num}</span>
            <span className="hero__stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}