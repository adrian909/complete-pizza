import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";
import { useLanguage } from "../hooks/useLanguage";

const REVIEWS = [
  { name: "Trimitoare S.", text: "Foarte buna livrarea! Cel putin noua ne-au adus pa marginea padurii si s-au scuzat ca nu au putut veni chiar pana unde eram (vorbesc de intravilanul orasului). Livratorul s-a prezentat a fi chiar patronul! Nota 10 pt bun simt", stars: 5 },
  { name: "blue", text: "Pizza foarte gustoasă și plină de ingrediente, pe lângă asta primești și sosuri sau suc (Fanta, Coca-Cola) 10/10", stars: 5 },
  { name: "Antonia S.", text: "A fost o pizza excelenta!!! Recomandam !!", stars: 5 },
];

export default function Testimonials({ dark }) {
  const { animationDisabled } = useMobileOptimization();
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: animationDisabled ? 0.1 : 0.6 }}
      viewport={{ once: false, amount: 0.1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      <div className="text-center mb-12">
        <motion.h2
          initial={{ letterSpacing: "-0.05em" }}
          whileInView={{ letterSpacing: "0em" }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-fastfood-red via-fastfood-orange to-fastfood-yellow bg-clip-text text-transparent mb-4">
          {t("testimonialsTitle")}
        </motion.h2>
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-fastfood-yellow text-xl">★</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: animationDisabled ? 0 : i * 0.1 }}
            whileHover={{ y: -4 }}
            viewport={{ once: false, amount: 0.1 }}
            className={`relative p-6 rounded-2xl border transition-colors ${
              dark
                ? "bg-neutral-900/60 border-neutral-700/50 hover:border-fastfood-orange/40"
                : "bg-white border-gray-200 hover:border-fastfood-orange/40"
            }`}>
            <Quote size={28} className="text-fastfood-orange/40 mb-3" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={idx < item.stars ? "text-fastfood-yellow" : dark ? "text-neutral-700" : "text-gray-300"}>★</span>
              ))}
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-neutral-300" : "text-gray-600"}`}>
              "{item.text}"
            </p>
            <div className={`font-bold text-sm ${dark ? "text-neutral-200" : "text-gray-800"}`}>
              — {item.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
