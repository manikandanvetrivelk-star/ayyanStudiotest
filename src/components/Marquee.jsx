import { MARQUEE_ITEMS } from "../data/photos";
import "./Marquee.css";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={i} className="marquee__item">
            <span className="marquee__dot">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
