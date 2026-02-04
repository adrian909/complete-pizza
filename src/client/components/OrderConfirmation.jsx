import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

export default function OrderConfirmation({ dark, orderPlaced }) {
  const { t } = useLanguage();
  
  return (
    <AnimatePresence>
      {orderPlaced && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-amber-400 text-black px-6 py-3 rounded-3xl shadow-xl z-50">
          {t("orderNumber")} <strong>{orderPlaced.id}</strong> {t("orderPlaced")} — ETA{" "}
          <strong>{orderPlaced.eta} min</strong>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


