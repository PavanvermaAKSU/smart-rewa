/**
 * JanSetu AI - LocalStorage Persistence Service
 * Safe browser-local persistence with cross-tab sync & validation
 */

const STORAGE_KEYS = {
  COMPLAINTS: 'jansetu_demo_complaints',
  SETTINGS: 'jansetu_demo_settings',
  DRAFTS: 'jansetu_demo_drafts'
};

window.JanSetuStorage = {
  /**
   * Initialize local storage if not already seeded
   */
  init: function () {
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      if (!existing || existing === '[]') {
        this.resetDemoData(false);
      }
      
      const settings = this.getSettings();
      if (!settings.lang) {
        this.saveSettings({ lang: 'hi', role: 'citizen' });
      }
    } catch (err) {
      console.warn('JanSetuStorage: LocalStorage not available or restricted:', err);
    }

    // Cross-tab synchronization
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEYS.COMPLAINTS) {
        window.dispatchEvent(new CustomEvent('jansetu:data-updated', {
          detail: { source: 'cross-tab' }
        }));
      }
      if (event.key === STORAGE_KEYS.SETTINGS) {
        window.dispatchEvent(new CustomEvent('jansetu:settings-updated', {
          detail: { source: 'cross-tab' }
        }));
      }
    });
  },

  /**
   * Get all demonstration complaints
   */
  getComplaints: function () {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read demo complaints from storage:', e);
    }
    return (window.JANSETU_DATA && window.JANSETU_DATA.seedComplaints) ? [...window.JANSETU_DATA.seedComplaints] : [];
  },

  /**
   * Get a single complaint by ID
   */
  getComplaintById: function (id) {
    if (!id) return null;
    const complaints = this.getComplaints();
    const cleanId = String(id).trim().toUpperCase();
    return complaints.find(c => String(c.id).toUpperCase() === cleanId) || null;
  },

  /**
   * Save a single complaint (creates new or updates existing)
   */
  saveComplaint: function (complaint) {
    try {
      if (!complaint || !complaint.id) throw new Error('Invalid complaint object');
      const complaints = this.getComplaints();
      const index = complaints.findIndex(c => c.id === complaint.id);
      
      complaint.updatedAt = new Date().toISOString();

      if (index >= 0) {
        complaints[index] = { ...complaints[index], ...complaint };
      } else {
        complaints.unshift(complaint);
      }

      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
      window.dispatchEvent(new CustomEvent('jansetu:data-updated', {
        detail: { complaintId: complaint.id }
      }));
      return true;
    } catch (err) {
      console.error('JanSetuStorage: Failed to persist complaint:', err);
      return false;
    }
  },

  /**
   * Reset demonstration dataset back to pristine seed records
   */
  resetDemoData: function (notify = true) {
    try {
      const seed = (window.JANSETU_DATA && window.JANSETU_DATA.seedComplaints) 
        ? JSON.parse(JSON.stringify(window.JANSETU_DATA.seedComplaints)) 
        : [];
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(seed));
      if (notify) {
        window.dispatchEvent(new CustomEvent('jansetu:data-updated', { detail: { action: 'reset' } }));
      }
      return true;
    } catch (err) {
      console.error('Failed to reset demo data:', err);
      return false;
    }
  },

  /**
   * Settings management (Language, Current demo role)
   */
  getSettings: function () {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { lang: 'hi', role: 'citizen' };
  },

  saveSettings: function (newSettings) {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('jansetu:settings-updated', { detail: updated }));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  getLanguage: function () {
    return this.getSettings().lang || 'hi';
  },

  setLanguage: function (lang) {
    this.saveSettings({ lang: lang });
  },

  getRole: function () {
    return this.getSettings().role || 'citizen';
  },

  setRole: function (role) {
    this.saveSettings({ role: role });
  },

  /**
   * Complaint Drafts for guided submission
   */
  getDraft: function () {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  },

  saveDraft: function (draft) {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(draft));
    } catch (e) {}
  },

  clearDraft: function () {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFTS);
    } catch (e) {}
  }
};

// Auto-run init
JanSetuStorage.init();
