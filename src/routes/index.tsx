import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Marquee } from "@/components/Marquee";
import { SiteHeader } from "@/components/SiteHeader";
import { useI18n } from "@/hooks/use-i18n";
import { useAuth } from "@/hooks/use-auth";
import Ballpit from "@/components/backgrounds/Ballpit";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [{ rel: "canonical", href: "https://pchubb.lovable.app/" }],
  }),
});

function Index() {
  const { t } = useI18n();
  const { user, profile } = useAuth();
  const displayName = profile?.username ?? user?.email?.split("@")[0] ?? "";
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

        <div className="absolute inset-0 z-10">
          <Ballpit
            count={160}
            gravity={0.5}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={true}
            colors={[0xD4F5FF, 0x78FABC, 0x0a152d, 0xffffff]}
            ambientColor={16777215}
            ambientIntensity={1}
            lightIntensity={200}
            materialParams={{ metalness: 0.4, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.15 }}
            className="w-full h-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start pointer-events-none"
        >
          <h1
            className="font-serif text-[44px] md:text-[60px] font-semibold tracking-tight leading-[1.02]"
            style={{ 
              color: "#78FABC",
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.6), 0px 0px 30px rgba(0, 0, 0, 0.4)"
            }}
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <p
            className="font-serif italic text-[15px] md:text-[17px] mt-4 max-w-md"
            style={{ color: "#D4F5FF", textShadow: "0px 2px 8px rgba(0, 0, 0, 0.55)" }}
          >
            {t("hero.sub")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 pointer-events-auto"
          >
            <Link
              to="/build"
              className="inline-block bg-[#0a152d] text-white rounded-full px-6 py-2.5 text-[13px] font-semibold"
            >
              {t("hero.cta")}
            </Link>
          </motion.div>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div
              className="px-6 py-3 rounded-full border border-white/30 text-white text-sm md:text-base font-medium tracking-wide"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              Welcome, <span className="font-semibold">{displayName}</span>
            </div>
          </motion.div>
        )}
      </section>

      <div className="max-w-[1400px] mx-auto">
        <Marquee />
      </div>
    </main>
  );
}
