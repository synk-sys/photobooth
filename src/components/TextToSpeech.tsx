import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Pause, Play, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TextToSpeechProps {
  /** CSS selector for the container whose text content should be read */
  contentSelector: string;
}

const TextToSpeech = ({ contentSelector }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const getTextContent = useCallback(() => {
    const el = document.querySelector(contentSelector);
    return (el as HTMLElement)?.innerText || "";
  }, [contentSelector]);

  const handlePlay = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const text = getTextContent();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [getTextContent, isPaused, rate, isMuted]);

  const handleMuteToggle = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (utteranceRef.current) {
        utteranceRef.current.volume = next ? 0 : 1;
      }
      return next;
    });
  }, []);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={handleMuteToggle}>
        {isMuted ? <VolumeX className="h-4 w-4 text-muted-foreground" /> : <Volume2 className="h-4 w-4 text-primary" />}
      </Button>
      <span className="text-sm font-medium text-foreground hidden sm:inline">Listen</span>

      {!isPlaying && !isPaused ? (
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={handlePlay}>
          <Play className="h-4 w-4" />
        </Button>
      ) : isPlaying ? (
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={handlePause}>
          <Pause className="h-4 w-4" />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={handlePlay}>
          <Play className="h-4 w-4" />
        </Button>
      )}

      {(isPlaying || isPaused) && (
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={handleStop}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs px-3">
            {rate}x
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-3" align="end">
          <p className="text-xs text-muted-foreground mb-2">Speed: {rate}x</p>
          <Slider
            value={[rate]}
            min={0.5}
            max={2}
            step={0.25}
            onValueChange={([v]) => setRate(v)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TextToSpeech;
