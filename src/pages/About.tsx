import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col film-grain">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#d4c9b0]">
        <Link to="/" className="font-vintage text-lg text-[#70421A] leading-tight">
          Digital Photobooth
        </Link>
        <div className="flex items-center gap-6 text-sm font-playfair text-[#70421A]">
          <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link to="/newsletter" className="hover:opacity-70 transition-opacity">Newsletter</Link>
          <Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-xl mx-auto text-center gap-8">
        <h1 className="font-vintage text-3xl text-[#70421A]">About</h1>
        <p className="font-playfair text-[#70421A]/80 leading-relaxed">
          I built Digital Photobooth for fun — a playful, nostalgic tool that lets you
          create beautiful retro photo strips right in your browser.
        </p>
        <p className="font-playfair text-[#70421A]/80 leading-relaxed">
          Curious how this was made? Join the waitlist and I'll share my creative process
          step by step. If you love playful, nostalgic design, you'll probably enjoy what I share.
        </p>
        <p className="font-dancing text-xl text-[#70421A]">
          Follow me for more behind-the-scenes and other cool experiments!
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="https://www.instagram.com/meshtimes/" target="_blank" rel="noopener noreferrer" className="btn-vintage text-sm">
            Instagram @meshtimes
          </a>
          <Link to="/newsletter" className="btn-vintage-outline text-sm">
            Join the waitlist
          </Link>
        </div>
      </main>

      <footer className="border-t border-[#d4c9b0] px-6 py-4 text-center text-xs font-playfair text-[#70421A]/50">
        © {new Date().getFullYear()} Digital Photobooth
      </footer>
    </div>
  );
}
