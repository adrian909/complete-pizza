import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import OrderStatus from "./OrderStatus";

export default function MyOrders({ dark, onBack, orders, currentUser, isLoadingOrders }) {
  const { t } = useLanguage();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);

  // Get current user's orders
  const userOrders = orders
    .filter((order) => order.userId === currentUser?.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 border-green-500/50 text-green-400";
      case "preparing":
        return "bg-fastfood-orange/20 border-fastfood-orange/50 text-fastfood-orange";
      default:
        return "bg-blue-500/20 border-blue-500/50 text-blue-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} />;
      case "preparing":
        return <Truck size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "✅ Completată";
      case "preparing":
        return "🚚 Se prepară";
      default:
        return "⏳ În așteptare";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/60 z-[9980] backdrop-blur-sm"
      />
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-[9981] overflow-y-auto ${
          dark
            ? "dark bg-gradient-to-b from-[#0b0b0b] to-[#111827] text-slate-100"
            : "bg-gradient-to-b from-white to-slate-50 text-slate-900"
        }`}>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block"
          style={{background: dark ? "radial-gradient(circle, #FF6B35, transparent)" : "radial-gradient(circle, #E85A1F, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.2 : 0.12}}></div>
        <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block" 
          style={{background: dark ? "radial-gradient(circle, #FF2D55, transparent)" : "radial-gradient(circle, #D91C46, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.2 : 0.12, animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full filter blur-2xl animate-float pointer-events-none hidden md:block"
          style={{background: dark ? "radial-gradient(circle, #4A90E2, transparent)" : "radial-gradient(circle, #2563EB, transparent)", mixBlendMode: dark ? "screen" : "multiply", opacity: dark ? 0.15 : 0.1, animationDelay: "2s"}}></div>

        {/* Content */}
        <div className="relative z-10">
        {/* Header */}
        <div className={`max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b ${dark ? "border-neutral-800" : "border-slate-200"}`}>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition ${
                dark ? "bg-neutral-900 hover:bg-neutral-800" : "bg-slate-200 hover:bg-slate-300"
              }`}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold">📦 {t("myOrders")}</h1>
              <p className={`text-sm ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                {t("aboutDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {isLoadingOrders ? (
            // Loading state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-16 rounded-lg border-2 ${
                dark ? "border-neutral-700 bg-neutral-900/30" : "border-slate-300 bg-slate-100"
              }`}>
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-fastfood-red/30 border-t-fastfood-red rounded-full" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("loading")}</h2>
              <p className={`${dark ? "text-neutral-400" : "text-slate-600"}`}>
                {t("waitingSync")}
              </p>
            </motion.div>
          ) : userOrders.length === 0 ? (
            // No orders message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-16 rounded-lg border-2 border-dashed ${
                dark ? "border-neutral-700 bg-neutral-900/30" : "border-slate-300 bg-slate-100"
              }`}>
              <div className="text-5xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">{t("cartEmpty")}</h2>
              <p className={`mb-6 ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                {t("startShopping")}
              </p>
              <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-fastfood-red/50 transition">
              {t("menu")}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Orders Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-lg border ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-slate-200"}`}>
                <p className="text-sm text-fastfood-orange font-semibold mb-2">{t("orders")}</p>
                <p className="text-3xl font-bold">{userOrders.length}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-4 rounded-lg border ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-slate-200"}`}>
                <p className="text-sm text-fastfood-orange font-semibold mb-2">{t("totalSpent")}</p>
                <p className="text-3xl font-bold">Lei {userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-4 rounded-lg border ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-slate-200"}`}>
                <p className="text-sm text-fastfood-orange font-semibold mb-2">{t("ordersWaiting")}</p>
                <p className="text-3xl font-bold">
                  {userOrders.filter((o) => o.status !== "completed").length}
                </p>
              </motion.div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {userOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className={`rounded-lg border overflow-hidden ${
                    dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-slate-200"
                  }`}>
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className={`w-full p-4 flex items-center justify-between hover:bg-opacity-70 transition ${
                      dark ? "hover:bg-neutral-800" : "hover:bg-slate-50"
                    }`}>
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-lg border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-lg">{t("ordersPlaced")} #{order.id}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className={`text-sm ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                          {new Date(order.timestamp).toLocaleDateString("ro-RO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-fastfood-orange font-bold">Lei {order.total.toFixed(2)}</p>
                      <p className={`text-xs ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                        {order.items.length} produs{order.items.length !== 1 ? "e" : ""}
                      </p>
                    </div>
                    {expandedOrder === order.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {/* Order Details */}
                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto", transitionEnd: { overflow: "visible" } }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: "hidden" }}
                        transition={{ type: "spring", stiffness: 300, damping: 32 }}
                        className={`border-t p-4 space-y-4 ${dark ? "border-neutral-800 bg-neutral-800/30" : "border-slate-200 bg-slate-50"}`}>
                        
                        {/* Items */}
                        <div>
                          <p className="text-sm font-semibold text-fastfood-orange mb-3">{t("productsOrdered")}</p>
                          <div className="space-y-2">
                            {order.items.map((item, itemIdx) => (
                              <div key={itemIdx}>
                                <div className="flex items-center justify-between">
                                  <span className={dark ? "text-slate-300" : "text-slate-700"}>
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                                      x{item.qty}
                                    </span>
                                    <span className="text-fastfood-orange font-semibold">
                                      Lei {(item.price * item.qty).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                                {item.customizations && Object.keys(item.customizations).length > 0 && (
                                  <div className="ml-4 mt-1 text-xs space-y-0.5">
                                    {Object.entries(item.customizations).map(([key, value]) => {
                                      if (!value) return null;
                                      const isRemove = key.startsWith("remove-");
                                      const label = key.replace(/^(remove|add)-/, "");
                                      return (
                                        <div key={key} className={dark ? "text-neutral-500" : "text-slate-600"}>
                                          {isRemove ? "-" : "+"} {label}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Info */}
                        {order.customer && (
                        <div className={`p-3 rounded-lg border ${dark ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200"}`}>
                          <p className="text-sm font-semibold text-blue-400 mb-2">{t("deliveryInfo")}</p>
                          <div className="space-y-1 text-sm">
                            <p className={dark ? "text-slate-300" : "text-slate-700"}>
                              <span className="font-semibold">{t("customerName")}</span> {order.customer?.name || "-"}
                            </p>
                            <p className={dark ? "text-slate-300" : "text-slate-700"}>
                              <span className="font-semibold">{t("customerEmail")}</span> {order.customer?.email || "-"}
                            </p>
                            <p className={dark ? "text-slate-300" : "text-slate-700"}>
                              <span className="font-semibold">{t("customerPhone")}</span> {order.customer?.phone || "-"}
                            </p>
                            <p className={dark ? "text-slate-300" : "text-slate-700"}>
                              <span className="font-semibold">{t("customerAddress")}</span> {order.customer?.address || "-"}
                            </p>
                            <p className={`text-sm font-semibold mt-2 ${
                              order.deliveryOption === "pickup" ? "text-green-400" : 
                              order.deliveryOption === "other" ? "text-blue-400" : 
                              "text-purple-400"
                            }`}>
                              <span className="font-semibold">
                                {order.deliveryOption === "pickup" ? t("pickupDelivery") : 
                                 order.deliveryOption === "other" ? t("otherDelivery") : 
                                 t("homeDelivery")}
                              </span>
                            </p>
                          </div>
                        </div>
                        )}

                        {/* Status Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedOrderForStatus(order)}
                          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-semibold hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-200">
                          {t("viewStatus")}
                        </motion.button>

                        {/* Totals */}
                        <div className="space-y-2 border-t pt-3">
                          <div className="flex justify-between">
                            <span className={dark ? "text-neutral-400" : "text-slate-600"}>{t("subtotal")}:</span>
                            <span>Lei {(order.subtotal || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={dark ? "text-neutral-400" : "text-slate-600"}>{t("shipping")}:</span>
                            <span>{(order.delivery || 0) === 0 ? t("freeShipping") : `Lei ${(order.delivery || 0).toFixed(2)}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={dark ? "text-neutral-400" : "text-slate-600"}>{t("tax")}:</span>
                            <span>Lei {(order.tax || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>{t("total")}:</span>
                            <span className="text-fastfood-orange">Lei {(order.total || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        </div>
        </div>
      </motion.div>

      {/* Order Status Modal */}
      {selectedOrderForStatus && (
        <OrderStatus
          dark={dark}
          orderPlaced={selectedOrderForStatus}
          onClose={() => setSelectedOrderForStatus(null)}
        />
      )}
    </>
  );
}



