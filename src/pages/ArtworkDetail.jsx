import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { artworks } from '../data/artworks';
import ArtCard from '../components/ui/ArtCard';

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === Number(id)) || artworks[0];
  const [selectedImage, setSelectedImage] = useState(artwork.image);
  const relatedWorks = artworks.filter((a) => a.id !== artwork.id).slice(0, 4);

  const allImages = [artwork.image, ...(artwork.thumbnails || [])];

  return (
    <main className="pt-32 pb-24 max-w-screen-2xl mx-auto px-6 md:px-12">
      {/* Top Section: Visual Storytelling */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Sub-image gallery + Main Artwork */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-6">
          <div className="flex-grow mat-container">
            <img
              alt={artwork.title}
              className="w-full h-auto object-cover shadow-ambient"
              src={selectedImage}
            />
          </div>
          {/* Thumbnail Gallery */}
          {artwork.thumbnails && (
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible shrink-0">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 bg-surface-container border ${selectedImage === img ? 'border-secondary' : 'border-transparent'} hover:border-secondary transition-all cursor-pointer overflow-hidden p-1`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img className="w-full h-full object-cover" src={img} alt={`view-${i}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col space-y-10">
          <header className="space-y-4">
            <h1 className="font-headline text-4xl lg:text-5xl leading-tight tracking-tight text-primary">
              {artwork.title}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm font-semibold tracking-wide uppercase">작가:</span>
              <a className="font-headline text-xl italic text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary" href="#">
                {artwork.artist}
              </a>
            </div>
          </header>

          <div className="space-y-6">
            <div className="flex items-baseline space-x-4">
              <span className="font-label text-3xl font-medium text-secondary tracking-tight">
                {artwork.currency}{artwork.price} 세금 및 프레임 포함
              </span>
            </div>

            {artwork.size && (
              <div className="grid grid-cols-2 gap-y-4 pt-6 border-t border-outline-variant/20">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">사이즈</p>
                  <p className="font-body text-sm">{artwork.size}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">재료</p>
                  <p className="font-body text-sm">{artwork.material}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">제작연도</p>
                  <p className="font-body text-sm">{artwork.year}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">에디션</p>
                  <p className="font-body text-sm font-semibold">{artwork.edition}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="space-y-4 pt-6">
            <Link to={`/checkout/${artwork.id}`} className="w-full py-5 bg-primary text-white font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-all flex items-center justify-center space-x-2">
              <span>바로 구매하기</span>
            </Link>
            <div className="flex gap-4">
              <button className="flex-grow py-5 border border-outline-variant text-primary font-label text-xs uppercase tracking-widest font-bold hover:bg-surface-container-low transition-all">
                장바구니 담기
              </button>
              <button className="w-16 h-16 flex items-center justify-center border border-outline-variant hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="w-16 h-16 flex items-center justify-center border border-outline-variant hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
            <p className="text-center text-[10px] text-outline italic pt-4">
              전 세계 큐레이션 배송이 가능합니다. 모든 프린트에는 작가의 친필 서명과 에디션 번호가 포함되어 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Description: Tabs */}
      {artwork.description && (
        <section className="mt-32 border-t border-outline-variant/20 pt-16">
          <div className="flex flex-col md:flex-row gap-16">
            <aside className="md:w-1/4">
              <nav className="flex flex-col space-y-6">
                <button className="text-left font-label text-xs uppercase tracking-[0.2em] font-bold text-primary border-l-2 border-secondary pl-4">작품 정보</button>
                <button className="text-left font-label text-xs uppercase tracking-[0.2em] text-outline hover:text-primary pl-4 transition-colors">배송 및 포장</button>
                <button className="text-left font-label text-xs uppercase tracking-[0.2em] text-outline hover:text-primary pl-4 transition-colors">교환 및 반품 정책</button>
              </nav>
            </aside>
            <div className="md:w-3/4 space-y-12">
              <div className="space-y-6">
                <h3 className="font-headline text-2xl">작가의 의도</h3>
                <p className="font-body text-lg leading-relaxed text-on-surface-variant max-w-3xl">
                  {artwork.description}
                </p>
                {artwork.descriptionExtra && (
                  <p className="font-body text-lg leading-relaxed text-on-surface-variant max-w-3xl">
                    {artwork.descriptionExtra}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="p-8 bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary mb-4">verified</span>
                  <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-2">정품 보증</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">갤러리 디렉터가 서명한 디지털 큐레이터 정품 인증서가 포함되어 있습니다.</p>
                </div>
                <div className="p-8 bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary mb-4">package_2</span>
                  <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-2">안전 포장</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">안전한 국제 운송을 위해 습기 방지 레이어가 포함된 박물관 등급의 평면 포장을 사용합니다.</p>
                </div>
                <div className="p-8 bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary mb-4">palette</span>
                  <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-2">제작 기법</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">12색 피그먼트 잉크 시스템을 사용하여 100년 이상의 보존 수명을 보장합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Section: Related Works */}
      <section className="mt-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-headline text-3xl">관련 작품</h2>
          <Link
            to="/"
            className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
          >
            작가 포트폴리오 보기
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {relatedWorks.map((work) => (
            <ArtCard key={work.id} artwork={work} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="mt-32 p-12 bg-surface-container-low/50">
        <h2 className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-8">최근 본 작품</h2>
        <div className="flex space-x-12 overflow-x-auto pb-4">
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="w-16 h-16 bg-white p-1">
              <img className="w-full h-full object-cover" src="/img/17.jpg" alt="Renaissance Modern" />
            </div>
            <div>
              <p className="text-xs font-bold">Renaissance Modern</p>
              <p className="text-[10px] text-outline">Digital Print</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="w-16 h-16 bg-white p-1">
              <img className="w-full h-full object-cover" src="/img/18.jpg" alt="Vector Flow 02" />
            </div>
            <div>
              <p className="text-xs font-bold">Vector Flow 02</p>
              <p className="text-[10px] text-outline">Screen Print</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
