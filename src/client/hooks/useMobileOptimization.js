import { useEffect, useState } from "react";

/**
 * Hook to detect mobile device and return optimization settings
 * Reduces animation complexity and bundle size on mobile devices
 */
export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [animationDisabled, setAnimationDisabled] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      // User Agent detection
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Screen size detection
      const isMobileScreen = window.innerWidth < 768;
      
      // Prefers reduced motion detection (accessibility)
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      const mobile = isMobileDevice || isMobileScreen;
      setIsMobile(mobile);
      setAnimationDisabled(prefersReducedMotion || mobile);
      
      return mobile;
    };

    checkMobile();

    // Listen for window resize
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
    animationDisabled,
    // Return optimized animation config
    getAnimationConfig: (fullConfig) => {
      if (animationDisabled) {
        return {
          ...fullConfig,
          transition: {
            ...fullConfig.transition,
            duration: 0.1, // Near instant
          },
        };
      }
      return fullConfig;
    },
  };
}
