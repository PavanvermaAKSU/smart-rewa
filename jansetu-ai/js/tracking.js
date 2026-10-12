/**
 * JanSetu AI - Complaint Tracking Logic
 * Powers tracking.html with vertical timeline and officer remarks
 */

window.JanSetuTracking = {
  init: function () {
    const searchForm = document.getElementById('tracking-search-form');
    const input = document.getElementById('tracking-id-input');

    if (searchForm && input) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = input.value.trim();
        this.lookupAndRender(id);
      });
    }

    // Check URL parameters for ?id=JS-REWA-...
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('id');
    if (paramId) {
      if (input) input.value = paramId;
      this.lookupAndRender(paramId);
    } else {
      // Default to showing first complaint if available as a sample
      const complaints = window.JanSetuStorage.getComplaints();
      if (complaints.length > 0) {
        this.renderComplaint(complaints[0]);
      }
    }

    // Auto-update if data changes in another tab
    window.addEventListener('jansetu:data-updated', () => {
      const currentId = input ? input.value.trim() : null;
      if (currentId) {
        this.lookupAndRender(currentId);
      }
    });
  },

  lookupAndRender: function (id) {
    const errorBox = document.getElementById('tracking-error');
    const detailsContainer = document.getElementById('tracking-result');

    if (!id) {
      if (errorBox) {
        errorBox.textContent = window.JanSetuI18n.t('invalidTrackId');
        errorBox.style.display = 'block';
      }
      if (detailsContainer) detailsContainer.style.display = 'none';
      return;
    }

    const complaint = window.JanSetuStorage.getComplaintById(id);
    if (!complaint) {
      if (errorBox) {
        errorBox.textContent = window.JanSetuI18n.t('invalidTrackId');
        errorBox.style.display = 'block';
      }
      if (detailsContainer) detailsContainer.style.display = 'none';
    } else {
      if (errorBox) errorBox.style.display = 'none';
      this.renderComplaint(complaint);
    }
  },

  renderComplaint: function (complaint) {
    const resultBox = document.getElementById('tracking-result');
    if (!resultBox) return;

    resultBox.style.display = 'block';

    const t = window.JanSetuI18n.t.bind(window.JanSetuI18n);
    const escape = window.JanSetuValidation.escapeHtml;
    const formatDt = window.JanSetuValidation.formatDateTime;

    const stages = [
      { key: 'submitted', label: t('status_submitted'), desc: 'Request submitted and queued for departmental routing.' },
      { key: 'review', label: t('status_review'), desc: 'Desk officer verified details and assigned jurisdictional zone.' },
      { key: 'assigned', label: t('status_assigned'), desc: 'Forwarded to designated field engineer or maintenance crew.' },
      { key: 'in-progress', label: t('status_in_progress'), desc: 'Field team dispatched for inspection and ground action.' },
      { key: 'resolved', label: t('status_resolved'), desc: 'Field repairs completed and confirmed by departmental supervisor.' }
    ];

    const stageOrder = ['submitted', 'review', 'assigned', 'in-progress', 'resolved'];
    const currentIdx = stageOrder.indexOf(complaint.status);

    // Build timeline HTML
    let timelineHtml = '<div class="timeline">';
    stages.forEach((st, idx) => {
      let markerClass = '';
      if (idx < currentIdx) {
        markerClass = 'completed';
      } else if (idx === currentIdx) {
        markerClass = 'active';
      }

      // Check if there is an audit history remark for this status
      const historyItem = complaint.statusHistory
        ? complaint.statusHistory.slice().reverse().find(h => h.status === st.key)
        : null;

      const timeText = historyItem ? formatDt(historyItem.timestamp) : (idx <= currentIdx ? 'In progress' : 'Pending');
      const remarkText = historyItem ? escape(historyItem.remark) : st.desc;

      timelineHtml += `
        <div class="timeline-step">
          <div class="timeline-marker ${markerClass}">
            ${idx < currentIdx ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </div>
          <div class="timeline-step-title">${st.label}</div>
          <div class="timeline-step-meta">${timeText} · ${historyItem ? escape(historyItem.actor) : 'JanSetu Engine'}</div>
          <div class="timeline-step-desc">${remarkText}</div>
        </div>
      `;
    });
    timelineHtml += '</div>';

    // Populate UI elements
    const idEl = document.getElementById('res-tracking-id');
    if (idEl) idEl.textContent = complaint.id;

    const statusBadge = document.getElementById('res-status-badge');
    if (statusBadge) {
      statusBadge.className = `status-indicator status-${complaint.status}`;
      statusBadge.textContent = t(`status_${complaint.status.replace('-', '_')}`);
    }

    const descEl = document.getElementById('res-description');
    if (descEl) descEl.textContent = complaint.description;

    const catEl = document.getElementById('res-category');
    if (catEl) {
      const catObj = window.JANSETU_DATA.categories.find(c => c.id === complaint.category);
      catEl.textContent = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : complaint.category;
    }

    const locEl = document.getElementById('res-locality');
    if (locEl) {
      let locStr = complaint.locality;
      if (complaint.ward) locStr += ` (${complaint.ward})`;
      if (complaint.landmark) locStr += ` · Landmark: ${complaint.landmark}`;
      locEl.textContent = locStr;
    }

    const submittedEl = document.getElementById('res-submitted-time');
    if (submittedEl) submittedEl.textContent = formatDt(complaint.submittedAt);

    const updatedEl = document.getElementById('res-updated-time');
    if (updatedEl) updatedEl.textContent = formatDt(complaint.updatedAt);

    const deptEl = document.getElementById('res-assigned-dept');
    if (deptEl) deptEl.textContent = complaint.assignedDepartment || complaint.suggestedDepartment || 'Under Triaging';

    const officerEl = document.getElementById('res-assigned-officer');
    if (officerEl) officerEl.textContent = complaint.assignedOfficerRole || 'Pending Assignment';

    const remarkBox = document.getElementById('res-latest-remark');
    if (remarkBox) {
      if (complaint.latestRemark) {
        remarkBox.textContent = complaint.latestRemark;
        remarkBox.style.fontStyle = 'normal';
      } else {
        remarkBox.textContent = t('noRemarksYet');
        remarkBox.style.fontStyle = 'italic';
      }
    }

    const timelineContainer = document.getElementById('res-timeline-container');
    if (timelineContainer) {
      timelineContainer.innerHTML = timelineHtml;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('tracking-result')) {
    JanSetuTracking.init();
  }
});
