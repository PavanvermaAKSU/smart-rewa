/**
 * JanSetu AI - Shared Navigation & UI Shell Utilities
 * Coordinates Role Switcher, Mobile Nav, Demo Banners, and Toast System
 */

window.JanSetuNav = {
  init: function () {
    this.setupRoleSwitcher();
    this.setupMobileMenu();
    this.setupResetButtons();
    this.setupLanguageButtons();
    this.highlightActiveNavLink();
  },

  /**
   * Mark active page nav link
   */
  highlightActiveNavLink: function () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .sidebar-link, .role-chip').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  },

  /**
   * Set up mobile hamburger toggle
   */
  setupMobileMenu: function () {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (toggleBtn && mainNav) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
      });
    }
  },

  /**
   * Setup demo role switcher
   */
  setupRoleSwitcher: function () {
    document.querySelectorAll('[data-role-switch]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetRole = btn.getAttribute('data-role-switch');
        if (window.JanSetuStorage) {
          window.JanSetuStorage.setRole(targetRole);
        }
      });
    });
  },

  /**
   * Setup data reset handlers
   */
  setupResetButtons: function () {
    document.querySelectorAll('.demo-reset-btn, [data-action="reset-data"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const confirmMsg = window.JanSetuI18n 
          ? window.JanSetuI18n.t('resetConfirm') 
          : 'Are you sure you want to reset all demo complaint records to sample initial state?';
        
        if (window.confirm(confirmMsg)) {
          window.JanSetuStorage.resetDemoData(true);
          const successMsg = window.JanSetuI18n 
            ? window.JanSetuI18n.t('resetSuccess') 
            : 'Demonstration dataset reset successfully.';
          this.showToast(successMsg, 'success');
          
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      });
    });
  },

  /**
   * Setup language switcher buttons
   */
  setupLanguageButtons: function () {
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.JanSetuI18n) {
          window.JanSetuI18n.toggleLanguage();
        }
      });
    });
  },

  /**
   * Show a non-blocking toast notification
   */
  showToast: function (message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
      <div style="flex-shrink:0;">${iconSvg}</div>
      <div style="flex:1; font-weight:500;">${window.JanSetuValidation ? window.JanSetuValidation.escapeHtml(message) : message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  JanSetuNav.init();
});
