/**
 * JanSetu AI - Lightweight Zero-Dependency Dashboard Charts
 * Renders semantic, responsive, offline SVG and CSS charts
 */

window.JanSetuCharts = {
  init: function () {
    this.renderAll();

    window.addEventListener('jansetu:data-updated', () => {
      this.renderAll();
    });

    window.addEventListener('jansetu:lang-changed', () => {
      this.renderAll();
    });
  },

  renderAll: function () {
    this.renderCategoryChart();
    this.renderLocalityChart();
    this.renderWorkloadChart();
  },

  renderCategoryChart: function () {
    const container = document.getElementById('chart-category-bars');
    if (!container) return;

    const categories = window.JanSetuAnalytics.getCategoryDistribution();
    const maxCount = Math.max(...categories.map(c => c.count), 1);
    const lang = window.JanSetuI18n.getLanguage();

    let html = '<div style="display:flex; flex-direction:column; gap:0.875rem;">';
    categories.forEach(cat => {
      const name = lang === 'hi' ? cat.nameHi : cat.nameEn;
      const pct = Math.round((cat.count / maxCount) * 100);
      
      html += `
        <div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-xs); font-weight:600; margin-bottom:0.25rem;">
            <span>${name}</span>
            <span style="color:var(--color-text-secondary);">${cat.count} requests</span>
          </div>
          <div style="height:10px; background:var(--color-surface-muted); border-radius:var(--radius-full); overflow:hidden;">
            <div style="height:100%; width:${pct}%; background:var(--color-primary-blue); border-radius:var(--radius-full); transition:width 0.5s ease;"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  },

  renderLocalityChart: function () {
    const container = document.getElementById('chart-locality-bars');
    if (!container) return;

    const localities = window.JanSetuAnalytics.getLocalityDistribution().slice(0, 6);
    const maxCount = Math.max(...localities.map(l => l.count), 1);

    let html = '<div style="display:flex; flex-direction:column; gap:0.875rem;">';
    localities.forEach(loc => {
      const pct = Math.round((loc.count / maxCount) * 100);
      html += `
        <div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-xs); font-weight:600; margin-bottom:0.25rem;">
            <span>${loc.name}</span>
            <span style="color:var(--color-text-secondary);">${loc.count}</span>
          </div>
          <div style="height:10px; background:var(--color-surface-muted); border-radius:var(--radius-full); overflow:hidden;">
            <div style="height:100%; width:${pct}%; background:var(--color-info); border-radius:var(--radius-full); transition:width 0.5s ease;"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  },

  renderWorkloadChart: function () {
    const container = document.getElementById('chart-workload-bars');
    if (!container) return;

    const workloads = window.JanSetuAnalytics.getDepartmentWorkload();
    const maxCount = Math.max(...workloads.map(w => w.count), 1);

    let html = '<div style="display:flex; flex-direction:column; gap:0.875rem;">';
    workloads.forEach(w => {
      const pct = Math.round((w.count / maxCount) * 100);
      html += `
        <div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-xs); font-weight:600; margin-bottom:0.25rem;">
            <span>${w.name}</span>
            <span style="color:var(--color-text-secondary);">${w.count} active</span>
          </div>
          <div style="height:10px; background:var(--color-surface-muted); border-radius:var(--radius-full); overflow:hidden;">
            <div style="height:100%; width:${pct}%; background:var(--color-success); border-radius:var(--radius-full); transition:width 0.5s ease;"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chart-category-bars')) {
    JanSetuCharts.init();
  }
});
