export default function BrandLogoCard({ brand, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(brand.key)}
      className="group flex flex-col items-center gap-5 overflow-hidden rounded-[32px] border border-white/10 bg-[#11100d] p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a85c]/40 hover:bg-[#16120f]"
    >
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-[26px] bg-[#0f0b08] p-3 transition duration-500 group-hover:scale-[1.03]">
        <img
          src={brand.logo}
          alt={`${brand.title} logo`}
          className="h-full w-full rounded-[26px] object-contain transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-[#f5ede0]">{brand.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#d9cbae]">{brand.subtitle}</p>
      </div>
    </button>
  );
}
