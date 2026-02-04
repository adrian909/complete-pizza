/**
 * Form Utilities
 * Consolidate form handling logic used across components
 */

/**
 * Create a generic form input handler
 * @param {Function} setFormData - State setter for form data
 * @returns {Function} Handler function
 */
export function createFormInputHandler(setFormData) {
  return (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic Romanian phone validation)
 * @param {string} phone - Phone to validate
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+40|0)?[7-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate required fields
 * @param {Object} data - Form data
 * @param {Array<string>} requiredFields - Field names that are required
 * @returns {Object|null} Errors object or null if valid
 */
export function validateRequiredFields(data, requiredFields) {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = `${field} este obligatoriu`;
    }
  });
  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Clear form errors by field
 * @param {Object} errors - Current errors object
 * @param {string} fieldName - Field to clear
 * @returns {Object} Updated errors object
 */
export function clearFieldError(errors, fieldName) {
  const updated = { ...errors };
  delete updated[fieldName];
  return updated;
}

/**
 * Set field error
 * @param {Object} errors - Current errors object
 * @param {string} fieldName - Field name
 * @param {string} message - Error message
 * @returns {Object} Updated errors object
 */
export function setFieldError(errors, fieldName, message) {
  return {
    ...errors,
    [fieldName]: message
  };
}
