/**
 * Centralized scroll lock management
 * Prevents forced reflows by batching DOM writes and using a reference counter
 * Multiple components can request scroll lock without conflicts
 */

import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';

export const createScrollLock = () => {
  return {
    lock() {
      if (lockCount === 0) {
        // Store original overflow value only on first lock
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      lockCount++;
    },
    
    unlock() {
      lockCount--;
      if (lockCount <= 0) {
        // Restore original overflow value when all locks are released
        document.body.style.overflow = originalOverflow || 'unset';
        lockCount = 0;
      }
    },
    
    isLocked() {
      return lockCount > 0;
    },
  };
};

// Singleton instance
const scrollLock = createScrollLock();

export default scrollLock;

/**
 * React hook for scroll lock management
 * Usage: useScrollLock(shouldLock)
 */
export const useScrollLock = (shouldLock = true) => {
  useEffect(() => {
    if (shouldLock) {
      scrollLock.lock();
      return () => scrollLock.unlock();
    }
  }, [shouldLock]);
};
