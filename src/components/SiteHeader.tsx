import { Link } from "@tanstack/react-router";
import { ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/pclab-logo.png";

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="w-full max-w-[1100px] mx-auto flex items-center justify-between mb-6 px-2">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="PCLab logo" className="w-9 h-9 object-contain" />
        <span className="font-display text-[18px] md:text-[20px] font-semibold tracking-[0.2em] uppercase text-foreground">
          PCLab
        </span>
      </Link>
      <nav className="flex items-center gap-2">
        <Link to="/build" className="px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Build
        </Link>
        <a href="https://github.com" className="px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
          GitHub
        </a>
        <button className="px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Log In
        </button>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground hover:bg-accent transition-colors"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-[13px] font-semibold flex items-center gap-1">
          Sign Up
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </nav>
    </header>
  );
}