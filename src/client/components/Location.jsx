import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { smoothScrollTo } from "../../shared/utils/smoothScroll";
import { useLanguage } from "../hooks/useLanguage";

export default function Location({ dark, locationToday }) {
  const { t } = useLanguage();
  // Support both string (legacy) and object format
  const locName = typeof locationToday === "string" ? locationToday : locationToday?.name || "Sebes";
  const mapLink = typeof locationToday === "object" ? locationToday?.mapLink : "";
  const googleMapsLink = typeof locationToday === "object" ? locationToday?.googleMapsLink : "";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.1 }}
      className="mt-16 max-w-6xl mx-auto px-6"
      id="where">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold">{t("locationTitle")}</h3>
          <p className={`mt-2 ${dark ? "text-neutral-400" : "text-slate-600"}`}>
            {t("aboutDescription")}
          </p>

          <div
            className={`mt-4 p-4 rounded-xl border ${
              dark ? "bg-neutral-900/30 border-neutral-800" : "bg-slate-100 border-slate-300"
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-xs ${dark ? "text-neutral-400" : "text-slate-500"}`}>
                  {t("address")}
                </div>
                <div className="font-semibold">{locName}</div>
              </div>

              <div>
                <div className={`text-xs ${dark ? "text-neutral-400" : "text-slate-500"}`}>
                  {t("hours")}
                </div>
                <div className="font-semibold">12:00 — 22:00</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {googleMapsLink && (
                <motion.a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                    dark ? "border-neutral-600 hover:bg-neutral-800" : "border-slate-300 hover:bg-slate-200"
                  }`}>
                  {t("location")}
                  <ExternalLink size={16} />
                </motion.a>
              )}
              <motion.button
                onClick={() => smoothScrollTo("#menu")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-amber-400 text-black hover:bg-amber-500 transition">
                {t("orderNow")}
              </motion.button>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl overflow-hidden border ${dark ? "border-neutral-800" : "border-slate-300"}`}>
          {mapLink ? (
            <iframe
              width="100%"
              height="256"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              src={mapLink}
              title="Locația Food Truck"
            ></iframe>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-700/20">
              <p className={dark ? "text-gray-400" : "text-gray-600"}>Harta nu este disponibilă</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}


