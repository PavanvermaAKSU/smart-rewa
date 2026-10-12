/**
 * JanSetu AI - Rewa District Schematic Geographic Map
 * Interactive illustrative hotspot map demonstrating spatial grievance distribution
 */

window.JanSetuMap = {
  currentCategoryFilter: 'all',
  selectedHotspot: null,

  // Schematic coordinate offsets for Rewa localities
  localityCoordinates: {
    'Bodabag, Rewa': { x: 42, y: 52 },
    'Civil Lines, Rewa': { x: 50, y: 46 },
    'Saman Tiraha, Rewa': { x: 56, y: 40 },
    'Dhobia Tanki, Rewa': { x: 46, y: 58 },
    'Bichhiya, Rewa': { x: 62, y: 60 },
    'Padra, Rewa': { x: 38, y: 44 },
    'University Road, Rewa': { x: 54, y: 32 },
    'Urrahat, Rewa': { x: 48, y: 50 },
    'Chirahula Colony, Rewa': { x: 58, y: 52 },
    'Kothi Compound, Rewa': { x: 45, y: 42 }
  },

  init: function () {
    this.renderMapPins();
    this.bindEvents();

    window.addEventListener('jansetu:data-updated', () => {
      this.renderMapPins();
    });
  },

  bindEvents: function () {
    const filterSelect = document.getElementById('map-cat-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.currentCategoryFilter = e.target.value;
        this.renderMapPins();
      });
    }
  },

  renderMapPins: function () {
    const container = document.getElementById('schematic-pins-container');
    if (!container) return;

    container.innerHTML = '';
    const complaints = window.JanSetuStorage.getComplaints();
    const filtered = this.currentCategoryFilter === 'all'
      ? complaints
      : complaints.filter(c => c.category === this.currentCategoryFilter);

    filtered.forEach((c, index) => {
      const coords = this.localityCoordinates[c.locality] || {
        x: 30 + (index * 7) % 50,
        y: 35 + (index * 9) % 45
      };

      const pin = document.createElement('button');
      pin.className = `map-hotspot-pin ${c.category}`;
      pin.style.left = `${coords.x}%`;
      pin.style.top = `${coords.y}%`;
      pin.setAttribute('title', `${c.id} - ${c.locality}`);
      pin.setAttribute('aria-label', `Hotspot: ${c.id}`);

      let iconInitial = 'P';
      if (c.category === 'water') iconInitial = 'W';
      if (c.category === 'road') iconInitial = 'R';
      if (c.category === 'streetlight') iconInitial = 'L';
      if (c.category === 'sanitation') iconInitial = 'S';
      if (c.category === 'electricity') iconInitial = 'E';

      pin.textContent = iconInitial;

      pin.addEventListener('click', () => {
        document.querySelectorAll('.map-hotspot-pin').forEach(p => p.classList.remove('active'));
        pin.classList.add('active');
        this.displayHotspotInfo(c);
      });

      container.appendChild(pin);
    });

    // Auto-select first hotspot for detail pane
    if (filtered.length > 0 && !this.selectedHotspot) {
      this.displayHotspotInfo(filtered[0]);
    }
  },

  displayHotspotInfo: function (complaint) {
    this.selectedHotspot = complaint;
    const detailBox = document.getElementById('map-detail-card');
    if (!detailBox) return;

    const t = window.JanSetuI18n.t.bind(window.JanSetuI18n);
    const escape = window.JanSetuValidation.escapeHtml;
    const catObj = window.JANSETU_DATA.categories.find(c => c.id === complaint.category);
    const catName = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : complaint.category;

    detailBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <span style="font-family:var(--font-mono); font-weight:700; color:var(--color-primary-navy);">${escape(complaint.id)}</span>
        <span class="status-indicator status-${complaint.status}">${t('status_' + complaint.status.replace('-', '_'))}</span>
      </div>
      <div style="font-weight:700; color:var(--color-primary-navy); margin-bottom:0.25rem;">${escape(complaint.locality)}</div>
      <div style="font-size:var(--text-xs); color:var(--color-text-secondary); margin-bottom:0.75rem;">
        Category: <strong>${escape(catName)}</strong> ${complaint.ward ? '· ' + escape(complaint.ward) : ''}
      </div>
      <p style="font-size:var(--text-xs); color:var(--color-text-primary); margin-bottom:1rem; line-height:1.4;">
        ${escape(complaint.description)}
      </p>
      <div style="font-size:var(--text-xs); background:var(--color-surface); padding:0.5rem; border-radius:var(--radius-sm); border:1px solid var(--color-border); margin-bottom:1rem;">
        <strong>Responsible:</strong> ${escape(complaint.assignedDepartment || complaint.suggestedDepartment || 'Under Review')}
      </div>
      <div style="display:flex; gap:0.5rem;">
        <a href="tracking.html?id=${encodeURIComponent(complaint.id)}" class="btn btn-sm btn-outline" style="flex:1;">
          Track Full Timeline
        </a>
        <a href="officer.html" class="btn btn-sm btn-primary" style="flex:1;">
          Open in Officer Desk
        </a>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('schematic-pins-container')) {
    JanSetuMap.init();
  }
});
