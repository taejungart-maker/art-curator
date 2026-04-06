import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtCard from '../components/ui/ArtCard';
import { artworks, tags } from '../data/artworks';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const activeCategory = searchParams.get('category');

  const filteredArtworks = artworks.filter((a) => {
    const matchTag = activeTag ? a.tags && a.tags.includes(activeTag) : true;
    const matchCategory = activeCategory ? a.category === activeCategory : true;
    return matchTag && matchCategory;
  });

  return (
    <>
      {/* Marketing/Sales Categories */}
      <nav className="w-full bg-transparent py-2.5 overflow-x-auto whitespace-nowrap px-4 lg:px-24 scrollbar-hide border-b border-outline-variant/30">
        {/* Desktop */}
        <div className="hidden sm:flex justify-center gap-6 lg:gap-12 text-[11px] font-label uppercase tracking-[0.25em] text-on-surface-variant/80">
          <a className="hover:text-secondary transition-colors" href="#">Best Artist</a>
          <a className="hover:text-secondary transition-colors" href="#">Exclusive</a>
          <a className="hover:text-secondary transition-colors text-secondary font-bold" href="#">Sale</a>
          <a className="hover:text-secondary transition-colors" href="#">Special &amp; Limited</a>
        </div>
        {/* Mobile */}
        <div className="flex sm:hidden gap-3 text-[11px] font-label uppercase tracking-[0.15em] text-on-surface-variant/80">
          <a className="shrink-0 hover:text-secondary transition-colors" href="#">Best Artist</a>
          <a className="shrink-0 hover:text-secondary transition-colors" href="#">Exclusive</a>
          <a className="shrink-0 hover:text-secondary transition-colors text-secondary font-bold" href="#">Sale</a>
          <a className="shrink-0 hover:text-secondary transition-colors" href="#">Special &amp; Limited</a>
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 mt-8 lg:mt-12 flex gap-8 lg:gap-16">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="material-symbols-outlined" style={{fontSize: '20px'}}>{sidebarOpen ? 'close' : 'tune'}</span>
        </button>

        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'fixed inset-0 z-30 bg-white p-6 overflow-y-auto' : 'hidden'}
          md:block md:relative md:w-56 md:flex-shrink-0 md:space-y-10
        `}>
          {sidebarOpen && (
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="font-label text-lg font-bold">필터</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          )}

          <section>
            <h3 className="font-label uppercase tracking-[0.15em] text-xs font-bold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined" style={{fontSize: '16px'}}>tune</span> Sort By
            </h3>
            <ul className="space-y-3 text-sm font-label text-on-surface-variant">
              <li className="flex items-center gap-2 cursor-pointer text-primary font-medium">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Popular
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent group-hover:bg-outline-variant rounded-full transition-colors"></span> Newest
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent group-hover:bg-outline-variant rounded-full transition-colors"></span> Price: Low to High
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent group-hover:bg-outline-variant rounded-full transition-colors"></span> Price: High to Low
              </li>
            </ul>
          </section>

          <section className="mt-10 md:mt-0">
            <h3 className="font-label uppercase tracking-[0.15em] text-xs font-bold mb-5">TAGS</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    setActiveTag(activeTag === tag ? null : tag);
                    setSidebarOpen(false);
                  }}
                  className={`px-3 py-1 text-[9px] tracking-wider cursor-pointer rounded-full transition-colors
                    ${activeTag === tag
                      ? 'bg-secondary text-white'
                      : 'bg-[#2a2a28] text-[#f4f1ea] hover:bg-neutral-600'
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-6 border-t border-outline-variant/20 mt-10 md:mt-0">
            <div className="bg-primary p-5 text-surface space-y-3">
              <h4 className="font-headline italic text-base leading-tight">Curated Selection for Your Home</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-70">New Collection Out Now</p>
              <button className="w-full py-2.5 border border-surface/30 hover:bg-surface hover:text-primary transition-all text-[9px] uppercase tracking-widest">
                Discover
              </button>
            </div>
          </div>
        </aside>

        {/* Art Grid */}
        <section className="flex-1">
          {/* Active Filter Indicator */}
          {(activeTag || activeCategory) && (
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {activeCategory && (
                <span className="font-label text-sm text-on-surface-variant">
                  카테고리: <span className="font-bold text-primary">{activeCategory}</span>
                </span>
              )}
              {activeTag && (
                <span className="font-label text-sm text-on-surface-variant">
                  태그: <span className="font-bold text-primary">"{activeTag}"</span>
                </span>
              )}
              <span className="font-label text-sm text-on-surface-variant">({filteredArtworks.length})</span>
              <button
                onClick={() => {
                  setActiveTag(null);
                  if (activeCategory) window.location.href = '/';
                }}
                className="flex items-center gap-1 px-3 py-1 text-[10px] font-label uppercase tracking-wider border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors"
              >
                초기화 <span className="material-symbols-outlined" style={{fontSize: '14px'}}>close</span>
              </button>
            </div>
          )}

          {filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
              {filteredArtworks.map((artwork) => (
                <ArtCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <span className="material-symbols-outlined text-outline-variant mb-4" style={{fontSize: '48px'}}>search_off</span>
              <p className="font-headline text-xl mb-2">작품을 찾을 수 없습니다</p>
              <p className="font-label text-sm text-on-surface-variant mb-6">"{activeTag}" 태그에 해당하는 작품이 없어요</p>
              <button
                onClick={() => setActiveTag(null)}
                className="px-6 py-3 bg-primary text-white font-label text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
              >
                전체 보기
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredArtworks.length > 0 && (
            <div className="mt-16 lg:mt-20 flex justify-center items-center gap-4 lg:gap-6 font-label text-sm">
              <button className="p-2 hover:text-secondary disabled:opacity-30" disabled>
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>chevron_left</span>
              </button>
              <div className="flex gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-primary text-surface text-xs font-bold cursor-pointer">1</span>
                <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high text-xs hover:text-primary transition-colors cursor-pointer">2</span>
                <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high text-xs hover:text-primary transition-colors cursor-pointer">3</span>
                <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high text-xs hover:text-primary transition-colors cursor-pointer">4</span>
                <span className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high text-xs hover:text-primary transition-colors cursor-pointer">5</span>
              </div>
              <button className="p-2 hover:text-secondary">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>chevron_right</span>
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
