/**
 * Validation Utilities
 * Input validation helper functions
 */

export const validators = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
  isValidPassword: (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  },

  // Phone number validation
  isValidPhone: (phone) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
  },

  // URL validation
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Check if value is empty
  isEmpty: (value) => {
    return !value || (typeof value === 'string' && value.trim() === '');
  },

  // Validate form object
  validateForm: (data, rules) => {
    const errors = {};
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];

      if (rule.required && validators.isEmpty(value)) {
        errors[field] = `${field} is required`;
      } else if (rule.email && value && !validators.isValidEmail(value)) {
        errors[field] = 'Invalid email format';
      } else if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = `${field} must be at least ${rule.minLength} characters`;
      } else if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        errors[field] = `Invalid ${field} format`;
      }
    });
    return errors;
  },
};

export default validators;
