import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen px-4 py-10" style={{ backgroundColor: "#e5e7eb" }}>
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
          <span
            className="font-display text-[20px] md:text-[24px] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#0a1b33" }}
          >
            PCHub
          </span>
          <h1
            className="font-serif text-[44px] md:text-[60px] font-semibold tracking-tight leading-[1.02]"
            style={{ color: "#0a1b33" }}
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40 gap-1"
          >
            <div className="w-9 h-9 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-[#0a1b33] text-sm">
              ✦
            </div>
            <button className="px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors">
              About
            </button>
            <button className="px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors">
              Github
            </button>
            <button className="bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all flex items-center gap-1">
              Try it now
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.nav>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto">
        <Marquee />
      </div>
    </div>
  );
}
