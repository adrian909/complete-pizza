import { motion } from "framer-motion";
import { Star, Users, Truck, MapPin } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function About({ dark }) {
  const { t } = useLanguage();
  const stats = [
    { icon: Users, label: t("happyClients"), value: "2000+", color: "text-fastfood-blue" },
    { icon: Truck, label: t("deliveriesCompleted"), value: "1000+", color: "text-fastfood-orange" },
    { icon: MapPin, label: t("locations"), value: "1", color: "text-fastfood-yellow" },
    { icon: Star, label: t("averageRating"), value: "3.9★", color: "text-fastfood-red" },
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
        className={`rounded-2xl border p-8 mb-28 ${
          dark
            ? "bg-neutral-900/60 border-neutral-700/50"
            : "bg-white border-gray-200"
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
            className="relative h-64 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&q=75"
              alt="Complete Pizza"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-xl p-6 border text-center ${
                dark
                  ? "bg-neutral-900/60 border-neutral-700/50 hover:border-fastfood-orange/40"
                  : "bg-white border-gray-200 hover:border-fastfood-orange/40"
              }`}>
              <Icon className={`${stat.color} mx-auto mb-3`} size={32} />
              <div className={`text-3xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
              <p className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Values */}
      <div className="mb-10">
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
                  ? "bg-neutral-900/60 border-neutral-700/50"
                  : "bg-white border-gray-200"
              }`}>
              <h4 className="font-bold text-lg mb-3 text-fastfood-orange">{value.title}</h4>
              <p className={dark ? "text-neutral-300" : "text-gray-700"}>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </motion.section>
  );
}


