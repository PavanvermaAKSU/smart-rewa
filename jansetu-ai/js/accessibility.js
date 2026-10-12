/**
 * JanSetu AI - Accessibility Utilities
 * Keyboard navigation, Focus trap, Screen reader live announcements
 */

window.JanSetuA11y = {
  activeModal: null,
  previousActiveElement: null,

  init: function () {
    this.setupModalEscape();
    this.createLiveRegion();
  },

  createLiveRegion: function () {
    if (!document.getElementById('a11y-live-region')) {
      const region = document.createElement('div');
      region.id = 'a11y-live-region';
      region.className = 'visually-hidden';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      document.body.appendChild(region);
    }
  },

  announce: function (message) {
    const region = document.getElementById('a11y-live-region');
    if (region) {
      region.textContent = message;
    }
  },

  openModal: function (modalElement) {
    if (!modalElement) return;
    this.previousActiveElement = document.activeElement;
    this.activeModal = modalElement;
    modalElement.classList.add('open');
    modalElement.setAttribute('aria-hidden', 'false');

    // Focus first focusable element
    const focusable = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  },

  closeModal: function (modalElement) {
    const modal = modalElement || this.activeModal;
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    this.activeModal = null;

    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      this.previousActiveElement.focus();
    }
  },

  setupModalEscape: function () {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal(e.target);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  JanSetuA11y.init();
});
