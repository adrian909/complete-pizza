const BACKEND_URL = "https://backend.trifadrian.ro";

let isIntercepted = false;

/**
 * Initialize fetch interception for CORS handling
 */
export const initFetchInterceptor = () => {
  if (isIntercepted) return;
  isIntercepted = true;

  const originalFetch = window.fetch;

  window.fetch = async function (...args) {
    const [resource, config] = args;
    let url = resource;

    if (resource instanceof Request) {
      url = resource.url;
    }

    if (typeof url === "string" && url.startsWith("/api")) {
      url = BACKEND_URL + url;
    }

    try {
      const response = await originalFetch.call(this, url, config);

      if (response.status === 0 || !response.ok) {
        console.warn(
          `API call to ${url} failed with status ${response.status}, trying alternative...`
        );
        return await tryAlternative(url, config);
      }

      return response;
    } catch (error) {
      if (
        error.message.includes("CORS") ||
        error.message.includes("Network")
      ) {
        console.warn(`CORS error on ${url}, trying alternative...`);
        return await tryAlternative(url, config);
      }
      throw error;
    }
  };
};

async function tryAlternative(url, config) {
  try {
    const response = await window.fetch(url, {
      ...config,
      mode: "no-cors",
    });
    if (response.ok || response.status !== 0) {
      return response;
    }
  } catch (e) {
    console.warn("no-cors mode failed");
  }

  const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
  try {
    const response = await window.fetch(corsProxyUrl, {
      ...config,
      headers: {
        ...config?.headers,
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return response;
  } catch (e) {
    console.error("All CORS bypass methods failed", e);
    throw new Error(
      `Failed to reach ${url}. Backend server may be unreachable.`
    );
  }
}
