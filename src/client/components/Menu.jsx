import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Flame, TrendingUp, LogIn } from "lucide-react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";
import { useLanguage } from "../hooks/useLanguage";

// Helper function to build API URLs
const API_BASE_URL = "https://backend.trifadrian.ro";
const getApiUrl = (path) => `${API_BASE_URL}${path}`;

// Memoized product card to prevent unnecessary re-renders
const ProductCard = React.memo(({ item, idx, dark, onSelect, animationDisabled, t }) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.08 }}
    exit={{ opacity: 0, y: -20 }}>
    <motion.article
      whileHover={{ scale: 1.05, y: -8 }}
      onClick={() => onSelect(item)}
      className={`group relative rounded-2xl overflow-hidden backdrop-blur border shadow-lg transition-all h-full flex flex-col cursor-pointer ${
        dark
          ? "border-fastfood-orange/30 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 hover:shadow-fastfood-red/50"
          : "border-gray-300 bg-gradient-to-br from-white/90 to-gray-50/90 hover:shadow-fastfood-orange/30"
      }`}>
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-b from-fastfood-red/20 to-fastfood-orange/20">
        <img 
          src={item.img} 
          alt={item.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white text-xs font-bold">
          <Flame size={14} />
          {item.tags[0]}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className={`font-black text-lg mb-2 line-clamp-1 ${dark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
        <p className={`text-sm mb-4 line-clamp-2 ${dark ? "text-neutral-400" : "text-gray-600"}`}>{item.desc}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-3xl font-black bg-gradient-to-r from-fastfood-yellow to-fastfood-orange bg-clip-text text-transparent">
            {Number(item.price).toFixed(2)}
            <span className={`text-xs ml-1 ${dark ? "text-neutral-400" : "text-gray-600"}`}>lei</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
        className="w-full py-3 bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-bold hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-200 flex items-center justify-center gap-2">
        <ShoppingBag size={18} />
        {t("addToCart")}
      </motion.button>
    </motion.article>
  </motion.div>
), (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.idx === nextProps.idx &&
    prevProps.dark === nextProps.dark &&
    prevProps.animationDisabled === nextProps.animationDisabled &&
    prevProps.t === nextProps.t
  );
});

ProductCard.displayName = 'ProductCard';

function Menu({ dark, filter, setFilter, addToCart, products, setSelectedProduct, setQuantity, setCustomizations }) {
  const { animationDisabled, isMobile } = useMobileOptimization();
  const { t } = useLanguage();
  const [displayLimit, setDisplayLimit] = useState(12);
  const [backendProducts, setBackendProducts] = useState([]);
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(getApiUrl("/api/products"));
        if (response.ok) {
          const data = await response.json();
          if (data.documents && Array.isArray(data.documents)) {
            const formattedProducts = data.documents.map(doc => {
              const fields = doc.fields || {};
              
              // Parse customizations from Firestore format
              let customizations = [];
              if (fields.customizations?.arrayValue?.values) {
                customizations = fields.customizations.arrayValue.values.map(val => {
                  const name = val.mapValue?.fields?.name?.stringValue || "";
                  const priceValue = val.mapValue?.fields?.price?.doubleValue || val.mapValue?.fields?.price?.integerValue;
                  const price = typeof priceValue === 'string' ? parseFloat(priceValue) : (priceValue || 0);
                  return { name, price };
                }).filter(c => c.name);
              }

              return {
                id: doc.name.split('/').pop(),
                title: fields.title?.stringValue || "",
                price: fields.price?.doubleValue || 0,
                img: fields.imageUrl?.stringValue || "",
                desc: fields.description?.stringValue || "",
                tags: (fields.category?.stringValue || "").split(",").map(t => t.trim()).filter(t => t),
                customizations: customizations,
              };
            });
            setBackendProducts(formattedProducts);
          }
        }
      } catch (error) {
        // Error fetching products
      } finally {
        setIsLoadingBackend(false);
      }
    };
    fetchProducts();
  }, []);

  const menuToUse = backendProducts.length > 0 ? backendProducts : (products || []);
  const isLoading = isLoadingBackend || (menuToUse.length === 0);

  
  // Memoize filtered menu - prevents recalculation on every render
  const filteredMenu = useMemo(() => 
    menuToUse.filter((m) => filter === "all" || m.tags.includes(filter)),
    [menuToUse, filter]
  );

  // Limited menu based on displayLimit
  const displayedMenu = useMemo(() => 
    filteredMenu.slice(0, displayLimit),
    [filteredMenu, displayLimit]
  );

  const hasMore = filteredMenu.length > displayLimit;

  // Memoize callbacks to prevent prop changes on re-render
  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setCustomizations({});
  }, [setSelectedProduct, setQuantity, setCustomizations]);

  // Reset display limit when filter changes
  React.useEffect(() => {
    setDisplayLimit(12);
  }, [filter]);

  // Optimized animations for mobile
  const headerAnimation = useMemo(() => animationDisabled ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.1 }
  } : {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, ease: "easeOut" }
  }, [animationDisabled]);

  const flameAnimation = useMemo(() => animationDisabled ? null : {
    animate: { scale: [1, 1.2, 1], rotate: [0, 10, 0] },
    transition: { duration: 2, repeat: Infinity, repeatType: "mirror" }
  }, [animationDisabled]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="menu">
      <section>
        <motion.div
          {...headerAnimation}
          viewport={{ once: false, amount: 0.1 }}
          className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              {...flameAnimation}>
              <Flame className="text-fastfood-red" size={32} />
            </motion.div>
            <motion.h2 
              initial={{ letterSpacing: "-0.05em" }}
              whileInView={{ letterSpacing: "0em" }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-black bg-gradient-to-r from-fastfood-red via-fastfood-orange to-fastfood-yellow bg-clip-text text-transparent">
              {t("menuTitle")}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={dark ? "text-neutral-400" : "text-gray-600"}>{t("menuDescription")}</motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {[
              ["all", "🔥 Toate", "Toate"],
              ["burger", "🍔 Burgeri", "Burgeri"],
              ["taco", "🌮 Tacos", "Tacos"],
              ["side", "🍟 Garnituri", "Garnituri"],
              ["drink", "🥤 Băuturi", "Băuturi"],
            ].map(([id, icon, label]) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(id)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                  filter === id
                    ? "bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white shadow-lg shadow-fastfood-red/50"
                    : dark
                    ? "bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 border border-neutral-700/50"
                    : "bg-gray-300/50 text-gray-700 hover:bg-gray-400/50 border border-gray-400/50"
                }`}>
                {icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <div className="w-16 h-16 border-4 border-fastfood-red/30 border-t-fastfood-red rounded-full" />
              </motion.div>
              <p className={`text-lg font-semibold ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                {t("loading")}
              </p>
            </div>
          </div>
        ) : (
        <>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayLimit(prev => prev + 12)}
              className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-200">
              📦 {t("viewMore")}
            </motion.button>
          </motion.div>
        )}
        </>
        )}

        {/* Empty State */}
        {!isLoading && filteredMenu.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20">
            <Flame size={48} className={`mx-auto mb-4 ${dark ? "text-neutral-600" : "text-gray-400"}`} />
            <p className={`text-lg ${dark ? "text-neutral-400" : "text-gray-600"}`}>{t("noResults")}</p>
          </motion.div>
        )}
      </section>
    </main>
  );
}

export default Menu;


