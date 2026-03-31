import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface HoverDropdownProps {
  trigger: React.ReactNode;
  isActive?: boolean;
  children: React.ReactNode;
  align?: "start" | "end";
  transparent?: boolean;
}

export const HoverDropdown = ({ trigger, isActive, children, align = "start", transparent }: HoverDropdownProps) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary",
          isActive ? "text-primary" : transparent ? "text-white/90 hover:text-white" : "text-foreground/80"
        )}
      >
        {trigger}
      </button>
      <div
        className={cn(
          "absolute top-full pt-3 z-[100] transition-all duration-200",
          align === "end" ? "right-0" : "left-0",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        )}
      >
        <div className="min-w-[13rem] overflow-hidden border border-border/50 bg-background p-2 shadow-xl backdrop-blur-sm rounded-sm text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

interface HoverDropdownItemProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverDropdownItem = ({ children, className }: HoverDropdownItemProps) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-primary hover:bg-muted/50",
        className
      )}
    >
      {children}
    </div>
  );
};
