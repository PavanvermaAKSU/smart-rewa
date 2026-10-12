/**
 * JanSetu AI - Main Application Coordinator & Citizen Wizard
 * Handles Guided Complaint Submission, AI Assistant Chat, and Home Flow
 */

window.JanSetuApp = {
  currentStep: 1,
  selectedCategory: 'water',
  uploadedPhotoPreview: null,
  activeSpeechRecognition: null,

  init: function () {
    this.bindCitizenWizard();
    this.bindAssistantChat();
    this.bindCategoryShortcuts();
    this.renderRecentComplaints();

    window.addEventListener('jansetu:data-updated', () => {
      this.renderRecentComplaints();
    });

    window.addEventListener('jansetu:lang-changed', () => {
      this.renderRecentComplaints();
      this.updateWizardLabels();
    });
  },

  /**
   * Bind the 4-step guided complaint submission wizard
   */
  bindCitizenWizard: function () {
    const wizardForm = document.getElementById('citizen-complaint-form');
    if (!wizardForm) return;

    // Step navigation buttons
    document.querySelectorAll('[data-wizard-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.goToNextStep();
      });
    });

    document.querySelectorAll('[data-wizard-prev]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.goToPreviousStep();
      });
    });

    // Populate Category Select
    const catSelect = document.getElementById('wizard-category-select');
    if (catSelect && window.JANSETU_DATA) {
      catSelect.innerHTML = '';
      window.JANSETU_DATA.categories.forEach(c => {
        const name = window.JanSetuI18n.getLanguage() === 'hi' ? c.nameHi : c.nameEn;
        catSelect.innerHTML += `<option value="${c.id}">${name}</option>`;
      });

      catSelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.updateDepartmentSuggestion();
      });
    }

    // Populate Locality Select
    const locSelect = document.getElementById('wizard-locality-select');
    if (locSelect && window.JANSETU_DATA) {
      locSelect.innerHTML = `<option value="">${window.JanSetuI18n.t('locSelectPlaceholder')}</option>`;
      window.JANSETU_DATA.rewaLocalities.forEach(loc => {
        locSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
      });
    }

    // Description text input changes -> auto-suggest category
    const descTextarea = document.getElementById('wizard-desc-input');
    if (descTextarea) {
      descTextarea.addEventListener('blur', () => {
        const text = descTextarea.value.trim();
        if (text) {
          const detected = window.JanSetuService.detectCategory(text);
          if (catSelect && detected) {
            catSelect.value = detected;
            this.selectedCategory = detected;
            this.updateDepartmentSuggestion();
          }
        }
      });
    }

    // Photo input preview
    const photoInput = document.getElementById('wizard-photo-input');
    const photoPreviewBox = document.getElementById('wizard-photo-preview');
    if (photoInput && photoPreviewBox) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const valRes = window.JanSetuValidation.validateImageFile(file);
          if (!valRes.valid) {
            alert(valRes.error);
            photoInput.value = '';
            return;
          }
          const reader = new FileReader();
          reader.onload = (loadEvt) => {
            this.uploadedPhotoPreview = loadEvt.target.result;
            photoPreviewBox.innerHTML = `
              <div style="position:relative; display:inline-block; margin-top:0.5rem;">
                <img src="${this.uploadedPhotoPreview}" alt="Evidence Preview" style="max-height:120px; border-radius:var(--radius-md); border:1px solid var(--color-border);" />
                <button type="button" class="btn btn-sm btn-danger" style="position:absolute; top:4px; right:4px; padding:2px 6px; font-size:10px;" id="remove-photo-btn">Remove</button>
              </div>
            `;
            const removeBtn = document.getElementById('remove-photo-btn');
            if (removeBtn) {
              removeBtn.addEventListener('click', () => {
                this.uploadedPhotoPreview = null;
                photoInput.value = '';
                photoPreviewBox.innerHTML = '';
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // GPS Simulation button
    const gpsBtn = document.getElementById('wizard-gps-btn');
    const gpsStatus = document.getElementById('wizard-gps-status');
    if (gpsBtn && locSelect) {
      gpsBtn.addEventListener('click', () => {
        if (gpsStatus) {
          gpsStatus.textContent = 'Detecting nearest Rewa landmark (Simulated GPS)...';
          gpsStatus.style.color = 'var(--color-primary-blue)';
        }
        setTimeout(() => {
          locSelect.value = 'Civil Lines, Rewa';
          if (gpsStatus) {
            gpsStatus.textContent = 'Location matched: Civil Lines, Rewa (Ward 08).';
            gpsStatus.style.color = 'var(--color-success)';
          }
        }, 700);
      });
    }

    // Final Submission Handler
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFinalSubmission();
    });
  },

  updateDepartmentSuggestion: function () {
    const deptBox = document.getElementById('wizard-suggested-dept');
    if (deptBox) {
      const dept = window.JanSetuService.getDepartmentForCategory(this.selectedCategory);
      deptBox.textContent = dept;
    }
  },

  goToNextStep: function () {
    const errorBox = document.getElementById(`step-${this.currentStep}-error`);
    if (errorBox) errorBox.style.display = 'none';

    // Step 1 Validation
    if (this.currentStep === 1) {
      const desc = document.getElementById('wizard-desc-input').value;
      const res = window.JanSetuValidation.validateDescription(desc);
      if (!res.valid) {
        if (errorBox) {
          errorBox.textContent = res.error;
          errorBox.style.display = 'block';
        }
        return;
      }
    }

    // Step 2: Category selection already set, update department
    if (this.currentStep === 2) {
      this.updateDepartmentSuggestion();
    }

    // Step 3 Validation
    if (this.currentStep === 3) {
      const loc = document.getElementById('wizard-locality-select').value;
      const res = window.JanSetuValidation.validateLocality(loc);
      if (!res.valid) {
        if (errorBox) {
          errorBox.textContent = res.error;
          errorBox.style.display = 'block';
        }
        return;
      }
      this.populateReviewSummary();
    }

    if (this.currentStep < 4) {
      this.setStep(this.currentStep + 1);
    }
  },

  goToPreviousStep: function () {
    if (this.currentStep > 1) {
      this.setStep(this.currentStep - 1);
    }
  },

  setStep: function (stepNum) {
    this.currentStep = stepNum;

    // Toggle panes
    document.querySelectorAll('.step-pane').forEach((pane, idx) => {
      if (idx + 1 === stepNum) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update step nav indicators
    document.querySelectorAll('.step-item').forEach((item, idx) => {
      const itemStep = idx + 1;
      item.classList.remove('active', 'completed');
      if (itemStep === stepNum) {
        item.classList.add('active');
      } else if (itemStep < stepNum) {
        item.classList.add('completed');
      }
    });

    // Scroll to wizard container on mobile
    const container = document.querySelector('.wizard-container');
    if (container && window.innerWidth < 768) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  },

  populateReviewSummary: function () {
    const desc = document.getElementById('wizard-desc-input').value;
    const loc = document.getElementById('wizard-locality-select').value;
    const ward = document.getElementById('wizard-ward-input').value;
    const landmark = document.getElementById('wizard-landmark-input').value;

    const catObj = window.JANSETU_DATA.categories.find(c => c.id === this.selectedCategory);
    const catName = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : this.selectedCategory;
    const dept = window.JanSetuService.getDepartmentForCategory(this.selectedCategory);

    const sumDesc = document.getElementById('rev-desc');
    const sumCat = document.getElementById('rev-cat');
    const sumDept = document.getElementById('rev-dept');
    const sumLoc = document.getElementById('rev-loc');
    const sumEvidence = document.getElementById('rev-evidence');

    if (sumDesc) sumDesc.textContent = desc;
    if (sumCat) sumCat.textContent = catName;
    if (sumDept) sumDept.textContent = dept;
    if (sumLoc) sumLoc.textContent = `${loc} ${ward ? '(' + ward + ')' : ''} ${landmark ? '· ' + landmark : ''}`;
    if (sumEvidence) {
      sumEvidence.textContent = this.uploadedPhotoPreview ? 'Photo evidence attached' : 'None attached';
    }
  },

  handleFinalSubmission: function () {
    const confirmCheck = document.getElementById('wizard-confirm-check');
    if (confirmCheck && !confirmCheck.checked) {
      alert('Please check the confirmation box to proceed with the demo request.');
      return;
    }

    const desc = document.getElementById('wizard-desc-input').value;
    const loc = document.getElementById('wizard-locality-select').value;
    const ward = document.getElementById('wizard-ward-input').value;
    const landmark = document.getElementById('wizard-landmark-input').value;

    try {
      const createdRecord = window.JanSetuService.createComplaint({
        description: desc,
        category: this.selectedCategory,
        locality: loc,
        ward: ward,
        landmark: landmark,
        evidenceUrl: this.uploadedPhotoPreview || '',
        priority: 'medium'
      });

      this.showSuccessView(createdRecord);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Error creating complaint: ' + err.message);
    }
  },

  showSuccessView: function (record) {
    const wizardBox = document.getElementById('wizard-form-box');
    const successBox = document.getElementById('wizard-success-box');

    if (wizardBox && successBox) {
      wizardBox.style.display = 'none';
      successBox.style.display = 'block';

      const trackingEl = document.getElementById('success-tracking-id');
      if (trackingEl) trackingEl.textContent = record.id;

      const trackBtn = document.getElementById('success-track-btn');
      if (trackBtn) {
        trackBtn.href = `tracking.html?id=${encodeURIComponent(record.id)}`;
      }

      successBox.scrollIntoView({ behavior: 'smooth' });

      if (window.JanSetuNav) {
        window.JanSetuNav.showToast(`Demo Request ${record.id} created successfully!`, 'success');
      }
    }
  },

  /**
   * Bind AI Assistant Chat interaction
   */
  bindAssistantChat: function () {
    const sendBtn = document.getElementById('assistant-send-btn');
    const chatInput = document.getElementById('assistant-chat-input');
    const chatWindow = document.getElementById('assistant-chat-window');
    const micBtn = document.getElementById('assistant-mic-btn');

    if (!sendBtn || !chatInput || !chatWindow) return;

    const appendMessage = (sender, text, actions = null) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg chat-msg-${sender} animate-fade-in`;

      const avatar = sender === 'bot' ? 'JS' : 'You';
      let contentHtml = `
        <div class="chat-avatar chat-avatar-${sender}">${avatar}</div>
        <div>
          <div class="chat-bubble">${window.JanSetuValidation.escapeHtml(text)}</div>
      `;

      if (actions) {
        contentHtml += `<div class="chat-action-box">${actions}</div>`;
      }
      contentHtml += '</div>';

      msgDiv.innerHTML = contentHtml;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const handleSend = () => {
      const query = chatInput.value.trim();
      if (!query) return;

      appendMessage('user', query);
      chatInput.value = '';

      // Append typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg chat-msg-bot';
      typingDiv.id = 'chat-typing-indicator';
      typingDiv.innerHTML = `
        <div class="chat-avatar chat-avatar-bot">JS</div>
        <div class="chat-bubble">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      `;
      chatWindow.appendChild(typingDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      window.JanSetuAI.processQuery(query, (response) => {
        const ind = document.getElementById('chat-typing-indicator');
        if (ind) ind.remove();

        let actionHtml = '';
        if (response.category) {
          if (response.redirectUrl) {
            actionHtml = `<a href="${response.redirectUrl}" class="btn btn-sm btn-primary">${response.actionText}</a>`;
          } else {
            actionHtml = `<button type="button" class="btn btn-sm btn-primary" onclick="JanSetuApp.prefillAndOpenWizard('${response.category}', '${encodeURIComponent(query)}')">${response.actionText}</button>`;
          }
        }

        appendMessage('bot', response.text, actionHtml);
      });
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });

    // Prompt chips
    document.querySelectorAll('[data-prompt]').forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.getAttribute('data-prompt');
        handleSend();
      });
    });

    // Voice input
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (micBtn.classList.contains('mic-active')) {
          if (this.activeSpeechRecognition) {
            this.activeSpeechRecognition.stop();
          }
          micBtn.classList.remove('mic-active');
          return;
        }

        micBtn.classList.add('mic-active');
        if (window.JanSetuNav) {
          window.JanSetuNav.showToast(window.JanSetuI18n.t('micListening'), 'info');
        }

        this.activeSpeechRecognition = window.JanSetuAI.startVoiceInput(
          (transcript) => {
            chatInput.value = transcript;
            micBtn.classList.remove('mic-active');
            handleSend();
          },
          (error) => {
            micBtn.classList.remove('mic-active');
            if (window.JanSetuNav) {
              window.JanSetuNav.showToast(window.JanSetuI18n.t('micError'), 'error');
            }
          },
          () => {
            micBtn.classList.remove('mic-active');
          }
        );
      });
    }
  },

  prefillAndOpenWizard: function (category, encodedQuery) {
    const wizardForm = document.getElementById('citizen-complaint-form');
    if (!wizardForm) return;

    const query = decodeURIComponent(encodedQuery);
    const descInput = document.getElementById('wizard-desc-input');
    const catSelect = document.getElementById('wizard-category-select');

    if (descInput) descInput.value = query;
    if (catSelect) {
      catSelect.value = category;
      this.selectedCategory = category;
      this.updateDepartmentSuggestion();
    }

    const wizardContainer = document.querySelector('.wizard-container');
    if (wizardContainer) {
      wizardContainer.scrollIntoView({ behavior: 'smooth' });
    }
  },

  bindCategoryShortcuts: function () {
    document.querySelectorAll('[data-cat-shortcut]').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-cat-shortcut');
        const catSelect = document.getElementById('wizard-category-select');
        if (catSelect) {
          catSelect.value = cat;
          this.selectedCategory = cat;
          this.updateDepartmentSuggestion();
        }
        const wizardContainer = document.querySelector('.wizard-container');
        if (wizardContainer) {
          wizardContainer.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  renderRecentComplaints: function () {
    const container = document.getElementById('citizen-recent-complaints');
    if (!container) return;

    const complaints = window.JanSetuStorage.getComplaints();
    const t = window.JanSetuI18n.t.bind(window.JanSetuI18n);
    const escape = window.JanSetuValidation.escapeHtml;

    if (complaints.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <img src="assets/images/empty-state.svg" alt="Empty" class="empty-state-icon" />
          <div class="empty-state-title">${t('noComplaintsFound')}</div>
        </div>
      `;
      return;
    }

    let html = '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">';
    complaints.slice(0, 4).forEach(c => {
      const catObj = window.JANSETU_DATA.categories.find(cat => cat.id === c.category);
      const catName = catObj ? (window.JanSetuI18n.getLanguage() === 'hi' ? catObj.nameHi : catObj.nameEn) : c.category;
      const statusLabel = t(`status_${c.status.replace('-', '_')}`);
      const dateStr = window.JanSetuValidation.formatDateTime(c.submittedAt);
      const shortDesc = c.description.length > 70 ? `${c.description.substring(0, 70)}...` : c.description;

      html += `
        <div class="card">
          <div class="card-header" style="padding:1rem 1.25rem;">
            <span style="font-family:var(--font-mono); font-size:var(--text-xs); font-weight:700; color:var(--color-primary-navy);">${escape(c.id)}</span>
            <span class="status-indicator status-${c.status}">${statusLabel}</span>
          </div>
          <div class="card-body" style="padding:1.25rem;">
            <div style="font-size:var(--text-xs); color:var(--color-text-secondary); margin-bottom:0.35rem;">
              <strong>${escape(catName)}</strong> · ${escape(c.locality)}
            </div>
            <p style="font-size:var(--text-sm); color:var(--color-text-primary); line-height:1.4; margin-bottom:0.75rem;">
              ${escape(shortDesc)}
            </p>
            <div style="font-size:var(--text-xs); color:var(--color-text-muted);">
              Submitted: ${dateStr}
            </div>
          </div>
          <div class="card-footer" style="padding:0.75rem 1.25rem;">
            <a href="tracking.html?id=${encodeURIComponent(c.id)}" class="btn btn-sm btn-outline" style="width:100%;">
              ${t('viewAllTrack')}
            </a>
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  },

  updateWizardLabels: function () {
    this.updateDepartmentSuggestion();
    const catSelect = document.getElementById('wizard-category-select');
    if (catSelect && window.JANSETU_DATA) {
      const currVal = catSelect.value;
      catSelect.innerHTML = '';
      window.JANSETU_DATA.categories.forEach(c => {
        const name = window.JanSetuI18n.getLanguage() === 'hi' ? c.nameHi : c.nameEn;
        catSelect.innerHTML += `<option value="${c.id}" ${c.id === currVal ? 'selected' : ''}>${name}</option>`;
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  JanSetuApp.init();
});
