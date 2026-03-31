import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col items-center justify-center gap-6 text-center px-6 film-grain">
      <h1 className="font-vintage text-5xl text-[#70421A]">404</h1>
      <p className="font-playfair text-[#70421A]/70 text-lg">This page doesn't exist.</p>
      <Link to="/" className="btn-vintage">Back to Photobooth</Link>
    </div>
  );
}
