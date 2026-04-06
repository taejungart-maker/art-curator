import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const categories = ['Fine Art', 'Graphic Design', 'Photography', 'Object'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-surface/80 backdrop-blur-md w-full top-0 sticky z-50 flex flex-col items-center max-w-[1920px] mx-auto border-b border-outline-variant/20">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-24 pt-4 lg:pt-10 pb-3 lg:pb-6">
        {/* Left */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-label uppercase tracking-widest text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#">Artist</a>
            <a className="hover:text-primary transition-colors" href="#">Curating</a>
            <a className="hover:text-primary transition-colors" href="#">Manual</a>
          </nav>
          <button className="lg:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl lg:text-4xl font-serif text-primary tracking-tighter">
          <Link to="/">ART CURATOR</Link>
        </div>
        {/* Right */}
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="hidden xl:flex items-center gap-4 text-xs font-label uppercase tracking-widest text-on-surface-variant mr-2">
            <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
              <span className="material-symbols-outlined" style={{fontSize: '16px'}}>confirmation_number</span> Gift Voucher
            </a>
            <span className="w-px h-3 bg-outline-variant/30"></span>
            {user ? (
              <button onClick={handleLogout} className="hover:text-primary transition-colors">Logout</button>
            ) : (
              <Link to="/login" className="hover:text-primary transition-colors">Login/Sign Up</Link>
            )}
            <span className="w-px h-3 bg-outline-variant/30"></span>
            <a className="hover:text-primary transition-colors" href="#">{user ? user.email?.split('@')[0] : 'My Page'}</a>
          </div>
          <button className="p-1 hover:text-secondary transition-colors">
            <span className="material-symbols-outlined" style={{fontSize: '22px'}}>search</span>
          </button>
          <button className="p-1 hover:text-secondary transition-colors relative">
            <span className="material-symbols-outlined" style={{fontSize: '22px'}}>shopping_cart</span>
            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </button>
          <button className="hidden sm:block p-1 hover:text-secondary transition-colors">
            <span className="material-symbols-outlined" style={{fontSize: '22px'}}>person</span>
          </button>
        </div>
      </div>

      {/* Genre Navigation - Desktop */}
      <nav className="w-full overflow-x-auto scrollbar-hide px-4 lg:px-0">
        <div className="hidden md:flex w-full justify-center gap-8 lg:gap-16 pb-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={activeCategory === cat ? '/' : `/?category=${cat}`}
              className={`font-headline text-base lg:text-lg font-medium tracking-wide transition-colors duration-300
                ${activeCategory === cat ? 'text-[#805600] border-b border-[#805600] pb-1' : 'text-primary hover:text-[#805600]'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
        {/* Mobile: 가로 스크롤 칩 */}
        <div className="flex md:hidden gap-2 pb-3 whitespace-nowrap">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={activeCategory === cat ? '/' : `/?category=${cat}`}
              className={`px-4 py-2 text-xs font-label font-medium tracking-wide rounded-full shrink-0 transition-colors
                ${activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'border border-outline-variant text-primary hover:bg-primary hover:text-white'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden w-full py-4 px-4 space-y-4 border-t border-outline-variant/20 bg-white">
          <div className="flex flex-col gap-3 text-sm text-on-surface-variant">
            <a href="#" className="py-2 hover:text-primary transition-colors">Artist</a>
            <a href="#" className="py-2 hover:text-primary transition-colors">Curating</a>
            <a href="#" className="py-2 hover:text-primary transition-colors">Manual</a>
          </div>
          <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/20 text-sm text-on-surface-variant">
            <a href="#" className="py-2">Gift Voucher</a>
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="py-2 text-left">로그아웃</button>
            ) : (
              <Link to="/login" className="py-2" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
            )}
            <a href="#" className="py-2">{user ? user.email?.split('@')[0] : 'My Page'}</a>
          </div>
        </div>
      )}
    </header>
  );
}
