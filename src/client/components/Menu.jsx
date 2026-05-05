import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pizza, Flame, ChevronDown } from "lucide-react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";
import { useLanguage } from "../hooks/useLanguage";

const STATIC_PRODUCTS = [
  // Pizze
  { id: "1",  title: "Pizza Margherita 520gr",  price: 32, img: "/menu/pizza_margherita.jpg",  desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 200g, rosii chery 20g, busuioc proaspat.", tags: ["pizza"] },
  { id: "2",  title: "Pizza Complete 680gr",    price: 42, img: "/menu/pizza_complete.jpg",    desc: "ngrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, şuncă praga 70g, salam rustic 40g, ciuperci champignon proaspete 50g, ardei fasii multicolori 20g, măsline 30g, porumb dulce 20g, branza cheddar arancio.", tags: ["pizza"] },
  { id: "3",  title: "Pizza Forte 600gr",       price: 49, img: "/menu/pizza_forte.jpg",       desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, bacon afumat 30g, şuncă praga 50g, salam rustic 30g, cârnaţ de casa uscat 20g, salam chorizo uscat 30g, nuggets pui 20g.", tags: ["pizza"] },
  { id: "4",  title: "Pizza Hot 600gr",         price: 43, img: "/menu/pizza_hot.jpg",         desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, salam chorizo uscat 100g, măsline 50g, ardei iute proaspat si chili fulgi.", tags: ["pizza"] },
  { id: "5",  title: "Pizza Chicken 500gr",     price: 44, img: "/menu/pizza_chicken.jpg",     desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 50g, mozzarella 130g, nuggets pui 80g, branza cheddar arancio 10g, masline 20 g, rucola.", tags: ["pizza"] },
  { id: "6",  title: "Pizza Bacon 600gr",       price: 45, img: "/menu/pizza_bacon.jpg",       desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, bacon afumat 80g, cărnaţ de casa uscat 40g, ceapă rosie 10g, ardei fasii multicolori 30g, rucola.", tags: ["pizza"] },
  { id: "7",  title: "Pizza US No.1 580gr",     price: 45, img: "/menu/pizza_US_No1.jpg",      desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, salam chorizo uscat 80g, ciuperci champignon proaspete 20g, măsline 30g.", tags: ["pizza"] },
  { id: "8",  title: "Pizza Ton 580gr",         price: 43, img: "/menu/pizza_ton.jpg",         desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, ton 80g, masline 40g, porumb dulce 10g, ceapă rosie.", tags: ["pizza"] },
  { id: "9",  title: "Pizza Rustic",      price: 42, img: "/menu/pizza_rustic.jpg",      desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, cârnaţi de casa uscat 40g, şuncă praga 70g, ciuperci champignon proaspete 40g.", tags: ["pizza"] },
  { id: "10", title: "Pizza Impuls 600gr",      price: 42, img: "/menu/pizza_impuls.jpg",      desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g ei, sunca praga 50g, salam rustic 30g, ciuperci champignon proaspete 40g, masline 30g, ardei fasii multicolori 10g.", tags: ["pizza"] },
  { id: "11", title: "Pizza Target 550gr",      price: 42, img: "/menu/pizza_target.jpg",      desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, şuncă praga 50g, salam rustic 20g, ciuperci champignon proaspete 20g, măsline 20g.", tags: ["pizza"] },
  { id: "12", title: "Pizza Cheese Plus 550gr",     price: 42, img: "/menu/pizza_cheeseplus.jpg",  desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, branza cheddar arancio 50g, formagio blu (gorgonzola) 30g, parmezan 20g.", tags: ["pizza"] },
  { id: "13", title: "Pizza Primavera 670gr",     price: 44, img: "/menu/pizza_primavera.png",  desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, şuncă praga 80g, ciuperci champignon proaspete 50g, broccoli 20g, ardei fasii multicolori 30g, roşii chery 20g, porumb dulce 20g.", tags: ["pizza"] },
  { id: "14", title: "Pizza Vegetable 600gr",   price: 40, img: "/menu/pizza_vegetable.jpg",   desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, ciuperci champignon proaspete 50g, ardei fasii multicolori 20g, porumb dulce 20g, măsline 40g, roşii chery 10g, broccoli 20g, ceapa rosie, usturoi granule.", tags: ["pizza"] },
  { id: "15", title: "Pizza Vegan 600gr",       price: 40, img: "/menu/pizza_vegan.jpg",       desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, tofu afumat (branza din soia) 100g, ciuperci champignon proaspete 70g, ardei fasii multicolori 20g, porumb dulce 20g, măsline 40g, roşii chery 20g, broccoli 20g, ceapa rosie 10g, usturoi granule.", tags: ["pizza"] },
  { id: "16", title: "Pizza York 530gr",        price: 39, img: "/menu/pizza_york.jpg",        desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, şuncă praga 80g.", tags: ["pizza"] },
  { id: "17", title: "Pizza Sal 500gr",         price: 39, img: "/menu/pizza_sal.jpg",         desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, salam rustic 70g.", tags: ["pizza"] },
  { id: "18", title: "Pizza Pro F 550gr",       price: 40, img: "/menu/pizza_pro_f.jpg",       desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, sunca praga 70g, ciuperci champignon proaspete 30g.", tags: ["pizza"] },
  { id: "19", title: "Pizza Kids (cu surpriza) 550gr",        price: 49, img: "/menu/pizza_kids.jpg",        desc: "Ingrediente: aluat proaspat preparat 230g, sos de roşii aromatizat 70g, mozzarella 150g, sunca praga 80g, porumb dulce 20g.", tags: ["pizza"] },
  // Sosuri
  { id: "20", title: "Sos roșii aromatizat dulce",                price: 6, img: "/menu/sos_rosii.png",                desc: "", tags: ["sos"] },
  { id: "21", title: "Sos roșii aromatizat picant",          price: 6, img: "/menu/sos_rosii_picant.png",         desc: "", tags: ["sos"] },
  { id: "22", title: "Ketchup Dulce Tomi",        price: 6, img: "/menu/ketchup_dulce_Tomi.jpg",       desc: "", tags: ["sos"] },
  { id: "23", title: "Ketchup Picant Tomi",       price: 6, img: "/menu/ketchup_picant_Tomi.jpg",      desc: "", tags: ["sos"] },
  { id: "24", title: "Sos Maioneză cu Usturoi",   price: 6, img: "/menu/sos_maioneza_cu_usturoi.jpg",  desc: "", tags: ["sos"] },
  // Băuturi
  { id: "25", title: "Coca-Cola 500ml",           price: 10, img: "/menu/coca_cola.jpg",                desc: "", tags: ["bautura"] },
  { id: "26", title: "Coca-Cola 330ml",           price: 9, img: "/menu/coca_cola_330.jpg",            desc: "", tags: ["bautura"] },
  { id: "27", title: "Coca-Cola Zero Zahar 330ml",            price: 9, img: "/menu/coca_cola_zero_zahar.jpg",     desc: "", tags: ["bautura"] },
  { id: "28", title: "Fanta Portocale 330ml",     price: 9, img: "/menu/fanta_portocale.jpg",          desc: "", tags: ["bautura"] },
  { id: "29", title: "Fanta Portocale 500ml",     price: 10, img: "/menu/fanta_portocale_500.jpg",      desc: "", tags: ["bautura"] },
  { id: "30", title: "FuzeTea Piersică 500ml",          price: 10, img: "/menu/fuzetea_piersica.jpg",         desc: "", tags: ["bautura"] },
  { id: "31", title: "FuzeTea Fructe de Pădure 500ml",  price: 10, img: "/menu/fuzetea_fructe_padure.jpg",    desc: "", tags: ["bautura"] },
  { id: "32", title: "Schweppes Tonic 500ml",           price: 10, img: "/menu/schweppes_tonic.jpg",          desc: "", tags: ["bautura"] },
  { id: "33", title: "Schweppes Mandarină 500ml",       price: 10, img: "/menu/schwepped_mandarina.jpg",      desc: "", tags: ["bautura"] },
  { id: "34", title: "Cappy Pulpy Portocală 330ml",     price: 10, img: "/menu/Cappy_pulpy_portocala.jpg",    desc: "", tags: ["bautura"] },
  { id: "35", title: "Cappy Pulpy Piersică 330ml",      price: 10, img: "/menu/Cappy_pulpy_piersica.webp",    desc: "", tags: ["bautura"] },
  { id: "36", title: "Bere Heineken 500ml",             price: 12, img: "/menu/bere_heineken.jpg",            desc: "", tags: ["bautura"] },
  { id: "37", title: "Bere Heineken fără alcool 500ml", price: 12, img: "/menu/bere_heineken_fara_alc.jpg",   desc: "", tags: ["bautura"] },
  { id: "38", title: "Bere Ciuc 500ml",                 price: 12, img: "/menu/bere_ciuc.jpg",                desc: "", tags: ["bautura"] },
  { id: "39", title: "Apă Minerală Dorna 500ml",        price: 8, img: "/menu/apa_minerala_dorna.jpg",       desc: "", tags: ["bautura"] },
  { id: "40", title: "Apă Plată Dorna 500ml",           price: 8, img: "/menu/apa_plata_dorna.jpg",          desc: "", tags: ["bautura"] },
  { id: "41", title: "Cafea Expresso 120ml",                 price: 10, img: "/menu/bere_ciuc.jpg",                desc: "", tags: ["bautura"] },
  { id: "42", title: "Cafea Cappuccino 200ml",        price: 15, img: "/menu/apa_minerala_dorna.jpg",       desc: "", tags: ["bautura"] },
  { id: "43", title: "Ceai 200ml",           price: 10, img: "/menu/apa_plata_dorna.jpg",          desc: "", tags: ["bautura"] },
];

const FILTERS = [
  ["all", "Toate"],
  ["pizza", "Pizze"],
  ["sos", "Sosuri"],
  ["bautura", "Băuturi"],
];

const ALLERGENS = [
  "Cereale care conțin gluten (grâu, secară, orz, ovăz, grâu spelt, grâu mare sau hibrizi ai acestora) și produse derivate",
  "Crustacee și produse derivate",
  "Ouă și produse derivate",
  "Pește și produse derivate",
  "Arahide și produse derivate",
  "Soia și produse derivate",
  "Lapte și produse derivate (inclusiv lactoză)",
  "Fructe cu coajă (migdale, alune de pădure, nuci, anacarde, nuci Pecan, nuci de Brazilia, fistic, nuci de Macadamia) și produse derivate",
  "Țelină și produse derivate",
  "Muștar și produse derivate",
  "Semințe de susan și produse derivate",
  "Dioxid de sulf și sulfiți în concentrații de peste 10 mg/kg sau 10 mg/litru",
  "Lupin și produse derivate",
  "Moluște și produse derivate",
];

function AllergenSection({ dark }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mt-12 rounded-xl border overflow-hidden ${dark ? "border-neutral-700" : "border-gray-200"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-6 py-4 text-left transition ${
          dark ? "bg-neutral-900 hover:bg-neutral-800" : "bg-gray-50 hover:bg-gray-100"
        }`}>
        <span className={`font-bold text-sm ${dark ? "text-neutral-200" : "text-gray-800"}`}>
          ⚠️ Informații alergeni
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""} ${dark ? "text-neutral-400" : "text-gray-500"}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <div className={`px-6 py-5 text-sm ${dark ? "bg-neutral-900/50 text-neutral-300" : "bg-white text-gray-700"}`}>
              <p className="font-semibold mb-3">
                PREPARATELE NOASTRE POT CONȚINE UNUL SAU MAI MULTE DIN URMĂTOARELE INGREDIENTE CE FAC PARTE DIN GRUPELE RECUNOSCUTE DE ALERGENI.
              </p>
              <p className={`mb-3 ${dark ? "text-neutral-400" : "text-gray-500"}`}>
                Alergenii din alimente se pot încadra conform Directivei 2000/13/CE în următoarele grupe:
              </p>
              <ol className={`list-decimal list-inside space-y-1 mb-4 ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                {ALLERGENS.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
              <p className={`mb-2 ${dark ? "text-neutral-300" : "text-gray-700"}`}>
                Unele produse din meniul nostru pot conține alergeni. În cazul în care sunteți intolerant / alergic la un ingredient, înainte de a comanda orice preparat din meniul nostru consultați lista cu ingredientele conținute de preparate și / sau întrebați personalul Complete Pizza.
              </p>
              <p className="font-semibold text-fastfood-orange">Vă mulțumim pentru înțelegere!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

        <AllergenSection dark={dark} />
      </section>
    </section>
  );
}

export default Menu;
