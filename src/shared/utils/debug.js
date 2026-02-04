const ENABLE_DEBUG = false;

export const debug = {
  log: (...args) => {
    if (ENABLE_DEBUG) console.log(...args);
  },
  error: (...args) => {
    if (ENABLE_DEBUG) console.error(...args);
  },
  warn: (...args) => {
    if (ENABLE_DEBUG) console.warn(...args);
  },
};
