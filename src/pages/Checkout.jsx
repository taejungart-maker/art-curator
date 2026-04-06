import { useParams, Link } from 'react-router-dom';
import { artworks } from '../data/artworks';

export default function Checkout() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === Number(id)) || artworks[0];
  const priceNum = artwork.priceKRW || artwork.price;

  return (
    <main className="pt-32 pb-24 px-12 max-w-[1440px] mx-auto min-h-screen">
      <header className="mb-16">
        <h1 className="font-headline text-5xl font-light tracking-tight mb-4">장바구니</h1>
        <p className="text-on-surface-variant font-label text-sm tracking-[0.05em] uppercase">Shopping Cart (1 Items)</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Cart Items Section */}
        <section className="flex-grow">
          <div className="space-y-12">
            {/* Item Row */}
            <div className="group relative flex flex-col md:flex-row items-start gap-8 pb-12">
              {/* Product Image */}
              <div className="w-full md:w-64 aspect-[4/5] bg-surface-container-low p-6 flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
                <img
                  alt={artwork.title}
                  className="w-full h-full object-contain shadow-sm"
                  src={artwork.image}
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col justify-between h-full py-2">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="font-headline text-2xl mb-1 italic">{artwork.title}</h3>
                    <p className="font-body font-bold text-sm tracking-wide mb-4">{artwork.artist}</p>
                    <div className="space-y-1 text-sm text-on-surface-variant font-label">
                      {artwork.size && <p>크기: {artwork.size}</p>}
                      {artwork.material && <p>용지: {artwork.material}</p>}
                      {artwork.edition && <p>에디션: {artwork.edition}</p>}
                    </div>
                  </div>
                  <Link to={`/artwork/${artwork.id}`} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-xl">close</span>
                  </Link>
                </div>

                <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-outline-variant/30 w-fit">
                    <button className="px-4 py-2 hover:bg-surface-container-low transition-colors">-</button>
                    <span className="px-6 py-2 text-sm font-label border-x border-outline-variant/30">1</span>
                    <button className="px-4 py-2 hover:bg-surface-container-low transition-colors">+</button>
                  </div>
                  {/* Price */}
                  <div className="text-xl font-label text-secondary font-medium">₩{priceNum}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-12 pt-12 border-t border-outline-variant/20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-label text-sm uppercase tracking-widest hover:text-secondary transition-colors group"
            >
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
              쇼핑 계속하기
            </Link>
          </div>
        </section>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-[400px]">
          <div className="bg-surface-container-low p-10 space-y-8 sticky top-32">
            <h2 className="font-headline text-2xl font-light border-b border-outline-variant/20 pb-6">주문 요약</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-label text-on-surface-variant">
                <span>상품 금액</span>
                <span>₩{priceNum}</span>
              </div>
              <div className="flex justify-between text-sm font-label text-on-surface-variant">
                <span>배송비</span>
                <span className="uppercase">무료 배송</span>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant/40 flex justify-between items-end">
              <span className="font-headline text-lg">최종 결제 금액</span>
              <span className="text-2xl font-label font-bold text-primary">₩{priceNum}</span>
            </div>
            <button className="w-full bg-primary text-on-primary py-6 px-4 text-sm font-label font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-tertiary-container flex items-center justify-center gap-2">
              주문하기
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <div className="space-y-4 pt-4">
              <p className="text-[10px] text-center text-on-surface-variant font-label tracking-tighter leading-relaxed">
                결제 시 세금 및 관세가 포함될 수 있습니다.<br />
                구매 시 큐레이토리얼의 이용약관에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
