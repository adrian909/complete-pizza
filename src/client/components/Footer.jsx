import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight } from "lucide-react";
import { LOGO } from "../constants/ui";
import { useLanguage } from "../hooks/useLanguage";

export default function Footer({ dark }) {
  const { t } = useLanguage();
  return (
    <footer className={`border-t mt-24 py-16 sm:py-20 ${
      dark
        ? "border-fastfood-orange/30"
        : "border-gray-300"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-16 rounded-2xl p-8 sm:p-12 text-center border ${
            dark
              ? "bg-gradient-to-r from-fastfood-red/10 via-fastfood-orange/10 to-fastfood-yellow/10 border-fastfood-orange/30"
              : "bg-gradient-to-r from-fastfood-red/5 via-fastfood-orange/5 to-fastfood-yellow/5 border-fastfood-orange/20"
          }`}>
          <h3 className={`text-3xl sm:text-4xl font-black mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
            {t("footerCTA")}
          </h3>
          <motion.a
            href="tel:+40744299399"
            whileHover={{ scale: 1.05, gap: "1rem" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-300 cursor-pointer border-none">
            {t("orderNow")}
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-36 rounded-lg overflow-hidden">
                <img src="/logo.png" alt="Complete Pizza" className="w-full h-full object-cover" />
              </div>
              <div>
                {LOGO}
                <p className={`text-xs ${dark ? "text-neutral-400" : "text-gray-600"}`}>{t("footerTagline")}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className={`font-black mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-900"}`}>
              <Phone size={18} className="text-fastfood-red" />
              {t("phone")}
            </h4>
            <div className="space-y-3">
              <a
                href="https://www.google.com/maps/place/Complete+Pizza/@46.0754934,23.5606546,17z/data=!3m1!4b1!4m6!3m5!1s0x474ea9579ef98093:0x4c46ac0bc10dffdd!8m2!3d46.0754897!4d23.5632349!16s%2Fg%2F11gh5phh4_?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 hover:text-fastfood-orange transition ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                <MapPin size={16} className="text-fastfood-orange" />
                <span className="text-sm">{t("footerLocation")}</span>
              </a>
              <div className={`flex items-center gap-2 hover:text-fastfood-orange transition ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                <Phone size={16} className="text-fastfood-orange" />
                <a href="tel:+40123456789" className="text-sm">+40 (744) 299 399</a>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className={`font-black mb-4 ${dark ? "text-white" : "text-gray-900"}`}>{t("hours")}</h4>
            <div className={`space-y-2 text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
              <p>{t("footerHoursLabel")}</p>
              <p>{t("footerHoursSun")}</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className={`font-black mb-4 ${dark ? "text-white" : "text-gray-900"}`}>{t("followUs")}</h4>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="https://www.facebook.com/completepizza"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Complete Pizza on Facebook"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-fastfood-red to-fastfood-orange flex items-center justify-center text-white hover:shadow-lg hover:shadow-fastfood-red/50 transition">
                <Facebook size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
          dark ? "border-neutral-800 text-neutral-400" : "border-gray-300 text-gray-600"
        }`}>
          <p className="text-sm">
            {t("©")} &nbsp;·&nbsp; {t("createdBy")}{" "}
            <a
              href="https://trifadrian.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fastfood-orange transition font-medium underline underline-offset-2">
              Adrian Trif
            </a>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="/privacy" className="hover:text-fastfood-orange transition">{t("footerPrivacy")}</a>
            <a href="/cookie-policy" className="hover:text-fastfood-orange transition">{t("footerCookies")}</a>
            <button
              onClick={() => window.dispatchEvent(new Event("openCookieSettings"))}
              className="hover:text-fastfood-orange transition cursor-pointer bg-transparent border-none p-0 font-[inherit] text-[inherit]"
            >
              {t("footerCookieSettings")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


