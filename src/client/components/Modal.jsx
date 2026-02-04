/**
 * Reusable Modal Components
 * Consolidate common modal patterns used across the app
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal Backdrop - semi-transparent overlay that closes on click
 */
export function ModalBackdrop({ onClick, zIndex = 'z-[9980]' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={`fixed inset-0 bg-black/60 ${zIndex} backdrop-blur-sm`}
    />
  );
}

/**
 * Modal Container - full-screen modal with animation
 */
export function ModalContainer({ 
  isOpen, 
  children, 
  onBackdropClick, 
  dark, 
  zIndex = 'z-[9981]',
  className = '' 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalBackdrop onClick={onBackdropClick} zIndex={zIndex} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 ${zIndex} overflow-y-auto ${
              dark
                ? 'dark bg-gradient-to-b from-[#0b0b0b] to-[#111827]'
                : 'bg-gradient-to-b from-white to-slate-50'
            } ${className}`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Modal Header - with close button and border
 */
export function ModalHeader({ 
  title, 
  subtitle, 
  onClose, 
  dark, 
  showCloseButton = true 
}) {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b ${
      dark ? 'border-neutral-800' : 'border-slate-200'
    }`}>
      <div>
        <h1 className="text-3xl font-black">{title}</h1>
        {subtitle && <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
      </div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition ${
            dark ? 'hover:bg-neutral-800' : 'hover:bg-gray-200'
          }`}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/**
 * Modal Content - scrollable content area
 */
export function ModalContent({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-6 ${className}`}>
      {children}
    </div>
  );
}
