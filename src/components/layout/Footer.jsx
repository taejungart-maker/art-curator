export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full mt-24 py-12 lg:py-16 border-t border-black/5 flex flex-col items-center justify-center px-6 lg:px-24">
      <div className="max-w-[1920px] w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10 lg:gap-12">
        <div className="space-y-5">
          <div className="font-serif text-xl lg:text-2xl tracking-tighter text-primary">ART CURATOR</div>
          <p className="max-w-md text-xs lg:text-sm font-label leading-relaxed text-on-surface-variant opacity-70">
            A digital gallery dedicated to bringing timeless masterpieces and contemporary brilliance into your personal space. We curate the finest prints with museum-grade quality.
          </p>
          <div className="flex gap-6">
            <a className="material-symbols-outlined hover:text-secondary transition-all" style={{fontSize: '20px'}} href="#">share</a>
            <a className="material-symbols-outlined hover:text-secondary transition-all" style={{fontSize: '20px'}} href="#">mail</a>
            <a className="material-symbols-outlined hover:text-secondary transition-all" style={{fontSize: '20px'}} href="#">public</a>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 text-sm font-label tracking-widest text-primary">
          <div className="space-y-3">
            <h5 className="font-bold text-primary mb-4 lg:mb-6">Service</h5>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Track Order</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Returns</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">FAQ</a>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-primary mb-4 lg:mb-6">About</h5>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Our Story</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Artists</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Careers</a>
          </div>
          <div className="space-y-3 col-span-2 lg:col-span-1">
            <h5 className="font-bold text-primary mb-4 lg:mb-6">Legal</h5>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="block hover:underline decoration-[#805600] underline-offset-4 transition-all opacity-80 hover:opacity-100" href="#">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="mt-12 lg:mt-20 pt-8 border-t border-outline-variant/10 w-full text-center">
        <p className="font-body text-xs lg:text-sm tracking-widest text-on-surface-variant/50">&copy; 2024 Art Curator Digital Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
}
