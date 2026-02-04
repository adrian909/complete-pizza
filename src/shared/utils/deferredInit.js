/**
 * Deferred Initialization Module
 * 
 * Delays non-critical initialization until after the first meaningful paint.
 * Reduces initial script evaluation time and improves core web vitals.
 * 
 * Strategy:
 * 1. Schedule heavy operations using requestIdleCallback (with setTimeout fallback)
 * 2. Use Promise-based API for lazy initialization
 * 3. Return null/placeholder data on first paint, resolve later
 */

import { createPerformanceTracker } from './performance.js';

/**
 * Schedule a function to run during browser idle time
 * Falls back to setTimeout if requestIdleCallback is not supported
 */
export function scheduleIdleTask(callback, timeout = 2000) {
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        callback();
        resolve();
      }, { timeout });
    } else {
      setTimeout(() => {
        callback();
        resolve();
      }, timeout);
    }
  });
}

/**
 * Lazy initialize a system after first paint
 * Returns a deferred promise that resolves when the system is ready
 */
export function createDeferredInit(initFn) {
  let isInitialized = false;
  let initPromise = null;

  return {
    /**
     * Schedule initialization during idle time
     */
    scheduleInit(timeout = 2000) {
      if (!initPromise && !isInitialized) {
        initPromise = scheduleIdleTask(() => {
          initFn();
          isInitialized = true;
        }, timeout);
      }
      return initPromise;
    },

    /**
     * Get initialization status
     */
    isReady() {
      return isInitialized;
    },

    /**
     * Wait for initialization to complete
     */
    async waitForInit() {
      if (isInitialized) return true;
      await this.scheduleInit();
      return true;
    }
  };
}

/**
 * Batch multiple deferred initializations
 * Useful for coordinating multiple lazy-loaded systems
 */
export function createDeferredInitBatch(initializers) {
  return {
    scheduleAll(timeout = 2000) {
      return Promise.all(
        initializers.map((init) => init.scheduleInit(timeout))
      );
    },

    async waitForAll() {
      return Promise.all(
        initializers.map((init) => init.waitForInit())
      );
    },

    statusAll() {
      return initializers.map((init) => init.isReady());
    }
  };
}

/**
 * Defer a module import until needed
 * Returns a function that lazy-loads the module
 */
export function deferredImport(importFn) {
  let module = null;
  let importPromise = null;

  return async () => {
    if (module) return module;
    if (!importPromise) {
      importPromise = scheduleIdleTask(() => {
        return importFn().then((mod) => {
          module = mod;
          return mod;
        });
      });
    }
    return importPromise;
  };
}
