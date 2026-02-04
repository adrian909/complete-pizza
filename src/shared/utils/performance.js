/**
 * Performance Tracking Utilities
 * 
 * Unified module for performance measurements, marks, and analysis
 * Used by deferredInit and firebaseDeferred for performance tracking
 */

/**
 * Create a performance tracker for measuring operations
 * Useful for debugging initialization and performance analysis
 * 
 * @param {string} name - Name of the operation being tracked
 * @returns {Object} Tracker with mark() and end() methods
 */
export function createPerformanceTracker(name) {
  const startTime = performance.now();

  return {
    mark(label) {
      const elapsed = performance.now() - startTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${name}] ${label}: ${elapsed.toFixed(2)}ms`);
      }
    },

    end() {
      const elapsed = performance.now() - startTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${name}] Total: ${elapsed.toFixed(2)}ms`);
      }
      return elapsed;
    }
  };
}

/**
 * Performance marker for measuring main-thread work using browser APIs
 */
export class PerformanceMarker {
  static mark(name) {
    if (performance && performance.mark) {
      performance.mark(name);
      console.log(`⏱️  Marked: ${name}`);
    }
  }

  static measure(name, startMark, endMark) {
    if (performance && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const entries = performance.getEntriesByName(name);
        if (entries.length > 0) {
          const duration = entries[entries.length - 1].duration;
          console.log(`📊 ${name}: ${duration.toFixed(2)}ms`);
          return duration;
        }
      } catch (e) {
        console.warn(`Could not measure ${name}:`, e.message);
      }
    }
  }

  static getMetrics() {
    if (!performance || !performance.getEntriesByType) {
      return null;
    }

    const longTasks = performance.getEntriesByType('longtask') || [];
    const measures = performance.getEntriesByType('measure') || [];

    return {
      longTaskCount: longTasks.length,
      totalLongTaskTime: longTasks.reduce((sum, t) => sum + t.duration, 0),
      measures: measures.map(m => ({
        name: m.name,
        duration: m.duration.toFixed(2)
      }))
    };
  }
}
