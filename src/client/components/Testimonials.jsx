import React from "react";
import { motion } from "framer-motion";
import { useMobileOptimization } from "../hooks/useMobileOptimization";
import { useLanguage } from "../hooks/useLanguage";

export default function Testimonials({ dark }) {
  const { animationDisabled } = useMobileOptimization();
  const { t } = useLanguage();

  const containerAnimation = animationDisabled ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.1 }
  } : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const itemAnimation = (index) => animationDisabled ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.1 }
  } : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.1 }
  };

  return (
    <motion.section
      {...containerAnimation}
      viewport={{ once: false, amount: 0.1 }}
      className="mt-16 max-w-6xl mx-auto px-6">
      <h3 className="text-2xl font-bold">{t("testimonialsTitle")}</h3>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Alex", text: "Cea mai bună burger din oraș!", stars: 5 },
          { name: "Maria", text: "Livrarea a fost rapidă și perfect ambalată.", stars: 5 },
          { name: "Ionuț", text: "Prezentare premium, gust autentic.", stars: 4 },
        ].map((t, i) => (
          <motion.div
            key={i}
            {...itemAnimation(i)}
            viewport={{ once: false, amount: 0.1 }}
            className={`p-6 rounded-2xl border ${
              dark ? "bg-neutral-900/30 border-neutral-800" : "bg-slate-100 border-slate-300"
            }`}>
            <div className="font-semibold">{t.name}</div>
            <div className={`mt-2 ${dark ? "text-neutral-400" : "text-slate-600"}`}>{t.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}


