import React, { useState, useLayoutEffect, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMobileOptimization } from "./hooks/useMobileOptimization";
import { useLanguage } from "./hooks/useLanguage";
import { useScrollLock } from "../shared/utils/scrollLock";
import Navigation from "./components/Navigation";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";

const Location = lazy(() => import("./components/Location"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const About = lazy(() => import("./components/About"));
const Footer = lazy(() => import("./components/Footer"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-fastfood-red mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Se încarcă...</p>
      </div>
    </div>
  );
}

const STATIC_LOCATION = {
  name: "Alba Iulia – Cetate, str. Constantin Brancoveanu (Vanatorilor), nr 21, colt cu Stefan cel Mare (Mesteacanului)",
  googleMapsLink: "https://www.google.com/maps/place/Complete+Pizza/@46.0754934,23.5606546,17z/data=!3m1!4b1!4m6!3m5!1s0x474ea9579ef98093:0x4c46ac0bc10dffdd!8m2!3d46.0754897!4d23.5632349!16s%2Fg%2F11gh5phh4_?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
};

function AppContent() {
  const { animationDisabled } = useMobileOptimization();
  const { t } = useLanguage();

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) { try { return JSON.parse(saved); } catch { return true; } }
    return true;
  });
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useScrollLock(selectedProduct !== null);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <>
      <AnnouncementBar dark={dark} />
      <Navigation dark={dark} setDark={setDark} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen antialiased relative overflow-hidden ${
          dark
            ? "dark bg-gradient-to-b from-[#0b0b0b] to-[#111827] text-slate-100"
            : "bg-gradient-to-b from-white to-slate-50 text-slate-900"
        }`}>
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block"
          style={{ background: dark ? "radial-gradient(circle, #FF6B35, transparent)" : "radial-gradient(circle, #E85A1F, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.2 : 0.12 }} />
        <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block"
          style={{ background: dark ? "radial-gradient(circle, #FF2D55, transparent)" : "radial-gradient(circle, #D91C46, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.2 : 0.12, animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block"
          style={{ background: dark ? "radial-gradient(circle, #4A90E2, transparent)" : "radial-gradient(circle, #2563EB, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.15 : 0.1, animationDelay: "2s" }} />

        <Hero dark={dark} />

        <div id="menu">
          <Menu dark={dark} filter={filter} setFilter={setFilter} setSelectedProduct={setSelectedProduct} />
        </div>

        <div id="where" className="mt-24">
          <Suspense fallback={null}>
            <Location dark={dark} location={STATIC_LOCATION} />
          </Suspense>
        </div>

        <div id="about" className="mt-24">
          <Suspense fallback={null}>
            <Testimonials dark={dark} />
          </Suspense>
        </div>

        <div className="mt-24">
          <Suspense fallback={null}>
            <About dark={dark} />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Footer dark={dark} />
        </Suspense>
      </motion.main>

      {/* Product detail modal — browse only, no ordering */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
              <div className={`w-full max-w-sm max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto relative ${
                dark ? "bg-neutral-900 border border-neutral-800" : "bg-white border border-gray-200"
              }`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(null)}
                  className={`absolute top-4 right-4 p-2 rounded-full z-50 transition ${
                    dark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-gray-200 hover:bg-gray-300"
                  }`}>
                  <X size={24} className={dark ? "text-white" : "text-gray-900"} />
                </motion.button>

                <div className="w-full h-56 bg-gradient-to-b from-fastfood-red/20 to-fastfood-orange/20 flex-shrink-0 overflow-hidden flex items-center justify-center p-2">
                  {selectedProduct.img ? (
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.title}
                      className={`h-full w-full object-cover rounded-xl border-4 ${
                        dark ? "border-neutral-600" : "border-gray-400"
                      }`}
                    />
                  ) : (
                    <div className={`h-full w-full flex items-center justify-center rounded-xl border-4 ${
                      dark ? "border-neutral-600 bg-neutral-700" : "border-gray-400 bg-gray-200"
                    }`}>
                      <span className={`text-sm font-semibold ${dark ? "text-neutral-400" : "text-gray-600"}`}>Fără imagine</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6 flex flex-col overflow-y-auto">
                  <h2 className={`text-3xl font-black mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
                    {selectedProduct.title}
                  </h2>
                  <p className={`text-sm mb-4 ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                    {selectedProduct.desc}
                  </p>
                  <div className="flex items-baseline gap-2 mt-auto">
                    <div className="text-4xl font-black bg-gradient-to-r from-fastfood-yellow to-fastfood-orange bg-clip-text text-transparent">
                      {Number(selectedProduct.price).toFixed(2)}
                    </div>
                    <span className={`text-lg ${dark ? "text-neutral-400" : "text-gray-600"}`}>lei</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppContent />
    </Suspense>
  );
}
