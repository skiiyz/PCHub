import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen px-4 py-10" style={{ backgroundColor: "#ffffff" }}>
      <header className="w-full max-w-[1100px] mx-auto flex items-center justify-between mb-6 px-2">
        <span
          className="font-display text-[18px] md:text-[20px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#0a1b33" }}
        >
          PCHub
        </span>
        <nav className="flex items-center gap-2">
          <button className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-[#0a1b33] transition-colors">
            Build
          </button>
          <button className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-[#0a1b33] transition-colors">
            GitHub
          </button>
          <button className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-[#0a1b33] transition-colors">
            Log In
          </button>
          <button className="bg-[#0a152d] text-white rounded-full px-5 py-2 text-[13px] font-semibold flex items-center gap-1">
            Sign Up
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </header>

      <section className="relative w-full max-w-[1100px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[760px] flex flex-col">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 transition-transform duration-1000"
            style={{ objectPosition: "center 35%" }}
            src="https://cdn.dribbble.com/userupload/37778125/file/original-2b06855274bc3b3466a40656d8faf1ba.mp4"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start"
        >
          <h1
            className="font-serif text-[44px] md:text-[60px] font-semibold tracking-tight leading-[1.02]"
            style={{ 
              color: "#FFFBEA",
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.6), 0px 0px 30px rgba(0, 0, 0, 0.4)"
            }}
          >
            Build your own PC
            <br />
            from scratch
          </h1>
          <p className="font-serif italic text-[15px] md:text-[17px] mt-4 max-w-md" style={{ color: "#0a1b33" }}>
            Build your own PC and compare it. For every budget and taste.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 bg-[#0a152d] text-white rounded-full px-6 py-2.5 text-[13px] font-semibold"
          >
            Start
          </motion.button>
        </motion.div>
      </section>

      <div className="max-w-[1400px] mx-auto">
        <Marquee />
      </div>
    </div>
  );
}
