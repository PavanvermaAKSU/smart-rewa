/**
 * JanSetu AI - Validation & Security Sanitization Utilities
 */

window.JanSetuValidation = {
  /**
   * Escape HTML to prevent XSS injection in user-rendered strings
   */
  escapeHtml: function (str) {
    if (str === null || str === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  },

  /**
   * Validate complaint description
   */
  validateDescription: function (text) {
    if (!text || typeof text !== 'string') {
      return { valid: false, error: 'कृपया समस्या का विवरण दर्ज करें। (Please enter description)' };
    }
    const trimmed = text.trim();
    if (trimmed.length < 10) {
      return { valid: false, error: 'विवरण कम से कम 10 अक्षरों का होना चाहिए। (Must be at least 10 characters)' };
    }
    if (trimmed.length > 2000) {
      return { valid: false, error: 'विवरण 2000 अक्षरों से अधिक नहीं हो सकता। (Cannot exceed 2000 characters)' };
    }
    return { valid: true };
  },

  /**
   * Validate locality selection
   */
  validateLocality: function (locality) {
    if (!locality || !locality.trim()) {
      return { valid: false, error: 'कृपया रीवा में संबंधित मोहल्ला/इलाका चुनें। (Please select locality)' };
    }
    return { valid: true };
  },

  /**
   * Validate image upload
   */
  validateImageFile: function (file) {
    if (!file) return { valid: true }; // optional
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'केवल JPG, PNG या WebP फोटो स्वीकार्य हैं। (Only JPG/PNG supported)' };
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      return { valid: false, error: 'फोटो का आकार 5MB से कम होना चाहिए। (File size must be under 5MB)' };
    }
    return { valid: true };
  },

  /**
   * Format ISO date string into readable date & time
   */
  formatDateTime: function (isoString) {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('hi-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  },

  /**
   * Validate Tracking ID format
   */
  validateTrackingId: function (id) {
    if (!id || typeof id !== 'string') return false;
    return /^JS-[A-Z0-9-]+$/i.test(id.trim());
  }
};
