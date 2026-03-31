import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Camera, Upload, X } from "lucide-react";

const BACKGROUNDS = [
  { label: "Cream", value: "#F5F2E9" },
  { label: "Soft Blue", value: "#E6F4F1" },
  { label: "Pale Pink", value: "#F8E6E8" },
  { label: "Light Yellow", value: "#FFF9E6" },
  { label: "Soft Gray", value: "#F1F0FB" },
  { label: "Pastel Pink", value: "#FFDEE2" },
];

const NUM_SLOTS = 4;

export default function Index() {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(NUM_SLOTS).fill(null));
  const [note, setNote] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [bg, setBg] = useState(BACKGROUNDS[0].value);
  const [step, setStep] = useState<"upload" | "customize" | "result">("upload");
  const [processing, setProcessing] = useState(false);

  // Camera state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraSlot, setCameraSlot] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start camera
  const openCamera = useCallback(async (slotIndex: number) => {
    setCameraSlot(slotIndex);
    setCameraError("");
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraError("Could not access camera. Please allow camera permission.");
    }
  }, []);

  // Stop camera stream
  const closeCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCameraOpen(false);
    setCameraSlot(null);
    setCountdown(null);
    setCameraError("");
  }, []);

  // Capture photo from video
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || cameraSlot === null) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Mirror horizontally (selfie mode)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setPhotos((prev) => {
      const next = [...prev];
      next[cameraSlot] = dataUrl;
      return next;
    });
    closeCamera();
  }, [cameraSlot, closeCamera]);

  // Countdown then capture
  const startCountdown = useCallback(() => {
    setCountdown(3);
    let count = 3;
    countdownRef.current = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(countdownRef.current!);
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [capturePhoto]);

  // Cleanup on unmount
  useEffect(() => () => closeCamera(), [closeCamera]);

  const handleFileChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) => {
        const next = [...prev];
        next[index] = ev.target?.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const filledCount = photos.filter(Boolean).length;
  const canContinue = filledCount === NUM_SLOTS;

  const handleContinue = () => {
    if (step === "upload" && canContinue) setStep("customize");
    else if (step === "customize") {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setStep("result"); }, 1800);
    }
  };

  const handleDownload = async () => {
    if (!stripRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(stripRef.current, { useCORS: true, scale: 2 });
      const link = document.createElement("a");
      link.download = "photobooth-strip.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      alert("Download failed. Please try again.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My Vintage Photobooth Strip", url: window.location.href }); }
      catch { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col film-grain">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#d4c9b0]">
        <Link to="/" className="font-vintage text-lg text-[#70421A] leading-tight">
          Little Vintage<br />Photobooth
        </Link>
        <div className="flex items-center gap-6 text-sm font-playfair text-[#70421A]">
          <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link to="/newsletter" className="hover:opacity-70 transition-opacity">Newsletter</Link>
          <Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
        </div>
      </nav>

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-4 px-4">
          <div className="relative w-full max-w-sm rounded-sm overflow-hidden border-2 border-[#d4c9b0]">
            {cameraError ? (
              <div className="bg-[#F5F2E9] p-8 text-center font-playfair text-[#70421A]/70">{cameraError}</div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full"
                  style={{ transform: "scaleX(-1)" }}
                />
                {/* Countdown overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="font-vintage text-white text-8xl">{countdown}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!cameraError && (
              <button
                onClick={startCountdown}
                disabled={countdown !== null}
                className="btn-vintage flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Camera className="w-4 h-4" />
                {countdown !== null ? `Taking photo in ${countdown}…` : "Take Photo"}
              </button>
            )}
            <button onClick={closeCamera} className="btn-vintage-outline flex items-center gap-2">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
          <p className="font-playfair text-xs text-white/60">Photo {(cameraSlot ?? 0) + 1} of {NUM_SLOTS}</p>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-10">
        <h1 className="font-vintage text-3xl md:text-4xl text-[#70421A] text-center leading-relaxed">
          Little Vintage Photobooth
        </h1>

        {/* Step: Upload */}
        {step === "upload" && (
          <div className="flex flex-col items-center gap-8 w-full max-w-lg">
            <p className="font-playfair text-[#70421A]/80 text-center text-sm">
              Take or upload {NUM_SLOTS} photos to create your vintage strip
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              {Array(NUM_SLOTS).fill(null).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div
                    className="photo-slot rounded-sm border border-[#d4c9b0] cursor-pointer"
                    onClick={() => fileRefs.current[i]?.click()}
                  >
                    {photos[i] ? (
                      <>
                        <img src={photos[i]!} alt={`Photo ${i + 1}`} className="w-full h-full object-cover retro-filter" />
                        <div className="replace-overlay font-playfair tracking-widest text-xs uppercase">Replace</div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#70421A]/40">
                        <span className="font-vintage text-3xl">{i + 1}</span>
                        <Upload className="w-4 h-4" />
                        <span className="font-playfair text-xs tracking-wider">Upload</span>
                      </div>
                    )}
                    <input
                      ref={(el) => { fileRefs.current[i] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(i, e)}
                    />
                  </div>
                  {/* Camera button per slot */}
                  <button
                    onClick={() => openCamera(i)}
                    className="flex items-center justify-center gap-1.5 text-xs font-playfair text-[#70421A]/60 hover:text-[#70421A] transition-colors py-1 border border-[#d4c9b0] rounded-sm hover:border-[#70421A]"
                  >
                    <Camera className="w-3 h-3" />
                    {photos[i] ? "Retake" : "Use Camera"}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className="btn-vintage disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue →
            </button>
            <p className="font-playfair text-xs text-[#70421A]/50 text-center max-w-xs">
              All photo processing happens locally in your browser. Your photos never leave your device.
            </p>
          </div>
        )}

        {/* Step: Customize */}
        {step === "customize" && (
          <div className="flex flex-col md:flex-row items-start gap-10 w-full max-w-3xl">
            <div
              ref={stripRef}
              className="flex flex-col gap-1 p-3 rounded-sm shadow-lg mx-auto"
              style={{ background: bg, minWidth: 200 }}
            >
              {photos.map((src, i) => (
                <div key={i} className="w-48 overflow-hidden rounded-sm" style={{ aspectRatio: "1" }}>
                  {src && <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover retro-filter" />}
                </div>
              ))}
              {showDate && <p className="font-dancing text-center text-xs text-[#70421A]/70 mt-1 pt-1">{today}</p>}
              {note && <p className="font-dancing text-center text-sm text-[#70421A] pb-1">{note}</p>}
            </div>

            <div className="flex flex-col gap-6 flex-1">
              <div>
                <p className="font-playfair font-semibold text-[#70421A] mb-3 text-sm tracking-wide uppercase">Background</p>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUNDS.map((b) => (
                    <button
                      key={b.value}
                      title={b.label}
                      onClick={() => setBg(b.value)}
                      className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        background: b.value,
                        borderColor: bg === b.value ? "#70421A" : "transparent",
                        outline: bg === b.value ? "2px solid #70421A" : "2px solid #d4c9b0",
                        outlineOffset: 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-playfair font-semibold text-[#70421A] mb-2 text-sm tracking-wide uppercase">Add a note</p>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Summer 2025 ♡"
                  className="w-full border border-[#d4c9b0] bg-[#F5F2E9] rounded-sm px-3 py-2 text-sm font-dancing text-[#70421A] placeholder:text-[#70421A]/40 focus:outline-none focus:border-[#70421A]"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="date-toggle"
                  type="checkbox"
                  checked={showDate}
                  onChange={(e) => setShowDate(e.target.checked)}
                  className="accent-[#70421A] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="date-toggle" className="font-playfair text-sm text-[#70421A] cursor-pointer">
                  Display date stamp
                </label>
              </div>

              <button onClick={handleContinue} className="btn-vintage self-start">
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Processing…
                  </span>
                ) : "Create Strip →"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Result */}
        {step === "result" && (
          <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            <div
              ref={stripRef}
              className="flex flex-col gap-1 p-3 rounded-sm shadow-lg"
              style={{ background: bg }}
            >
              {photos.map((src, i) => (
                <div key={i} className="w-48 overflow-hidden rounded-sm" style={{ aspectRatio: "1" }}>
                  {src && <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover retro-filter" />}
                </div>
              ))}
              {showDate && <p className="font-dancing text-center text-xs text-[#70421A]/70 mt-1 pt-1">{today}</p>}
              {note && <p className="font-dancing text-center text-sm text-[#70421A] pb-1">{note}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={handleDownload} className="btn-vintage">Download Strip</button>
              <button onClick={handleShare} className="btn-vintage-outline">Share</button>
            </div>

            <button
              onClick={() => { setPhotos(Array(NUM_SLOTS).fill(null)); setStep("upload"); setNote(""); setShowDate(true); setBg(BACKGROUNDS[0].value); }}
              className="font-playfair text-sm text-[#70421A]/60 underline hover:text-[#70421A] transition-colors"
            >
              Start over
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4c9b0] px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-playfair text-[#70421A]/60">
        <Link to="/privacy" className="hover:text-[#70421A] transition-colors">Privacy Policy</Link>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/meshtimes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#70421A] transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.youtube.com/@meshtimes" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#70421A] transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
        <span className="text-xs">© {new Date().getFullYear()} Little Vintage Photobooth</span>
      </footer>
    </div>
  );
}
