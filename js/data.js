/**
 * JanSetu AI - Demonstration Data & Reference Knowledge
 * Targeted for Rewa District, Madhya Pradesh, India
 * Team Vindhya Innovators | AKS University | iComputex TechFest 2026
 */

window.JANSETU_DATA = {
  categories: [
    { id: 'water', nameEn: 'Water Supply', nameHi: 'जल आपूर्ति', icon: 'droplet', dept: 'Jal Vibhag (Municipal Corp / PHE)' },
    { id: 'road', nameEn: 'Roads & Potholes', nameHi: 'सड़क व गड्ढे', icon: 'road', dept: 'Public Works Department (PWD Rewa)' },
    { id: 'streetlight', nameEn: 'Streetlights', nameHi: 'स्ट्रीटलाइट', icon: 'lightbulb', dept: 'Electrical Maintenance Cell' },
    { id: 'sanitation', nameEn: 'Garbage & Sanitation', nameHi: 'कचरा व स्वच्छता', icon: 'trash', dept: 'Municipal Sanitation Division' },
    { id: 'drainage', nameEn: 'Drainage & Sewage', nameHi: 'नाली व जल निकासी', icon: 'waves', dept: 'Drainage & Sewage Cell' },
    { id: 'electricity', nameEn: 'Electricity Supply', nameHi: 'बिजली व ट्रांसफार्मर', icon: 'zap', dept: 'MP Poorv Kshetra Vidyut Vitaran' },
    { id: 'transport', nameEn: 'Public Transport', nameHi: 'सार्वजनिक परिवहन', icon: 'bus', dept: 'District Transport Office (DTO)' },
    { id: 'certificate', nameEn: 'Government Services', nameHi: 'सरकारी सेवाएं व प्रमाण पत्र', icon: 'file-text', dept: 'Lok Seva Kendra / Revenue' },
    { id: 'other', nameEn: 'Other Public Issues', nameHi: 'अन्य सार्वजनिक समस्याएं', icon: 'help-circle', dept: 'General District Administration' }
  ],

  departments: [
    'Municipal Corporation Rewa (नगर निगम)',
    'Public Works Department (लोक निर्माण विभाग - PWD)',
    'MP Poorv Kshetra Vidyut Vitaran Co. (विद्युत वितरण)',
    'Public Health Engineering Department (PHE - जल संवर्धन)',
    'Revenue & Lok Seva Kendra (राजस्व विभाग)',
    'Rewa Sanitation & Waste Cell (स्वच्छता प्रकोष्ठ)'
  ],

  officerRoles: [
    'Nodal Officer - Urban Grievances',
    'Executive Engineer - PWD Rewa',
    'Superintending Engineer - MPPKVVCL',
    'Sanitation Inspector - Zone 1 Rewa',
    'Assistant Commissioner - Nagar Nigam'
  ],

  rewaLocalities: [
    'Civil Lines, Rewa',
    'Bodabag, Rewa',
    'Saman Tiraha, Rewa',
    'Urrahat, Rewa',
    'Padra, Rewa',
    'Kothi Compound, Rewa',
    'Bichhiya, Rewa',
    'University Road, Rewa',
    'Dhobia Tanki, Rewa',
    'Chirahula Colony, Rewa',
    'Venkat Road, Rewa',
    'Govindgarh Road, Rewa',
    'Gurh Road, Rewa',
    'Nehru Nagar, Rewa',
    'Ratahara, Rewa'
  ],

  rewaTehsils: [
    { id: 'huzur', name: 'Huzur (Rewa Urban)', lat: 24.5373, lng: 81.3039, activeComplaints: 4 },
    { id: 'sirmour', name: 'Sirmour', lat: 24.8465, lng: 81.3789, activeComplaints: 2 },
    { id: 'mangawan', name: 'Mangawan', lat: 24.6738, lng: 81.5471, activeComplaints: 1 },
    { id: 'teonthar', name: 'Teonthar', lat: 24.9856, lng: 81.6521, activeComplaints: 1 },
    { id: 'hanumana', name: 'Hanumana', lat: 24.7731, lng: 82.0911, activeComplaints: 1 },
    { id: 'mauganj', name: 'Mauganj', lat: 24.6791, lng: 81.8741, activeComplaints: 2 },
    { id: 'raipur', name: 'Raipur Karchuliyan', lat: 24.5312, lng: 81.5201, activeComplaints: 1 },
    { id: 'gurh', name: 'Gurh', lat: 24.5167, lng: 81.5167, activeComplaints: 1 }
  ],

  seedComplaints: [
    {
      id: 'JS-REWA-2026-1001',
      description: 'पिछले 4 दिनों से हमारे मोहल्ले में बोरवेल पाइपलाइन क्षतिग्रस्त होने से पेयजल आपूर्ति पूरी तरह बाधित है।',
      category: 'water',
      locality: 'Bodabag, Rewa',
      ward: 'Ward 14',
      village: '',
      landmark: 'Near Primary School, Bodabag',
      submittedAt: '2026-10-10T09:30:00Z',
      updatedAt: '2026-10-11T14:15:00Z',
      status: 'in-progress',
      suggestedDepartment: 'Municipal Corporation Rewa (नगर निगम)',
      assignedDepartment: 'Municipal Corporation Rewa - Jal Vibhag',
      assignedOfficerRole: 'Assistant Engineer - Water Works',
      priority: 'high',
      latestRemark: 'Pipeline leak localized. Repair team dispatched with spare joint sleeves. Expected completion by tomorrow evening.',
      statusHistory: [
        { status: 'submitted', timestamp: '2026-10-10T09:30:00Z', actor: 'Citizen Portal', remark: 'Initial demonstration complaint filed by citizen.' },
        { status: 'review', timestamp: '2026-10-10T11:00:00Z', actor: 'Automated Triaging / Officer Desk', remark: 'Classified under Jal Vibhag priority category.' },
        { status: 'assigned', timestamp: '2026-10-10T15:20:00Z', actor: 'Nodal Officer - Urban Grievances', remark: 'Assigned to Assistant Engineer - Water Works, Zone 2.' },
        { status: 'in-progress', timestamp: '2026-10-11T14:15:00Z', actor: 'AE - Water Works', remark: 'Pipeline leak localized. Repair team dispatched.' }
      ],
      isDemo: true
    },
    {
      id: 'JS-REWA-2026-1002',
      description: 'सामन तिराहा से कॉलेज चौराहे तक मुख्य सड़क पर गहरे गड्ढे हैं जिससे दोपहिया वाहन चालकों के गिरने का खतरा बना रहता है।',
      category: 'road',
      locality: 'Saman Tiraha, Rewa',
      ward: 'Ward 22',
      village: '',
      landmark: 'Near Saman Tiraha Overbridge',
      submittedAt: '2026-10-11T08:15:00Z',
      updatedAt: '2026-10-11T16:00:00Z',
      status: 'assigned',
      suggestedDepartment: 'Public Works Department (PWD Rewa)',
      assignedDepartment: 'Public Works Department (PWD Rewa)',
      assignedOfficerRole: 'Executive Engineer - PWD Rewa',
      priority: 'high',
      latestRemark: 'Site inspection ordered for road surface patching estimate.',
      statusHistory: [
        { status: 'submitted', timestamp: '2026-10-11T08:15:00Z', actor: 'Citizen Portal', remark: 'Demo grievance registered with landmark details.' },
        { status: 'review', timestamp: '2026-10-11T10:45:00Z', actor: 'Officer Desk', remark: 'Verified location on arterial PWD stretch.' },
        { status: 'assigned', timestamp: '2026-10-11T16:00:00Z', actor: 'Executive Engineer - PWD', remark: 'Site inspection ordered for road surface patching estimate.' }
      ],
      isDemo: true
    },
    {
      id: 'JS-REWA-2026-1003',
      description: 'सिविल लाइन्स मुख्य पार्क के सामने 3 स्ट्रीट लाइट पिछले एक हफ्ते से बंद हैं। रात में काफी अंधेरा रहता है।',
      category: 'streetlight',
      locality: 'Civil Lines, Rewa',
      ward: 'Ward 08',
      village: '',
      landmark: 'Opposite Gandhi Park Gate 2',
      submittedAt: '2026-10-11T18:20:00Z',
      updatedAt: '2026-10-12T07:10:00Z',
      status: 'resolved',
      suggestedDepartment: 'Electrical Maintenance Cell',
      assignedDepartment: 'Electrical Maintenance Cell',
      assignedOfficerRole: 'Junior Engineer - Electrical Cell',
      priority: 'medium',
      latestRemark: 'Faulty LED drivers and fuse replaced at pole poles #14, #15, #16. Verified working.',
      statusHistory: [
        { status: 'submitted', timestamp: '2026-10-11T18:20:00Z', actor: 'Citizen Portal', remark: 'Demo grievance submitted.' },
        { status: 'review', timestamp: '2026-10-11T20:00:00Z', actor: 'Automated Triaging', remark: 'Assigned to night maintenance inspection queue.' },
        { status: 'in-progress', timestamp: '2026-10-12T06:00:00Z', actor: 'JE - Electrical', remark: 'Replacement crew dispatched with bucket truck.' },
        { status: 'resolved', timestamp: '2026-10-12T07:10:00Z', actor: 'JE - Electrical', remark: 'Faulty LED drivers and fuse replaced at pole poles #14, #15, #16. Verified working.' }
      ],
      isDemo: true
    },
    {
      id: 'JS-REWA-2026-1004',
      description: 'धोबिया टंकी वार्ड 12 में खाली प्लॉट पर कूड़े का बड़ा ढेर लगा हुआ है। सफाई गाड़ी नियमित नहीं आ रही है।',
      category: 'sanitation',
      locality: 'Dhobia Tanki, Rewa',
      ward: 'Ward 12',
      village: '',
      landmark: 'Behind Water Tank, Plot No. 44',
      submittedAt: '2026-10-12T06:45:00Z',
      updatedAt: '2026-10-12T06:45:00Z',
      status: 'submitted',
      suggestedDepartment: 'Municipal Sanitation Division',
      assignedDepartment: '',
      assignedOfficerRole: '',
      priority: 'medium',
      latestRemark: '',
      statusHistory: [
        { status: 'submitted', timestamp: '2026-10-12T06:45:00Z', actor: 'Citizen Portal', remark: 'Citizen demo grievance recorded.' }
      ],
      isDemo: true
    },
    {
      id: 'JS-REWA-2026-1005',
      description: 'बिछिया बस्ती में नाली की सिल्ट भरने से बारिश का गंदा पानी सड़क पर बहने लगा है।',
      category: 'drainage',
      locality: 'Bichhiya, Rewa',
      ward: 'Ward 19',
      village: '',
      landmark: 'Near Bichhiya River Bridge End',
      submittedAt: '2026-10-11T12:00:00Z',
      updatedAt: '2026-10-11T14:30:00Z',
      status: 'review',
      suggestedDepartment: 'Drainage & Sewage Cell',
      assignedDepartment: '',
      assignedOfficerRole: '',
      priority: 'high',
      latestRemark: 'Forwarded to Ward 19 sanitation supervisor for silt clearing estimate.',
      statusHistory: [
        { status: 'submitted', timestamp: '2026-10-11T12:00:00Z', actor: 'Citizen Portal', remark: 'Complaint filed.' },
        { status: 'review', timestamp: '2026-10-11T14:30:00Z', actor: 'Officer Desk', remark: 'Forwarded to Ward 19 sanitation supervisor for silt clearing estimate.' }
      ],
      isDemo: true
    }
  ],

  servicesKnowledge: [
    {
      id: 'srv-income-cert',
      titleEn: 'Income Certificate Guidance (आय प्रमाण पत्र)',
      titleHi: 'आय प्रमाण पत्र मार्गदर्शन',
      category: 'Revenue Department / Lok Seva Kendra Rewa',
      descriptionEn: 'Guide on how to apply for an official Income Certificate in Madhya Pradesh via Lok Seva Kendra or MP e-District portal.',
      descriptionHi: 'मध्य प्रदेश में लोक सेवा केंद्र या एमपी ई-डिस्ट्रिक्ट पोर्टल के माध्यम से आय प्रमाण पत्र प्राप्त करने की प्रक्रिया का मार्गदर्शन।',
      requirements: [
        'Samagra ID (समग्र आईडी)',
        'Self-declaration of family income (स्व-घोषणा पत्र)',
        'Proof of Identity / Address (Aadhaar or Voter ID)',
        'Passport-sized photograph'
      ],
      procedure: [
        'Visit nearest Lok Seva Kendra (Rewa Collectorate / Tehsil) or visit mpedistrict.gov.in',
        'Fill Form 1 for Income Certificate and submit signed self-declaration',
        'Receive official acknowledgment receipt with application tracking number',
        'Standard issuance time under MP Public Service Guarantee Act is typically 3 working days'
      ],
      disclaimer: 'Illustrative citizen guidance only. Please verify exact requirements on the official MP e-District portal.'
    },
    {
      id: 'srv-domicile-cert',
      titleEn: 'Domicile / Residence Certificate (मूल निवास प्रमाण पत्र)',
      titleHi: 'स्थानीय मूल निवास प्रमाण पत्र',
      category: 'Revenue Department / Lok Seva Kendra',
      descriptionEn: 'Procedure for obtaining proof of permanent residency in Madhya Pradesh for education or public employment.',
      descriptionHi: 'शिक्षा, छात्रवृत्ति या शासकीय नौकरियों हेतु मध्य प्रदेश के मूल निवासी प्रमाण पत्र की सामान्य प्रक्रिया।',
      requirements: [
        'Proof of continuous residence in MP for minimum required years',
        'Samagra ID',
        'Educational records or Land registry (Khasra/Khatauni)'
      ],
      procedure: [
        'Apply online at mpedistrict.gov.in or through Lok Seva Kendra Rewa',
        'Tehsildar verification',
        'Digitally signed certificate issued upon verification'
      ],
      disclaimer: 'Illustrative demonstration guidance.'
    },
    {
      id: 'srv-water-sanitation',
      titleEn: 'Municipal Water Connection & Grievance',
      titleHi: 'नल जल संयोजन एवं पेयजल शिकायत',
      category: 'Rewa Nagar Nigam - Jal Vibhag',
      descriptionEn: 'Guidance on reporting pipeline damages, contaminated water, or applying for a domestic water tap connection in Rewa.',
      descriptionHi: 'रीवा नगर निगम क्षेत्र में पाइपलाइन लीकेज, गंदे पानी की समस्या या नए जल संयोजन की जानकारी।',
      requirements: [
        'Property Tax Receipt / House ownership proof',
        'Ward and locality details',
        'Contact phone number'
      ],
      procedure: [
        'Submit complaint with exact locality and landmark on JanSetu AI',
        'Or contact Municipal Corporation Rewa helpline at 1800-233-1002'
      ],
      disclaimer: 'JanSetu AI is an academic demonstration prototype.'
    }
  ]
};
