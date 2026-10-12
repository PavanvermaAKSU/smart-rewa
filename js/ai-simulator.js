/**
 * JanSetu AI - Simulated AI Assistant
 * Rule-based intent detection, Hindi/English NLU simulation, and service guidance
 * Clearly marked as simulated academic prototype
 */

window.JanSetuAI = {
  /**
   * Process user query and generate simulated structured response
   */
  processQuery: function (userQuery, callback) {
    if (!userQuery || !userQuery.trim()) {
      callback({
        text: 'कृपया अपनी समस्या या प्रश्न दर्ज करें। (Please enter your query)',
        category: null,
        actions: []
      });
      return;
    }

    const query = userQuery.trim().toLowerCase();
    const detectedCategory = window.JanSetuService.detectCategory(query);
    const lang = window.JanSetuI18n.getLanguage();

    // Simulated short delay for realism
    setTimeout(() => {
      let response = {};

      if (detectedCategory === 'water') {
        response = {
          category: 'water',
          categoryName: lang === 'hi' ? 'जल आपूर्ति (Water Supply)' : 'Water Supply',
          department: 'Municipal Corporation Rewa (Jal Vibhag)',
          text: lang === 'hi'
            ? 'आपकी समस्या पेयजल आपूर्ति या पाइपलाइन से संबंधित प्रतीत होती है। क्या आप इसे नगर निगम रीवा (जल विभाग) के समक्ष दर्ज करना चाहते हैं?'
            : 'Your issue appears to be related to Water Supply or pipeline leakage. Would you like to file this under Municipal Corporation Rewa (Jal Vibhag)?',
          actionText: lang === 'hi' ? 'जल आपूर्ति शिकायत दर्ज करें' : 'Start Water Complaint',
          sampleFaq: 'रीवा नगर निगम का पेयजल प्रकोष्ठ सामान्यतः 24-48 घंटों में लीकेज सुधार दल भेजता है।'
        };
      } else if (detectedCategory === 'road') {
        response = {
          category: 'road',
          categoryName: lang === 'hi' ? 'सड़क व गड्ढे (Roads & Potholes)' : 'Roads & Potholes',
          department: 'Public Works Department (PWD Rewa)',
          text: lang === 'hi'
            ? 'आपकी समस्या क्षतिग्रस्त सड़क या गड्ढों से संबंधित पाई गई है। लोक निर्माण विभाग (PWD) के अंतर्गत शिकायत प्रक्रिया शुरू की जा सकती है।'
            : 'Your grievance relates to damaged roads or potholes. You can initiate a complaint routed towards PWD Rewa.',
          actionText: lang === 'hi' ? 'सड़क शिकायत दर्ज करें' : 'Start Road Complaint',
          sampleFaq: 'मुख्य मार्गों के लिए PWD संभाग एवं आंतरिक गलियों के लिए नगर निगम रीवा उत्तरदायी है।'
        };
      } else if (detectedCategory === 'streetlight') {
        response = {
          category: 'streetlight',
          categoryName: lang === 'hi' ? 'स्ट्रीटलाइट (Streetlights)' : 'Streetlights',
          department: 'Rewa Electrical Maintenance Cell',
          text: lang === 'hi'
            ? 'आपके क्षेत्र में बंद या खराब स्ट्रीटलाइट की सूचना प्राप्त हुई है। क्या आप विद्युत संधारण प्रकोष्ठ को शिकायत भेजना चाहते हैं?'
            : 'Detected issue regarding inactive or damaged streetlights. Would you like to initiate a request to the Electrical Cell?',
          actionText: lang === 'hi' ? 'स्ट्रीटलाइट शिकायत दर्ज करें' : 'Start Streetlight Complaint',
          sampleFaq: 'खंभा क्रमांक और नजदीकी लैंडमार्क दर्ज करने से मरम्मत दल शीघ्र पहुंच सकता है।'
        };
      } else if (detectedCategory === 'sanitation') {
        response = {
          category: 'sanitation',
          categoryName: lang === 'hi' ? 'कचरा व स्वच्छता (Sanitation)' : 'Sanitation & Garbage',
          department: 'Rewa Municipal Sanitation Division',
          text: lang === 'hi'
            ? 'आपकी शिकायत कचरा उठाव या सार्वजनिक गंदगी से संबंधित है। नगर निगम स्वच्छता प्रकोष्ठ में शिकायत दर्ज करने का विकल्प उपलब्ध है।'
            : 'Your report relates to uncollected garbage or sanitation. You can file a request for the Municipal Sanitation team.',
          actionText: lang === 'hi' ? 'स्वच्छता शिकायत दर्ज करें' : 'Start Sanitation Complaint',
          sampleFaq: 'कचरा गाड़ी के न आने पर वार्ड क्रमांक के साथ शिकायत दर्ज की जाती है।'
        };
      } else if (detectedCategory === 'certificate') {
        response = {
          category: 'certificate',
          categoryName: lang === 'hi' ? 'सरकारी सेवाएं (Government Services)' : 'Government Services',
          department: 'Lok Seva Kendra Rewa / Revenue',
          text: lang === 'hi'
            ? 'मध्य प्रदेश लोक सेवा गारंटी अधिनियम के तहत आय, निवास या जाति प्रमाण पत्र लोक सेवा केंद्र या mpedistrict.gov.in से प्राप्त किए जा सकते हैं।'
            : 'Under the MP Public Service Guarantee, Income, Domicile, and Caste certificates can be accessed via Lok Seva Kendra or mpedistrict.gov.in.',
          actionText: lang === 'hi' ? 'प्रमाण पत्र मार्गदर्शन देखें' : 'View Certificate Guidance',
          redirectUrl: 'services.html',
          sampleFaq: 'समग्र आईडी, आधार कार्ड और स्व-घोषणा पत्र अनिवार्य दस्तावेज हैं।'
        };
      } else {
        // Fallback or general response
        response = {
          category: 'other',
          categoryName: lang === 'hi' ? 'सामान्य जनसमस्या' : 'General Public Issue',
          department: 'General District Administration',
          text: lang === 'hi'
            ? 'मैंने आपका विवरण पढ़ा है। आप इसे रीवा जिला प्रशासन के समक्ष सामान्य सार्वजनिक शिकायत के रूप में दर्ज कर सकते हैं।'
            : 'I have analyzed your query. You can register this as a general public grievance for Rewa District Administration.',
          actionText: lang === 'hi' ? 'शिकायत फॉर्म में ले जाएं' : 'Proceed to Complaint Form',
          sampleFaq: 'वर्तमान डेमो में असत्यापित प्रश्नों के लिए कृपया आधिकारिक सेवा केंद्र से परामर्श लें।'
        };
      }

      callback(response);
    }, 500);
  },

  /**
   * Optional Speech Recognition Setup (Web Speech API)
   */
  startVoiceInput: function (onResult, onError, onEnd) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      const currentLang = window.JanSetuI18n.getLanguage();
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = function (event) {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          if (onResult) onResult(transcript);
        }
      };

      recognition.onerror = function (event) {
        console.warn('Speech recognition error:', event.error);
        if (onError) onError(event.error);
      };

      recognition.onend = function () {
        if (onEnd) onEnd();
      };

      recognition.start();
      return recognition;
    } catch (e) {
      if (onError) onError(e.message);
      return null;
    }
  }
};
