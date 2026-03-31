import { Link } from "react-router-dom";

export default function Newsletter() {
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
        <h1 className="font-vintage text-3xl text-[#70421A]">Join the Waitlist</h1>
        <p className="font-playfair text-[#70421A]/80 leading-relaxed">
          Curious how this was made? Join the waitlist and I'll share my creative process
          step by step — plus other playful, nostalgic design experiments.
        </p>
        <p className="font-dancing text-lg text-[#70421A]">
          "I built this vintage photobooth for fun, and if you love playful, nostalgic design,
          you'll probably enjoy what I share."
        </p>

        {/* BeHiiv embed */}
        <iframe
          src="https://embeds.beehiiv.com/08df6ccd-daa0-4bea-96cf-71cc0b29c74c"
          data-test-id="beehiiv-embed"
          width="100%"
          height="320"
          frameBorder="0"
          scrolling="no"
          style={{ borderRadius: 4, border: "1px solid #d4c9b0", background: "transparent" }}
          title="Newsletter signup"
        />
      </main>

      <footer className="border-t border-[#d4c9b0] px-6 py-4 text-center text-xs font-playfair text-[#70421A]/50">
        © {new Date().getFullYear()} Digital Photobooth
      </footer>
    </div>
  );
}
