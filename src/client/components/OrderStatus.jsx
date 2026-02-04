import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { X, Clock, ChefHat, Truck, CheckCircle } from "lucide-react";

export default function OrderStatus({ dark, orderPlaced, showOrderStatus, onClose }) {
  const { t } = useLanguage();

  // Force re-render every second for countdown display
  const [, setSecond] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple countdown calculation - based on order timestamp and original ETA
  const getDisplayEta = () => {
    if (!orderPlaced || !orderPlaced.timestamp || !orderPlaced.eta) return 0;
    
    const orderTime = new Date(orderPlaced.timestamp).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - orderTime) / 1000);
    const remainingSeconds = Math.max(0, (orderPlaced.eta * 60) - elapsedSeconds);
    const remainingMinutes = Math.ceil(remainingSeconds / 60);
    
    return remainingMinutes;
  };

  const displayEta = getDisplayEta();
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={24} className="text-fastfood-yellow" />;
      case "preparing":
        return <ChefHat size={24} className="text-fastfood-orange" />;
      case "ready":
        return <Truck size={24} className="text-fastfood-blue" />;
      case "completed":
        return <CheckCircle size={24} className="text-fastfood-green" />;
      default:
        return <Clock size={24} className="text-fastfood-yellow" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return t("processing");
      case "preparing":
        return t("processing");
      case "ready":
        return t("shipped");
      case "completed":
        return t("delivered");
      default:
        return t("orderStatus");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-fastfood-yellow/10 border-fastfood-yellow/30";
      case "preparing":
        return "bg-fastfood-orange/10 border-fastfood-orange/30";
      case "ready":
        return "bg-fastfood-blue/10 border-fastfood-blue/30";
      case "completed":
        return "bg-fastfood-green/10 border-fastfood-green/30";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <AnimatePresence>
      {orderPlaced && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-[9980]"
          />

          {/* Modal - Centered on viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none`}>
            <div className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto relative ${
              dark ? "bg-gray-900 border border-fastfood-orange/30" : "bg-white border border-gray-200"
            }`}>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full z-50 transition ${
                  dark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                }`}>
                <X size={20} />
              </motion.button>

              <div className="p-8 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-fastfood-red/20 to-fastfood-orange/20">
                    {getStatusIcon(orderPlaced.status || "pending")}
                  </div>
                </motion.div>

                {/* Order ID */}
                <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-fastfood-red to-fastfood-orange bg-clip-text text-transparent">
                  #{orderPlaced.id}
                </h2>

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-4 rounded-xl mb-6 border ${getStatusColor(orderPlaced.status || "pending")}`}>
                  <div className="font-semibold text-lg mb-1">
                    {getStatusLabel(orderPlaced.status || "pending")}
                  </div>
                  {orderPlaced.status === "pending" && (
                    <div className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                      Așteptând pregătire... ⏳
                    </div>
                  )}
                  {orderPlaced.status === "preparing" && (
                    <div className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                      Echipa pregătește comanda ta 👨‍🍳
                    </div>
                  )}
                  {orderPlaced.status === "ready" && (
                    <div className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                      Comanda e gata! Vino s-o ridici 🎉
                    </div>
                  )}
                  {orderPlaced.status === "completed" && (
                    <div className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                      Mulțumim pentru comandă! 🙏
                    </div>
                  )}
                </motion.div>

                {/* ETA - Only show if not completed */}
                {orderPlaced.status !== "completed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`p-4 rounded-xl mb-6 border ${dark ? "bg-gray-800/50 border-fastfood-orange/20" : "bg-gray-50 border-gray-200"}`}>
                    <div className={`text-sm ${dark ? "text-neutral-400" : "text-gray-600"}`}>
                      Timp estimat
                    </div>
                    <div className="text-2xl font-black text-fastfood-orange">
                      ~{displayEta} min
                    </div>
                  </motion.div>
                )}

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`p-4 rounded-xl border mb-6 ${dark ? "bg-gray-800/50 border-fastfood-orange/20" : "bg-gray-50 border-gray-200"}`}>
                  <div className="space-y-3">
                    {[
                      { status: "pending", label: "Comanda primită", completed: true },
                      { status: "preparing", label: "Se prepară", completed: orderPlaced.status !== "pending" },
                      { status: "ready", label: "Gata", completed: orderPlaced.status === "ready" || orderPlaced.status === "completed" },
                      { status: "completed", label: "Finalizată", completed: orderPlaced.status === "completed" }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          step.completed
                            ? "bg-fastfood-green text-white"
                            : orderPlaced.status === step.status
                            ? "bg-fastfood-orange text-white animate-pulse"
                            : `${dark ? "bg-gray-700" : "bg-gray-300"} ${dark ? "text-gray-400" : "text-gray-600"}`
                        }`}>
                          {step.completed ? "✓" : idx + 1}
                        </div>
                        <span className={`text-sm font-medium ${
                          step.completed || orderPlaced.status === step.status
                            ? dark ? "text-white" : "text-gray-900"
                            : dark ? "text-neutral-500" : "text-gray-500"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-bold hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-200">
                  OK, am înțeles
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


