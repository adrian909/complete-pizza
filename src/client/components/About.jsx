import React from "react";
import { motion } from "framer-motion";
import { smoothScrollTo } from "../../shared/utils/smoothScroll";
import { Star, Users, Truck, Award } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function About({ dark }) {
  const { t } = useLanguage();
  const stats = [
    { icon: Users, label: t("happyClients"), value: "5000+", color: "text-fastfood-blue" },
    { icon: Truck, label: t("deliveriesCompleted"), value: "10000+", color: "text-fastfood-orange" },
    { icon: Award, label: t("awardsReceived"), value: "15", color: "text-fastfood-yellow" },
    { icon: Star, label: t("averageRating"), value: "4.8★", color: "text-fastfood-red" },
  ];

  const values = [
    {
      title: t("premiumQuality"),
      description: t("qualityDescription")
    },
    {
      title: t("speed"),
      description: t("speedDescription")
    },
    {
      title: t("passion"),
      description: t("passionDescription")
    },
    {
      title: t("sustainability"),
      description: t("sustainabilityDescription")
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.05 }}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20`}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.1 }}
        className="text-center mb-16">
        <motion.h2
          initial={{ letterSpacing: "-0.05em" }}
          whileInView={{ letterSpacing: "0em" }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-black bg-gradient-to-r from-fastfood-red via-fastfood-orange to-fastfood-yellow bg-clip-text text-transparent mb-4">
          {t("aboutTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-lg ${dark ? "text-neutral-400" : "text-gray-600"}`}>
          {t("aboutDescription")}
        </motion.p>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.1 }}
        className={`rounded-2xl border p-8 mb-16 ${
          dark
            ? "bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 border-fastfood-orange/30"
            : "bg-gradient-to-br from-white/50 to-gray-50/50 border-gray-300"
        }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}>
            <h3 className="text-3xl font-bold mb-4 text-fastfood-orange">{t("beginning")}</h3>
            <p className={`mb-4 leading-relaxed ${dark ? "text-neutral-300" : "text-gray-700"}`}>
              {t("beginningStory")}
            </p>
            <p className={`leading-relaxed ${dark ? "text-neutral-300" : "text-gray-700"}`}>
              {t("growthStory")}
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-fastfood-red/20 to-fastfood-orange/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🍕</div>
                <p className={`font-bold ${dark ? "text-neutral-200" : "text-gray-800"}`}>
                  {t("passionQuality")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-xl p-6 border text-center ${
                dark
                  ? "bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 border-fastfood-orange/30 hover:border-fastfood-orange/60"
                  : "bg-gradient-to-br from-white/50 to-gray-50/50 border-gray-300 hover:border-gray-400"
              }`}>
              <Icon className={`${stat.color} mx-auto mb-3`} size={32} />
              <div className={`text-3xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
              <p className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Values */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-3xl font-bold text-center mb-12 text-fastfood-orange">
          {t("ourValues")}
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`rounded-xl p-6 border ${
                dark
                  ? "bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 border-fastfood-orange/30"
                  : "bg-gradient-to-br from-white/50 to-gray-50/50 border-gray-300"
              }`}>
              <h4 className="font-bold text-lg mb-3 text-fastfood-orange">{value.title}</h4>
              <p className={dark ? "text-neutral-300" : "text-gray-700"}>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-center">
        <p className={`text-lg mb-6 ${dark ? "text-neutral-300" : "text-gray-700"}`}>
          {t("ctaText")}
        </p>
        <motion.a
          href="#menu"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#menu");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-bold hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-300 text-lg">
          {t("fullMenu")}
        </motion.a>
      </motion.div>
    </motion.section>
  );
}


