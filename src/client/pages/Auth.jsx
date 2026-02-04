import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debug } from "../../shared/utils/debug";
import { useLanguage } from "../hooks/useLanguage";
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { apiGet, apiPost } from "../api/apiClient";

export default function Auth({ dark, onLoginSuccess, onBackClick }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = t("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) newErrors.email = t("invalidEmail");
    if (!loginData.password) newErrors.password = t("passwordRequired");
    else if (loginData.password.length < 6) newErrors.password = t("passwordMinLength");
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name.trim()) newErrors.name = t("nameRequired");
    if (!signupData.email) newErrors.email = t("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) newErrors.email = t("invalidEmail");
    if (!signupData.password) newErrors.password = t("passwordRequired");
    else if (signupData.password.length < 6) newErrors.password = t("passwordMinLength");
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = t("passwordsMismatch");
    return newErrors;
  };

  const handleLogin = async () => {
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await apiGet("/api/users");
      
      const documents = data.documents || [];
      
      const userDoc = documents.find(doc => 
        doc.fields?.email?.stringValue === loginData.email
      );
      console.log("Found user doc:", userDoc);
      
      if (userDoc) {
        const userToStore = {
          id: userDoc.name.split('/').pop(),
          name: userDoc.fields.name?.stringValue || "",
          email: userDoc.fields.email?.stringValue || "",
          phone: userDoc.fields.phone?.stringValue || "",
          address: userDoc.fields.address?.stringValue || "",
          role: userDoc.fields.role?.stringValue || "user"
        };
        localStorage.setItem("currentUser", JSON.stringify(userToStore));
        onLoginSuccess(userToStore);
        setLoginData({ email: "", password: "" });
      } else {
        setErrors({ auth: t("loginError") });
      }
    } catch (error) {
      setErrors({ auth: t("loginError") });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const newErrors = validateSignup();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const responseData = await apiPost("/api/users", {
        name: signupData.name,
        email: signupData.email,
        role: "user",
        phone: "",
        address: ""
      });

      const userId = responseData.name?.split('/').pop() || "new-user";
      
      const userToStore = { 
        id: userId, 
        name: signupData.name, 
        email: signupData.email, 
        phone: "",
        address: "",
        role: "user"
      };
      localStorage.setItem("currentUser", JSON.stringify(userToStore));
      onLoginSuccess(userToStore);
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setErrors({ auth: t("signupError") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-20 antialiased relative overflow-hidden flex items-center justify-center px-4 ${
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

      {/* Form Container */}
      <div className="relative z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${dark ? "bg-neutral-900" : "bg-white"}`}>
        {/* Header */}
        <div className={`p-6 text-center border-b ${dark ? "border-neutral-800 bg-neutral-800/50" : "border-slate-200 bg-slate-50"}`}>
          <h1 className="text-3xl font-extrabold mb-2">
            FANCY<span className="text-fastfood-orange">TRUCK</span>
          </h1>
          <p className={`text-sm ${dark ? "text-neutral-400" : "text-slate-600"}`}>{t("authTitle")}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-700">
          <button
            onClick={() => {
              setTab("login");
              setErrors({});
            }}
            className={`flex-1 py-4 font-semibold transition flex items-center justify-center gap-2 ${
              tab === "login"
                ? "border-b-2 border-fastfood-red text-fastfood-red"
                : `${dark ? "text-neutral-400 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"}`
            }`}>
            <LogIn size={18} /> {t("loginTab")}
          </button>
          <button
            onClick={() => {
              setTab("signup");
              setErrors({});
            }}
            className={`flex-1 py-4 font-semibold transition flex items-center justify-center gap-2 ${
              tab === "signup"
                ? "border-b-2 border-fastfood-red text-fastfood-red"
                : `${dark ? "text-neutral-400 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"}`
            }`}>
            <UserPlus size={18} /> {t("signupTab")}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* LOGIN TAB */}
            {tab === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4">
                {/* Auth Error */}
                {errors.auth && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm">
                    {errors.auth}
                  </motion.div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      errors.email
                        ? "border-red-500 bg-red-500/10"
                        : dark
                          ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                          : "border-slate-300 bg-white focus:border-amber-400"
                    } focus:outline-none`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lock size={16} /> {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        errors.password
                          ? "border-red-500 bg-red-500/10"
                          : dark
                            ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                            : "border-slate-300 bg-white focus:border-amber-400"
                      } focus:outline-none pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-3 ${dark ? "text-neutral-400 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"}`}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Login Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-semibold hover:shadow-lg hover:shadow-fastfood-red/50 transition disabled:opacity-50 mt-6">
                  {loading ? t("loginLoading") : t("loginButton")}
                </motion.button>

                {/* Demo Credentials */}
                <div className={`p-3 rounded-lg text-xs ${dark ? "bg-neutral-800 text-neutral-400" : "bg-slate-100 text-slate-600"}`}>
                  <p className="font-semibold mb-1">{t("demoCredentials")}</p>
                  <p>{t("demoEmail")}</p>
                  <p>{t("demoPassword")}</p>
                </div>
              </motion.div>
            )}

            {/* SIGNUP TAB */}
            {tab === "signup" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <User size={16} /> {t("fullName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      errors.name
                        ? "border-red-500 bg-red-500/10"
                        : dark
                          ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                          : "border-slate-300 bg-white focus:border-amber-400"
                    } focus:outline-none`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      errors.email
                        ? "border-red-500 bg-red-500/10"
                        : dark
                          ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                          : "border-slate-300 bg-white focus:border-amber-400"
                    } focus:outline-none`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lock size={16} /> Parolă
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className={`w-full px-4 py-3 rounded-lg border transition ${
                        errors.password
                          ? "border-red-500 bg-red-500/10"
                          : dark
                            ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                            : "border-slate-300 bg-white focus:border-amber-400"
                      } focus:outline-none pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-3 ${dark ? "text-neutral-400 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"}`}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lock size={16} /> {t("confirmPassword")}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-500/10"
                        : dark
                          ? "border-neutral-700 bg-neutral-800 focus:border-amber-400"
                          : "border-slate-300 bg-white focus:border-amber-400"
                    } focus:outline-none`}
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Signup Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-semibold hover:shadow-lg hover:shadow-fastfood-red/50 transition disabled:opacity-50 mt-6">
                  {loading ? t("signupLoading") : t("signupButton")}
                </motion.button>

                <p className={`text-xs text-center ${dark ? "text-neutral-400" : "text-slate-600"}`}>
                  {t("createAccountMessage")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        <div className={`p-4 border-t ${dark ? "border-neutral-800 bg-neutral-800/30" : "border-slate-200 bg-slate-50"}`}>
          <button
            onClick={onBackClick}
            className={`w-full py-2 rounded-lg transition ${
              dark ? "hover:bg-neutral-800 text-neutral-400" : "hover:bg-slate-200 text-slate-600"
            }`}>
            ← {t("backToSite")}
          </button>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}




