import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { smoothScrollTo } from "../../shared/utils/smoothScroll";
import { LOGO } from "../constants/ui";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../hooks/useLanguage";

export default function Navigation({ dark, setDark }) {
  const { t } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9997] border-b backdrop-blur-sm ${
        dark
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 border-fastfood-orange/30"
          : "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-gray-400"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-12 w-auto rounded-lg overflow-hidden shadow-lg shadow-fastfood-red/50 cursor-pointer">
            <img src="/logo.png" alt="Complete Pizza" className="w-full h-full object-cover" />
          </motion.div>

          {LOGO}

          <div className="hidden md:flex gap-8 items-center ml-12">
            <motion.a
              href="#menu"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#menu"); }}
              whileHover={{ color: "#FF2D55" }}
              className={`hover:text-fastfood-red cursor-pointer transition text-sm font-medium ${dark ? "text-gray-100" : "text-gray-700"}`}>
              {t("menu")}
            </motion.a>
            <motion.a
              href="#where"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#where"); }}
              whileHover={{ color: "#FF2D55" }}
              className={`hover:text-fastfood-red cursor-pointer transition text-sm font-medium ${dark ? "text-gray-100" : "text-gray-700"}`}>
              {t("location")}
            </motion.a>
            <motion.a
              href="#about"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#about"); }}
              whileHover={{ color: "#FF2D55" }}
              className={`hover:text-fastfood-red cursor-pointer transition text-sm font-medium ${dark ? "text-gray-100" : "text-gray-700"}`}>
              {t("about")}
            </motion.a>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <LanguageSelector dark={dark} compact={false} />
          </div>
          <div className="block sm:hidden">
            <LanguageSelector dark={dark} compact={true} />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Activează modul luminos" : "Activează modul întunecat"}
            className={`p-2 rounded-lg transition ${
              dark
                ? "bg-neutral-800/50 hover:bg-neutral-700/50"
                : "bg-gray-200/80 hover:bg-gray-300/80"
            }`}>
            {dark ? <Sun size={18} className="text-fastfood-yellow" /> : <Moon size={18} className="text-gray-700" />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
