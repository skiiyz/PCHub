import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Marquee } from "@/components/Marquee";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [{ rel: "canonical", href: "https://pchubb.lovable.app/" }],
  }),
});

function Index() {
  return (
    <main className="min-h-screen px-4 py-10 bg-background">
      <SiteHeader />

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
              color: "#D4F5FF",
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
    </main>
  );
}
