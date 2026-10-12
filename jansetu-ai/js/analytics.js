/**
 * JanSetu AI - District Administration Analytics Engine
 * Calculates metrics directly from stored demonstration complaints
 */

window.JanSetuAnalytics = {
  getSummaryStats: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'submitted' || c.status === 'review').length;
    const inProgress = complaints.filter(c => c.status === 'assigned' || c.status === 'in-progress').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    
    // Calculate simulated SLA compliance rate
    const complianceRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return { total, pending, inProgress, resolved, complianceRate };
  },

  getCategoryDistribution: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const counts = {};

    window.JANSETU_DATA.categories.forEach(cat => {
      counts[cat.id] = 0;
    });

    complaints.forEach(c => {
      if (counts[c.category] !== undefined) {
        counts[c.category]++;
      } else {
        counts.other = (counts.other || 0) + 1;
      }
    });

    return window.JANSETU_DATA.categories.map(cat => ({
      id: cat.id,
      nameEn: cat.nameEn,
      nameHi: cat.nameHi,
      count: counts[cat.id] || 0
    }));
  },

  getLocalityDistribution: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const localityMap = {};

    complaints.forEach(c => {
      const loc = c.locality || 'Unknown';
      localityMap[loc] = (localityMap[loc] || 0) + 1;
    });

    return Object.entries(localityMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  },

  getDepartmentWorkload: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const deptMap = {};

    window.JANSETU_DATA.departments.forEach(d => {
      deptMap[d] = 0;
    });

    complaints.forEach(c => {
      const dept = c.assignedDepartment || c.suggestedDepartment;
      if (dept) {
        deptMap[dept] = (deptMap[dept] || 0) + 1;
      }
    });

    return Object.entries(deptMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
};
