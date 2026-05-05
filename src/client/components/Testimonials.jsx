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
          { name: "Trimitoare S.", text: "Foarte buna livrarea! Cel putin noua ne-au adus pa marginea padurii si s-au scuzat ca nu au putut veni chiar pana unde eram (vorbesc de intravilanul orasului). Livratorul s-a prezentat a fi chiar patronul! Nota 10 pt bun simt", stars: 5 },
          { name: "blue", text: "Pizza foarte gustoasă și plină de ingrediente,pe lângă asta primești și sosuri sau suc(Fanta,Coca-Cola) 10/10", stars: 5 },
          { name: "Antonia S.", text: "A fost o pizza excelenta!!! Recomandam !!", stars: 5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            {...itemAnimation(i)}
            viewport={{ once: false, amount: 0.1 }}
            className={`p-6 rounded-2xl border ${
              dark ? "bg-neutral-900/30 border-neutral-800" : "bg-slate-100 border-slate-300"
            }`}>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={idx < item.stars ? "text-fastfood-yellow" : "text-neutral-600"}>★</span>
              ))}
            </div>
            <div className="font-semibold">{item.name}</div>
            <div className={`mt-2 ${dark ? "text-neutral-400" : "text-slate-600"}`}>{item.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}


