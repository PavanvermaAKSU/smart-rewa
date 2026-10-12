/**
 * JanSetu AI - Government Officer Grievance Desk
 * Powers officer.html: Queue management, metric calculations, and status progression
 */

window.JanSetuOfficer = {
  currentFilters: {
    status: 'all',
    category: 'all',
    locality: 'all',
    search: ''
  },
  selectedComplaintId: null,

  init: function () {
    this.populateFilterDropdowns();
    this.bindEvents();
    this.refreshDashboard();

    // Listen for data changes across tabs
    window.addEventListener('jansetu:data-updated', () => {
      this.refreshDashboard();
      if (this.selectedComplaintId) {
        this.openDetailModal(this.selectedComplaintId);
      }
    });

    window.addEventListener('jansetu:lang-changed', () => {
      this.refreshDashboard();
    });
  },

  populateFilterDropdowns: function () {
    const catSelect = document.getElementById('officer-filter-cat');
    const locSelect = document.getElementById('officer-filter-loc');
    const deptSelect = document.getElementById('modal-assign-dept');
    const roleSelect = document.getElementById('modal-assign-role');

    if (catSelect && window.JANSETU_DATA) {
      catSelect.innerHTML = `<option value="all">${window.JanSetuI18n.t('filterCategory')}</option>`;
      window.JANSETU_DATA.categories.forEach(c => {
        const name = window.JanSetuI18n.getLanguage() === 'hi' ? c.nameHi : c.nameEn;
        catSelect.innerHTML += `<option value="${c.id}">${name}</option>`;
      });
    }

    if (locSelect && window.JANSETU_DATA) {
      locSelect.innerHTML = `<option value="all">${window.JanSetuI18n.t('filterLocality')}</option>`;
      window.JANSETU_DATA.rewaLocalities.forEach(loc => {
        locSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
      });
    }

    if (deptSelect && window.JANSETU_DATA) {
      deptSelect.innerHTML = '<option value="">-- Select Department --</option>';
      window.JANSETU_DATA.departments.forEach(dept => {
        deptSelect.innerHTML += `<option value="${dept}">${dept}</option>`;
      });
    }

    if (roleSelect && window.JANSETU_DATA) {
      roleSelect.innerHTML = '<option value="">-- Select Officer Role --</option>';
      window.JANSETU_DATA.officerRoles.forEach(role => {
        roleSelect.innerHTML += `<option value="${role}">${role}</option>`;
      });
    }
  },

  bindEvents: function () {
    const statusSelect = document.getElementById('officer-filter-status');
    const catSelect = document.getElementById('officer-filter-cat');
    const locSelect = document.getElementById('officer-filter-loc');
    const searchInput = document.getElementById('officer-search-input');

    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.currentFilters.status = e.target.value;
        this.renderTable();
      });
    }

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.currentFilters.category = e.target.value;
        this.renderTable();
      });
    }

    if (locSelect) {
      locSelect.addEventListener('change', (e) => {
        this.currentFilters.locality = e.target.value;
        this.renderTable();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilters.search = e.target.value;
        this.renderTable();
      });
    }

    // Modal action form submit
    const actionForm = document.getElementById('officer-action-form');
    if (actionForm) {
      actionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveAction();
      });
    }

    // Modal close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.getElementById('officer-detail-modal');
        if (modal && window.JanSetuA11y) {
          window.JanSetuA11y.closeModal(modal);
        }
      });
    });
  },

  refreshDashboard: function () {
    this.calculateAndRenderMetrics();
    this.renderTable();
  },

  calculateAndRenderMetrics: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'submitted' || c.status === 'review').length;
    const inProgress = complaints.filter(c => c.status === 'assigned' || c.status === 'in-progress').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const overdue = complaints.filter(c => c.priority === 'high' && c.status !== 'resolved').length;

    const totalEl = document.getElementById('stat-officer-total');
    const pendingEl = document.getElementById('stat-officer-pending');
    const inProgressEl = document.getElementById('stat-officer-inprogress');
    const resolvedEl = document.getElementById('stat-officer-resolved');
    const overdueEl = document.getElementById('stat-officer-overdue');

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (inProgressEl) inProgressEl.textContent = inProgress;
    if (resolvedEl) resolvedEl.textContent = resolved;
    if (overdueEl) overdueEl.textContent = overdue;
  },

  renderTable: function () {
    const tbody = document.getElementById('officer-queue-tbody');
    const emptyState = document.getElementById('officer-queue-empty');
    if (!tbody) return;

    const list = window.JanSetuService.filterComplaints(this.currentFilters);
    const t = window.JanSetuI18n.t.bind(window.JanSetuI18n);
    const escape = window.JanSetuValidation.escapeHtml;

    if (list.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    list.forEach(c => {
      const catObj = window.JANSETU_DATA.categories.find(cat => cat.id === c.category);
      const catName = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : c.category;
      const statusLabel = t(`status_${c.status.replace('-', '_')}`);
      const dateStr = window.JanSetuValidation.formatDateTime(c.submittedAt);
      
      const shortDesc = c.description.length > 55 ? `${c.description.substring(0, 55)}...` : c.description;

      html += `
        <tr>
          <td data-label="${t('colId')}">
            <span style="font-family: var(--font-mono); font-weight:700; color: var(--color-primary-navy);">${escape(c.id)}</span>
          </td>
          <td data-label="${t('colCategory')}">
            <span>${escape(catName)}</span>
          </td>
          <td data-label="${t('colDescription')}">
            <span title="${escape(c.description)}">${escape(shortDesc)}</span>
          </td>
          <td data-label="${t('colLocality')}">
            <span>${escape(c.locality)}</span>
          </td>
          <td data-label="${t('colDate')}">
            <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">${dateStr}</span>
          </td>
          <td data-label="${t('colStatus')}">
            <span class="status-indicator status-${c.status}">${statusLabel}</span>
          </td>
          <td data-label="${t('colPriority')}">
            <span class="priority-tag priority-${c.priority}">
              ${c.priority.toUpperCase()}
            </span>
          </td>
          <td data-label="${t('colAction')}">
            <button class="btn btn-sm btn-outline" onclick="JanSetuOfficer.openDetailModal('${c.id}')">
              ${t('actionReview')}
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  openDetailModal: function (complaintId) {
    const complaint = window.JanSetuStorage.getComplaintById(complaintId);
    if (!complaint) return;

    this.selectedComplaintId = complaintId;
    const modal = document.getElementById('officer-detail-modal');
    if (!modal) return;

    const t = window.JanSetuI18n.t.bind(window.JanSetuI18n);
    const escape = window.JanSetuValidation.escapeHtml;
    const catObj = window.JANSETU_DATA.categories.find(c => c.id === complaint.category);
    const catName = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : complaint.category;

    // Populate modal fields
    document.getElementById('modal-complaint-id').textContent = complaint.id;
    document.getElementById('modal-status-badge').className = `status-indicator status-${complaint.status}`;
    document.getElementById('modal-status-badge').textContent = t(`status_${complaint.status.replace('-', '_')}`);
    document.getElementById('modal-desc').textContent = complaint.description;
    document.getElementById('modal-cat').textContent = catName;
    document.getElementById('modal-loc').textContent = `${complaint.locality} ${complaint.ward ? '(' + complaint.ward + ')' : ''} ${complaint.landmark ? '· ' + complaint.landmark : ''}`;
    document.getElementById('modal-submitted-time').textContent = window.JanSetuValidation.formatDateTime(complaint.submittedAt);

    // Form inputs
    const statusSelect = document.getElementById('modal-status-select');
    if (statusSelect) statusSelect.value = complaint.status;

    const deptSelect = document.getElementById('modal-assign-dept');
    if (deptSelect) deptSelect.value = complaint.assignedDepartment || complaint.suggestedDepartment || '';

    const roleSelect = document.getElementById('modal-assign-role');
    if (roleSelect) roleSelect.value = complaint.assignedOfficerRole || '';

    const prioritySelect = document.getElementById('modal-priority-select');
    if (prioritySelect) prioritySelect.value = complaint.priority || 'medium';

    const remarkInput = document.getElementById('modal-remark-input');
    if (remarkInput) remarkInput.value = complaint.latestRemark || '';

    // Render audit trail
    const auditContainer = document.getElementById('modal-audit-list');
    if (auditContainer) {
      let auditHtml = '';
      if (complaint.statusHistory && complaint.statusHistory.length > 0) {
        complaint.statusHistory.slice().reverse().forEach(h => {
          auditHtml += `
            <div class="audit-item">
              <div class="audit-time">${window.JanSetuValidation.formatDateTime(h.timestamp)} · <strong>${escape(h.actor)}</strong></div>
              <div>${escape(h.remark || 'Status updated to ' + h.status)}</div>
            </div>
          `;
        });
      } else {
        auditHtml = '<div class="text-muted text-xs">No previous audit records.</div>';
      }
      auditContainer.innerHTML = auditHtml;
    }

    if (window.JanSetuA11y) {
      window.JanSetuA11y.openModal(modal);
    }
  },

  handleSaveAction: function () {
    if (!this.selectedComplaintId) return;

    const status = document.getElementById('modal-status-select').value;
    const assignedDepartment = document.getElementById('modal-assign-dept').value;
    const assignedOfficerRole = document.getElementById('modal-assign-role').value;
    const priority = document.getElementById('modal-priority-select').value;
    const remark = document.getElementById('modal-remark-input').value;

    const success = window.JanSetuService.updateComplaintByOfficer(this.selectedComplaintId, {
      status: status,
      assignedDepartment: assignedDepartment,
      assignedOfficerRole: assignedOfficerRole,
      priority: priority,
      remark: remark,
      officerRole: assignedOfficerRole || 'Desk Officer (Rewa)'
    });

    if (success) {
      if (window.JanSetuNav) {
        window.JanSetuNav.showToast(`Request ${this.selectedComplaintId} updated successfully.`, 'success');
      }
      const modal = document.getElementById('officer-detail-modal');
      if (modal && window.JanSetuA11y) {
        window.JanSetuA11y.closeModal(modal);
      }
      this.refreshDashboard();
    } else {
      if (window.JanSetuNav) {
        window.JanSetuNav.showToast('Failed to update complaint record.', 'error');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('officer-queue-tbody')) {
    JanSetuOfficer.init();
  }
});
