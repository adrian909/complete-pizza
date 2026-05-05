import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Pizza, Flame } from "lucide-react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";
import { useLanguage } from "../hooks/useLanguage";

const STATIC_PRODUCTS = [
  { id: "1", title: "Margherita", price: 32.00, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=75", desc: "Mozzarella, sos roșii, busuioc proaspăt", tags: ["pizza"] },
  { id: "2", title: "Pepperoni", price: 38.00, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&q=75", desc: "Pepperoni, mozzarella, sos roșii", tags: ["pizza", "popular"] },
  { id: "3", title: "Quattro Stagioni", price: 42.00, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&q=75", desc: "Șuncă, ciuperci, ardei gras, măsline", tags: ["pizza"] },
  { id: "4", title: "Prosciutto e Funghi", price: 44.00, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=75", desc: "Prosciutto, ciuperci proaspete, mozzarella", tags: ["pizza"] },
  { id: "5", title: "Diavola", price: 40.00, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop&q=75", desc: "Salam picant, ardei iute, mozzarella", tags: ["pizza", "piccante"] },
  { id: "6", title: "Quattro Formaggi", price: 46.00, img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=400&h=300&fit=crop&q=75", desc: "Mozzarella, gorgonzola, parmezan, ricotta", tags: ["pizza"] },
  { id: "7", title: "Calzone", price: 38.00, img: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=400&h=300&fit=crop&q=75", desc: "Pizza rulată cu mozzarella și șuncă", tags: ["pizza", "speciale"] },
  { id: "8", title: "BBQ Chicken", price: 44.00, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&q=75", desc: "Pui la grătar, sos BBQ, ceapă roșie", tags: ["pizza", "popular"] },
  { id: "9", title: "Tiramisu", price: 18.00, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&q=75", desc: "Desert clasic italian cu mascarpone și cafea", tags: ["desert"] },
  { id: "10", title: "Panna Cotta", price: 16.00, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&q=75", desc: "Cremă italiană cu sos de fructe de pădure", tags: ["desert"] },
  { id: "11", title: "Limonadă Artizanală", price: 10.00, img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&q=75", desc: "Limonadă proaspătă cu mentă și ghimbir", tags: ["bautura"] },
  { id: "12", title: "Apă Minerală", price: 6.00, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&q=75", desc: "Apă minerală 500ml", tags: ["bautura"] },
];

const FILTERS = [
  ["all", "Toate"],
  ["pizza", "Pizze"],
  ["piccante", "Piccante"],
  ["speciale", "Speciale"],
  ["desert", "Deserturi"],
  ["bautura", "Băuturi"],
];

const ProductCard = React.memo(({ item, idx, dark, onSelect, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.06 }}
    exit={{ opacity: 0, y: -20 }}>
    <motion.article
      whileHover={{ y: -4 }}
      onClick={() => onSelect(item)}
      className={`group relative rounded-2xl overflow-hidden border shadow-md transition-shadow h-full flex flex-col cursor-pointer ${
        dark
          ? "border-white/10 bg-neutral-900 hover:shadow-lg hover:shadow-black/40"
          : "border-gray-200 bg-white hover:shadow-lg hover:shadow-gray-200"
      }`}>

      <div className="relative h-48 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.tags[0] && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
            dark ? "bg-black/60 text-white" : "bg-white/80 text-gray-800"
          } backdrop-blur-sm capitalize`}>
            {item.tags[0]}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h3 className={`font-bold text-base mb-1 line-clamp-1 ${dark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
        <p className={`text-sm mb-4 line-clamp-2 flex-1 ${dark ? "text-neutral-400" : "text-gray-500"}`}>{item.desc}</p>

        <div className={`text-xl font-black ${dark ? "text-white" : "text-gray-900"}`}>
          {Number(item.price).toFixed(2)}
          <span className={`text-sm font-normal ml-1 ${dark ? "text-neutral-400" : "text-gray-500"}`}>lei</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onSelect(item); }}
        className="w-full py-3 bg-fastfood-red text-white font-semibold hover:bg-fastfood-red/90 transition-colors flex items-center justify-center gap-2 text-sm">
        <Pizza size={16} />
        {t("viewMore")}
      </button>
    </motion.article>
  </motion.div>
), (prev, next) =>
  prev.item.id === next.item.id &&
  prev.idx === next.idx &&
  prev.dark === next.dark &&
  prev.t === next.t
);

ProductCard.displayName = "ProductCard";

function Menu({ dark, filter, setFilter, setSelectedProduct }) {
  const { animationDisabled } = useMobileOptimization();
  const { t } = useLanguage();
  const [displayLimit, setDisplayLimit] = useState(12);

  React.useEffect(() => { setDisplayLimit(12); }, [filter]);

  const filteredMenu = useMemo(() =>
    STATIC_PRODUCTS.filter(m => filter === "all" || m.tags.includes(filter)),
    [filter]
  );

  const displayedMenu = useMemo(() => filteredMenu.slice(0, displayLimit), [filteredMenu, displayLimit]);
  const hasMore = filteredMenu.length > displayLimit;

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
  }, [setSelectedProduct]);

  const headerAnimation = animationDisabled
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.1 } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="menu">
      <section>
        <motion.div {...headerAnimation} viewport={{ once: true, amount: 0.1 }} className="mb-10">
          <h2 className={`text-4xl font-black mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
            {t("menuTitle")}
          </h2>
          <p className={dark ? "text-neutral-400" : "text-gray-500"}>{t("menuDescription")}</p>
        </motion.div>

        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {FILTERS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  filter === id
                    ? "bg-fastfood-red text-white"
                    : dark
                    ? "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedMenu.map((item, idx) => (
            <ProductCard
              key={item.id}
              item={item}
              idx={idx}
              dark={dark}
              onSelect={handleProductClick}
              animationDisabled={animationDisabled}
              t={t}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setDisplayLimit(prev => prev + 12)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                dark
                  ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}>
              {t("viewMore")}
            </button>
          </div>
        )}

        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <Flame size={40} className={`mx-auto mb-3 ${dark ? "text-neutral-600" : "text-gray-300"}`} />
            <p className={dark ? "text-neutral-400" : "text-gray-500"}>{t("noResults")}</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default Menu;
