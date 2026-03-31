import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, X } from "lucide-react";
import { motion } from "framer-motion";

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
  const [step, setStep] = useState<"welcome" | "upload" | "customize" | "result">("welcome");
  const [processing, setProcessing] = useState(false);

  // Camera state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraSlot, setCameraSlot] = useState<number>(0);
  const [cameraError, setCameraError] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeSlotRef = useRef<number>(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Camera helpers ──────────────────────────────────────────────
  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const closeCamera = useCallback(() => {
    stopStream();
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCameraOpen(false);
    setCountdown(null);
    setCameraError("");
  }, [stopStream]);

  const openCamera = useCallback(async (slotIndex: number) => {
    setCameraSlot(slotIndex);
    setCameraError("");
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setCameraError("Camera permission denied. Please allow access and try again.");
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
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

  const startCountdown = useCallback(() => {
    setCountdown(3);
    let c = 3;
    countdownRef.current = setInterval(() => {
      c -= 1;
      if (c === 0) {
        clearInterval(countdownRef.current!);
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(c);
      }
    }, 1000);
  }, [capturePhoto]);

  useEffect(() => () => closeCamera(), [closeCamera]);

  // ── File upload helpers ─────────────────────────────────────────
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) => {
        const next = [...prev];
        next[activeSlotRef.current] = ev.target?.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  const clickSlot = (i: number) => {
    activeSlotRef.current = i;
    fileInputRef.current?.click();
  };

  // ── Flow ────────────────────────────────────────────────────────
  const filledCount = photos.filter(Boolean).length;

  const handleStartCamera = async () => {
    setStep("upload");
    // open camera for first empty slot
    const firstEmpty = photos.findIndex((p) => !p);
    await openCamera(firstEmpty >= 0 ? firstEmpty : 0);
  };

  const handleStartUpload = () => setStep("upload");

  const handleContinue = () => {
    if (step === "upload" && filledCount === NUM_SLOTS) setStep("customize");
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
      const a = document.createElement("a");
      a.download = "photobooth-strip.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    } catch {
      alert("Download failed. Please try again.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My Vintage Photobooth Strip", url: window.location.href }); }
      catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const resetAll = () => {
    setPhotos(Array(NUM_SLOTS).fill(null));
    setStep("welcome");
    setNote("");
    setShowDate(true);
    setBg(BACKGROUNDS[0].value);
  };

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // ── Button component ────────────────────────────────────────────
  const VBtn = ({ onClick, disabled = false, outline = false, children }: {
    onClick?: () => void; disabled?: boolean; outline?: boolean; children: React.ReactNode;
  }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={[
        "font-playfair px-8 py-3 rounded-lg text-sm tracking-wide transition-colors",
        outline
          ? "border border-[#70421A] text-[#70421A] bg-transparent hover:bg-[#70421A]/5"
          : "bg-[#70421A] text-[#F5F2E9]",
        disabled ? "opacity-40 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col film-grain">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#d4c9b0]">
        <button onClick={resetAll} className="font-vintage text-lg text-[#70421A] leading-tight text-left hover:opacity-70 transition-opacity">
          Little Vintage<br />Photobooth
        </button>
        <div className="hidden sm:flex items-center gap-6 text-sm font-playfair text-[#70421A]">
          <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link to="/newsletter" className="hover:opacity-70 transition-opacity">Newsletter</Link>
          <Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
        </div>
      </nav>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-5 px-4">
          <div className="relative w-full max-w-sm rounded-lg overflow-hidden border-2 border-[#d4c9b0]">
            {cameraError ? (
              <div className="bg-[#F5F2E9] p-8 text-center font-playfair text-[#70421A]/70 text-sm">{cameraError}</div>
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full" style={{ transform: "scaleX(-1)" }} />
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="font-vintage text-white text-8xl">{countdown}</span>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="font-playfair text-xs text-white/50">Photo {cameraSlot + 1} of {NUM_SLOTS}</p>
          <div className="flex gap-3">
            {!cameraError && (
              <VBtn onClick={startCountdown} disabled={countdown !== null}>
                {countdown !== null ? `${countdown}…` : "Take Photo"}
              </VBtn>
            )}
            <VBtn onClick={closeCamera} outline>Cancel</VBtn>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-10">
        <h1 className="font-vintage text-3xl md:text-4xl text-[#70421A] text-center leading-relaxed">
          Little Vintage Photobooth
        </h1>

        {/* ── Welcome ── */}
        {step === "welcome" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-playfair text-[#70421A]/70 text-sm text-center max-w-xs">
              Create your own vintage photo strip — take selfies or upload from your gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <VBtn onClick={handleStartCamera}>Use Camera</VBtn>
              <VBtn onClick={handleStartUpload} outline>Upload Photos</VBtn>
            </div>
          </motion.div>
        )}

        {/* ── Upload ── */}
        {step === "upload" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-md"
          >
            <div className="grid grid-cols-2 gap-3 w-full">
              {Array(NUM_SLOTS).fill(null).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  {/* Photo slot — click to upload */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => clickSlot(i)}
                    className="photo-slot rounded-lg border border-[#d4c9b0] overflow-hidden focus:outline-none"
                    style={{ aspectRatio: "1" }}
                  >
                    {photos[i] ? (
                      <>
                        <img src={photos[i]!} alt={`Photo ${i + 1}`} className="w-full h-full object-cover retro-filter" />
                        <div className="replace-overlay font-playfair tracking-widest text-xs uppercase rounded-lg">Replace</div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#70421A]/30">
                        <span className="font-vintage text-4xl">{i + 1}</span>
                      </div>
                    )}
                  </motion.button>

                  {/* Per-slot camera button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => openCamera(i)}
                    className="font-playfair text-xs text-[#70421A]/60 hover:text-[#70421A] border border-[#d4c9b0] hover:border-[#70421A] rounded-lg py-1.5 transition-colors"
                  >
                    {photos[i] ? "Retake with Camera" : "Use Camera"}
                  </motion.button>
                </div>
              ))}
            </div>

            <VBtn onClick={handleContinue} disabled={filledCount !== NUM_SLOTS}>
              Continue with {filledCount} photo{filledCount !== 1 ? "s" : ""}
            </VBtn>

            <p className="font-playfair text-xs text-[#70421A]/40 text-center max-w-xs">
              All processing happens locally. Your photos never leave your device.
            </p>
          </motion.div>
        )}

        {/* ── Customize ── */}
        {step === "customize" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start gap-10 w-full max-w-3xl"
          >
            {/* Strip preview */}
            <div
              ref={stripRef}
              className="flex flex-col gap-1 p-3 rounded-lg shadow-lg mx-auto"
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

            {/* Controls */}
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <p className="font-playfair font-semibold text-[#70421A] mb-3 text-sm tracking-wide uppercase">Background</p>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUNDS.map((b) => (
                    <motion.button
                      key={b.value}
                      title={b.label}
                      onClick={() => setBg(b.value)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: b.value,
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
                  className="w-full border border-[#d4c9b0] bg-[#F5F2E9] rounded-lg px-3 py-2 text-sm font-dancing text-[#70421A] placeholder:text-[#70421A]/40 focus:outline-none focus:border-[#70421A]"
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

              <VBtn onClick={handleContinue}>
                {processing ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Processing…
                  </span>
                ) : "Create Strip"}
              </VBtn>
            </div>
          </motion.div>
        )}

        {/* ── Result ── */}
        {step === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-sm"
          >
            <div
              ref={stripRef}
              className="flex flex-col gap-1 p-3 rounded-lg shadow-lg"
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
              <VBtn onClick={handleDownload}>Download Strip</VBtn>
              <VBtn onClick={handleShare} outline>Share</VBtn>
            </div>

            <motion.button
              onClick={resetAll}
              whileHover={{ scale: 1.05 }}
              className="font-playfair text-sm text-[#70421A]/50 underline hover:text-[#70421A] transition-colors"
            >
              Start over
            </motion.button>
          </motion.div>
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
