/**
 * JanSetu AI - Complaint Workflow & Service Layer
 * Shared across Citizen, Officer, Tracking, and Administration
 */

window.JanSetuService = {
  /**
   * Generate collision-resistant unique demonstration tracking ID
   */
  generateTrackingId: function () {
    const complaints = window.JanSetuStorage.getComplaints();
    const existingNumbers = complaints
      .map(c => {
        const match = String(c.id).match(/JS-REWA-2026-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(n => !isNaN(n));

    const highest = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 1005;
    const nextNum = highest + 1;
    return `JS-REWA-2026-${nextNum}`;
  },

  /**
   * Detect suggested category from description text (rule-based keyword matching)
   */
  detectCategory: function (text) {
    if (!text) return 'other';
    const lower = text.toLowerCase();

    // Water keywords
    if (/पानी|जल|नल|बोरवेल|पाइप|सप्लाई|water|leakage|pipeline|borewell/i.test(lower)) {
      return 'water';
    }
    // Road keywords
    if (/सड़क|सडक|गड्ढा|गड्ढे|डामर|पुल|रोड|road|pothole|street|highway/i.test(lower)) {
      return 'road';
    }
    // Streetlight keywords
    if (/लाइट|स्ट्रीटलाइट|बत्ती|अंधेरा|खंभा|pole|light|bulb|dark/i.test(lower)) {
      return 'streetlight';
    }
    // Sanitation keywords
    if (/कचरा|कूड़ा|सफाई|कचरे|गंदगी|डस्टबिन|garbage|trash|waste|cleaning/i.test(lower)) {
      return 'sanitation';
    }
    // Drainage keywords
    if (/नाली|नाला|सीवर|जलभराव|गंदा पानी|drain|drainage|sewage|waterlogging/i.test(lower)) {
      return 'drainage';
    }
    // Electricity keywords
    if (/बिजली|ट्रांसफार्मर|करंट|वोल्टेज|मीटर|power|transformer|electric|mppkvvcl/i.test(lower)) {
      return 'electricity';
    }
    // Certificate / Government services
    if (/प्रमाण पत्र|आय|निवास|जाति|राशन|समग्र|certificate|income|domicile|ration/i.test(lower)) {
      return 'certificate';
    }
    // Transport
    if (/बस|ऑटो|स्टॉप|यातायात|परिवहन|bus|transport|traffic/i.test(lower)) {
      return 'transport';
    }

    return 'other';
  },

  /**
   * Get default suggested department for a category
   */
  getDepartmentForCategory: function (categoryId) {
    const cat = window.JANSETU_DATA.categories.find(c => c.id === categoryId);
    return cat ? cat.dept : 'General District Administration';
  },

  /**
   * Create a new complaint from citizen portal submission
   */
  createComplaint: function (formData) {
    const trackingId = this.generateTrackingId();
    const now = new Date().toISOString();
    const suggestedDept = this.getDepartmentForCategory(formData.category);

    const newRecord = {
      id: trackingId,
      description: formData.description.trim(),
      category: formData.category,
      locality: formData.locality.trim(),
      ward: formData.ward ? formData.ward.trim() : '',
      village: formData.village ? formData.village.trim() : '',
      landmark: formData.landmark ? formData.landmark.trim() : '',
      evidenceUrl: formData.evidenceUrl || '',
      submittedAt: now,
      updatedAt: now,
      status: 'submitted',
      suggestedDepartment: suggestedDept,
      assignedDepartment: '',
      assignedOfficerRole: '',
      priority: formData.priority || 'medium',
      latestRemark: '',
      statusHistory: [
        {
          status: 'submitted',
          timestamp: now,
          actor: 'Citizen Portal',
          remark: 'Demonstration grievance registered by citizen.'
        }
      ],
      isDemo: true
    };

    const saved = window.JanSetuStorage.saveComplaint(newRecord);
    if (!saved) throw new Error('Failed to persist demo complaint to storage.');
    return newRecord;
  },

  /**
   * Update complaint by an authorized officer
   */
  updateComplaintByOfficer: function (id, updateData) {
    const complaint = window.JanSetuStorage.getComplaintById(id);
    if (!complaint) return false;

    const now = new Date().toISOString();
    const oldStatus = complaint.status;
    const newStatus = updateData.status || oldStatus;

    if (updateData.assignedDepartment) {
      complaint.assignedDepartment = updateData.assignedDepartment;
    }
    if (updateData.assignedOfficerRole) {
      complaint.assignedOfficerRole = updateData.assignedOfficerRole;
    }
    if (updateData.priority) {
      complaint.priority = updateData.priority;
    }

    const remarkText = updateData.remark ? updateData.remark.trim() : '';
    if (remarkText) {
      complaint.latestRemark = remarkText;
    }

    // Append to status history if status changed OR a remark was added
    if (oldStatus !== newStatus || remarkText) {
      complaint.status = newStatus;
      complaint.statusHistory.push({
        status: newStatus,
        timestamp: now,
        actor: updateData.officerRole || 'Desk Officer (Rewa)',
        remark: remarkText || `Status updated from ${oldStatus} to ${newStatus}`
      });
    }

    complaint.updatedAt = now;
    return window.JanSetuStorage.saveComplaint(complaint);
  },

  /**
   * Filter complaints with query options
   */
  filterComplaints: function (filters = {}) {
    let list = window.JanSetuStorage.getComplaints();

    if (filters.status && filters.status !== 'all') {
      list = list.filter(c => c.status === filters.status);
    }
    if (filters.category && filters.category !== 'all') {
      list = list.filter(c => c.category === filters.category);
    }
    if (filters.locality && filters.locality !== 'all') {
      list = list.filter(c => c.locality.toLowerCase().includes(filters.locality.toLowerCase()));
    }
    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(c => 
        c.id.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.locality.toLowerCase().includes(q) ||
        (c.landmark && c.landmark.toLowerCase().includes(q))
      );
    }

    return list;
  }
};
