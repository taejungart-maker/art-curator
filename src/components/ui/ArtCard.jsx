import { Link } from 'react-router-dom';

export default function ArtCard({ artwork }) {
  return (
    <Link to={`/artwork/${artwork.id}`} className="art-card group cursor-pointer block">
      <div className="relative bg-surface-container-low p-6 mb-5 overflow-hidden aspect-[3/4] flex items-center justify-center">
        <img
          src={artwork.image}
          alt={`Art print by ${artwork.artist}`}
          className="art-card-img-container w-full h-full object-contain shadow-xl"
        />
        <button
          className="absolute top-4 right-4 p-2 bg-surface-bright/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-secondary"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>favorite</span>
        </button>
      </div>
      <div className="text-center space-y-0.5">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider">{artwork.artist}</h4>
        <p className="font-body italic text-on-surface-variant text-xs">{artwork.title}</p>
        <p className="font-label text-secondary text-xs font-semibold mt-1">
          ₩{artwork.priceKRW || artwork.price}
        </p>
      </div>
    </Link>
  );
}
