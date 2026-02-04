/**
 * Tailwind Style Constants
 * Consolidate repeated className patterns to reduce code duplication
 * and make styling consistent across the app
 */

export const btnStyles = {
  primary: 'px-6 py-3 bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-bold rounded-lg hover:shadow-lg hover:shadow-fastfood-red/50 transition-all duration-200',
  primaryReverse: 'px-6 py-3 bg-gradient-to-r from-fastfood-orange to-fastfood-red text-white font-bold rounded-lg hover:shadow-lg hover:shadow-fastfood-orange/50 transition-all duration-200',
  
  secondary: (dark) => `px-6 py-3 border font-semibold rounded-lg transition-all duration-200 ${dark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`,
  
  small: 'px-4 py-2 bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white rounded-lg font-bold hover:shadow-lg hover:shadow-fastfood-red/50 transition',
  
  full: 'w-full py-3 rounded-lg bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white font-semibold hover:shadow-lg hover:shadow-fastfood-red/50 transition disabled:opacity-50',
  
  icon: (color = 'red') => {
    const colorMap = {
      red: 'from-fastfood-red to-fastfood-orange hover:shadow-fastfood-red/50',
      orange: 'from-fastfood-orange to-fastfood-yellow hover:shadow-fastfood-orange/50',
      blue: 'from-fastfood-blue to-fastfood-purple hover:shadow-fastfood-blue/50'
    };
    return `p-2 rounded-lg bg-gradient-to-r ${colorMap[color]} text-white transition`;
  }
};

export const cardStyles = {
  base: (dark) => `rounded-lg border p-6 ${dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`,
  
  headerBorder: (dark) => `border-b ${dark ? 'border-neutral-800 bg-neutral-800/50' : 'border-slate-200 bg-slate-50'}`,
  
  gridCard: (dark) => `p-4 rounded-lg border ${dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`,
};

export const textStyles = {
  secondary: (dark) => `${dark ? 'text-neutral-400' : 'text-gray-600'}`,
  
  tertiary: (dark) => `${dark ? 'text-neutral-300' : 'text-gray-700'}`,
  
  info: (dark) => `p-3 rounded-lg text-xs ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-slate-100 text-slate-600'}`,
};

export const gradients = {
  textGradient: 'bg-gradient-to-r from-fastfood-red to-fastfood-orange bg-clip-text text-transparent',
  textGradientRGB: 'bg-gradient-to-r from-fastfood-red via-fastfood-orange to-fastfood-yellow bg-clip-text text-transparent',
  
  bgGradientRed: 'bg-gradient-to-r from-fastfood-red/10 via-fastfood-orange/10 to-fastfood-yellow/10',
  bgGradientRedLight: 'bg-gradient-to-r from-fastfood-red/5 via-fastfood-orange/5 to-fastfood-yellow/5',
  
  boxRedDark: (dark) => `bg-gradient-to-br ${dark ? 'from-neutral-900/50 to-neutral-800/50 border-fastfood-orange/30' : 'from-white/50 to-gray-50/50 border-gray-300'}`,
};

export const badgeStyles = {
  badge: 'flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-fastfood-red to-fastfood-orange text-white text-xs font-bold',
  
  infoBox: (dark) => `p-4 ${dark ? 'bg-gradient-to-r from-fastfood-blue/20 to-fastfood-purple/20 border-b border-fastfood-blue/30' : 'border-b'}`,
};

export const overlayStyles = {
  backdrop: 'fixed inset-0 bg-black/60 z-[9980] backdrop-blur-sm',
  
  container: (dark) => `fixed inset-0 z-[9981] overflow-y-auto ${dark ? 'dark bg-gradient-to-b from-[#0b0b0b] to-[#111827]' : 'bg-gradient-to-b from-white to-slate-50'}`,
};

export const iconStyles = {
  rounded: 'w-12 h-12 rounded-xl bg-gradient-to-br from-fastfood-red to-fastfood-orange flex items-center justify-center shadow-lg shadow-fastfood-red/50',
  
  social: (gradientColors) => `w-10 h-10 rounded-lg bg-gradient-to-br ${gradientColors} flex items-center justify-center text-white hover:shadow-lg transition`,
};

export const headerStyles = {
  header: (dark) => `max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b ${dark ? 'border-neutral-800' : 'border-slate-200'}`,
};
