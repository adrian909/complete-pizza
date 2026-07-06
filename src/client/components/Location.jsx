import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink, Phone } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Location({ dark, location }) {
  const { t } = useLanguage();
  const locName = location?.name || "Alba Iulia";
  const googleMapsLink = location?.googleMapsLink || "";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      id="where">

      <div className="text-center mb-12">
        <motion.h2
          initial={{ letterSpacing: "-0.05em" }}
          whileInView={{ letterSpacing: "0em" }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-fastfood-red via-fastfood-orange to-fastfood-yellow bg-clip-text text-transparent mb-4">
          {t("locationTitle")}
        </motion.h2>
        <p className={`text-lg ${dark ? "text-neutral-400" : "text-gray-500"}`}>
          {t("aboutDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}>
          <div className={`rounded-2xl border p-6 ${
            dark
              ? "bg-neutral-900/60 border-neutral-700/50"
              : "bg-white border-gray-200"
          }`}>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fastfood-red to-fastfood-orange flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? "text-neutral-500" : "text-gray-400"}`}>
                    {t("address")}
                  </div>
                  <div className={`text-sm font-medium leading-relaxed ${dark ? "text-neutral-200" : "text-gray-800"}`}>
                    {locName}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fastfood-orange to-fastfood-yellow flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? "text-neutral-500" : "text-gray-400"}`}>
                    {t("hours")}
                  </div>
                  <div className={`text-sm font-medium ${dark ? "text-neutral-200" : "text-gray-800"}`}>
                    {t("footerHoursLabel")}
                  </div>
                  <div className={`text-sm font-medium ${dark ? "text-neutral-200" : "text-gray-800"}`}>
                    {t("footerHoursSun")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fastfood-yellow to-fastfood-orange flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? "text-neutral-500" : "text-gray-400"}`}>
                    {t("phone")}
                  </div>
                  <a href="tel:+40744299399" className="text-sm font-medium text-fastfood-orange hover:text-fastfood-red transition">
                    +40 (744) 299 399
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {googleMapsLink && (
                <motion.a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition ${
                    dark
                      ? "border-neutral-600 hover:border-fastfood-orange/50 text-neutral-300 hover:text-fastfood-orange"
                      : "border-gray-300 hover:border-fastfood-orange/50 text-gray-700 hover:text-fastfood-orange"
                  }`}>
                  <MapPin size={15} />
                  {t("location")}
                  <ExternalLink size={13} />
                </motion.a>
              )}
              <motion.a
                href="tel:+40744299399"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white text-sm font-bold transition hover:shadow-lg hover:shadow-fastfood-red/30">
                {t("orderNow")}
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className={`relative rounded-2xl overflow-hidden border h-80 flex flex-col items-center justify-center text-center gap-4 px-6 ${
            dark
              ? "border-neutral-700/50 bg-gradient-to-br from-fastfood-red/10 via-fastfood-orange/10 to-fastfood-yellow/10"
              : "border-gray-200 bg-gradient-to-br from-fastfood-red/5 via-fastfood-orange/5 to-fastfood-yellow/5"
          }`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fastfood-red to-fastfood-orange flex items-center justify-center shadow-lg">
            <MapPin size={28} className="text-white" />
          </div>
          <p className={`text-sm font-medium max-w-xs ${dark ? "text-neutral-300" : "text-gray-700"}`}>
            {locName}
          </p>
          {googleMapsLink && (
            <motion.a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white text-sm font-bold transition hover:shadow-lg hover:shadow-fastfood-red/30">
              <MapPin size={15} />
              {t("location")}
              <ExternalLink size={13} />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
