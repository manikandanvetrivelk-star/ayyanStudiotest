import { STUDIO } from "../data/photos";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <div className="about__left">
          <p className="label">Our Story</p>
          <div className="gold-divider" />
          <h2 className="about__heading">
            Twelve years of<br />
            <em>capturing joy</em>
          </h2>
          <p className="about__text">
           Ayyan Studio & Events – Chennai’s destination for capturing and celebrating life’s most special moments with premium baby photography, creative studio shoots, stylish event decorations, and unforgettable private theatre surprise experiences. From birthdays, proposals, anniversaries, baby showers, and romantic surprises to customized luxury celebrations, we turn your memories into beautiful experiences filled with happiness, creativity, elegance, and lasting emotions.
          </p>
          <div className="about__badges">
            {["Metanity Shoot", "Newborn Shoot", "Toddler Shoot", "Baby Shower", "Naming Ceremony", "Birthday Event", "Engagment Event", "Wedding Event", "New House Warming", "Ear Piercing Event", "Corporate Event", "Private Theatre Surprise"].map(b => (
              <span key={b} className="about__badge">{b}</span>
            ))}
          </div>
        </div>

        <div className="about__right">
          <div className="about__img-grid">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85"
              alt="Bridal portrait"
              className="about__img about__img--tall"
            />
            <img
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=85"
              alt="Anniversary couple"
              className="about__img about__img--bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
