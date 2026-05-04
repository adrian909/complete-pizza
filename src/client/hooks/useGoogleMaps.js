import { useState, useEffect } from "react";

// Module-level singleton — script is loaded at most once per page
let _status = "idle"; // "idle" | "loading" | "ready" | "error"
const _queue = [];

function _loadScript(apiKey, libraries) {
  if (!apiKey || _status !== "idle") return;
  _status = "loading";

  window.__googleMapsReady = () => {
    _status = "ready";
    delete window.__googleMapsReady;
    _queue.forEach(fn => fn());
    _queue.length = 0;
  };

  const script = document.createElement("script");
  const libs = libraries.length ? `&libraries=${libraries.join(",")}` : "";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${libs}&callback=__googleMapsReady`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    _status = "error";
    _queue.length = 0;
  };
  document.head.appendChild(script);
}

export function useGoogleMaps(apiKey, libraries = []) {
  const [isLoaded, setIsLoaded] = useState(_status === "ready");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) return; // Don't load until caller provides a real key

    if (_status === "ready") {
      setIsLoaded(true);
      return;
    }

    if (_status === "error") {
      setError(new Error("Failed to load Google Maps"));
      return;
    }

    const cb = () => setIsLoaded(true);
    _queue.push(cb);
    _loadScript(apiKey, libraries);

    return () => {
      const i = _queue.indexOf(cb);
      if (i !== -1) _queue.splice(i, 1);
    };
  // libraries is stable (inline array in callers, but key changes are what matter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  return { isLoaded, error };
}
