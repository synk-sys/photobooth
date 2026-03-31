import { Link } from "react-router-dom";

export default function Privacy() {
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

      <main className="flex-1 px-6 py-16 max-w-2xl mx-auto w-full">
        <h1 className="font-vintage text-3xl text-[#70421A] mb-10">Privacy Policy</h1>

        <div className="flex flex-col gap-8 font-playfair text-[#70421A]/80 leading-relaxed">
          <section>
            <h2 className="font-playfair font-semibold text-[#70421A] text-lg mb-3">Your Photos Stay on Your Device</h2>
            <p>
              All photo processing happens locally in your browser. Your photos remain on your
              device and are never uploaded to any server unless you explicitly choose to share them.
            </p>
          </section>

          <section>
            <h2 className="font-playfair font-semibold text-[#70421A] text-lg mb-3">What We Don't Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>We do not store the photos you upload.</li>
              <li>We do not store your photos on any servers.</li>
              <li>We do not sell or share any personal data.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair font-semibold text-[#70421A] text-lg mb-3">Analytics</h2>
            <p>
              We use anonymous analytics (Vercel Analytics) to understand general usage patterns.
              No personally identifiable information is collected.
            </p>
          </section>

          <section>
            <h2 className="font-playfair font-semibold text-[#70421A] text-lg mb-3">Newsletter</h2>
            <p>
              If you sign up for the newsletter, your email is handled by BeHiiv. You can
              unsubscribe at any time.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[#d4c9b0] px-6 py-4 text-center text-xs font-playfair text-[#70421A]/50">
        © {new Date().getFullYear()} Digital Photobooth
      </footer>
    </div>
  );
}
