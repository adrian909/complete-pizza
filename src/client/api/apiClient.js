const BACKEND_URL = "https://backend.trifadrian.ro";

/**
 * Fetch helper
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${BACKEND_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return response;
};

/**
 * GET request
 */
export const apiGet = async (endpoint) => {
  const response = await apiCall(endpoint, { method: "GET" });
  if (!response.ok) {
    throw new Error(`API GET failed: ${response.statusText}`);
  }
  return response.json();
};

/**
 * POST request
 */
export const apiPost = async (endpoint, data) => {
  const response = await apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API POST failed: ${response.statusText}`);
  }
  return response.json();
};

/**
 * PUT request
 */
export const apiPut = async (endpoint, data) => {
  const response = await apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API PUT failed: ${response.statusText}`);
  }
  return response.json();
};

/**
 * DELETE request
 */
export const apiDelete = async (endpoint) => {
  const response = await apiCall(endpoint, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`API DELETE failed: ${response.statusText}`);
  }
  return response.json();
};
