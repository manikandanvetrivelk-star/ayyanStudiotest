export default function ShootTypeCard({ shootType, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(shootType.key)}
      className="group flex flex-col items-center gap-5 overflow-hidden rounded-[32px] border border-white/10 bg-[#11100d] p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a85c]/40 hover:bg-[#16120f]"
    >
      <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0f0b08] p-0">
        <img
          src={shootType.image}
          alt={shootType.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="text-left">
        <h3 className="text-2xl font-semibold text-[#f5ede0]">{shootType.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#d9cbae]">{shootType.description}</p>
      </div>
    </button>
  );
}
