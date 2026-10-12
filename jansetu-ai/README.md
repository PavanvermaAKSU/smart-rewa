# JanSetu AI (जनसेतु AI)
### AI-Powered Digital Governance and Workflow Automation Platform for Rewa District, Madhya Pradesh, India

**Hackathon:** iComputex TechFest 2026 | Smart Rewa 2030: AI for Healthcare, Governance & Smart City Development  
**Team:** Team Vindhya Innovators  
**Institution:** AKS University  

---

## 1. Project Overview

**JanSetu AI** is a digital governance and public-service workflow prototype designed specifically for **Rewa District, Madhya Pradesh**. It empowers rural and urban citizens to describe grievances in simple Hindi or English via voice or text, automatically triages and categorizes requests, routes them to designated departmental officer queues, and provides a transparent, trackable status timeline.

### Core Tagline
> *"From Citizen Requests to Government Action: Digitally, Intelligently, Transparently."*  
> *"आपकी समस्या, आपकी आवाज़। समाधान का पारदर्शी मार्ग।"*

---

## 2. Problem Being Addressed

1. **Digital Literacy & Language Barriers:** Rural and semi-urban citizens in Rewa often struggle with complex bureaucratic portals that require technical terminology and English-only forms.
2. **Opaque Grievance Status:** After filing a complaint, citizens frequently have no visibility into which officer or team is handling their issue, causing repetitive follow-ups and lack of trust.
3. **Departmental Silos:** Complaints often get delayed between municipal departments (Nagar Nigam Rewa, PHE, PWD, MPPKVVCL) without clear ownership.
4. **Lack of District-Level Geographic Visibility:** District administrations lack localized spatial views of recurring hotspots (e.g., persistent pipeline damage in Bodabag vs. road potholes at Saman Tiraha).

---

## 3. Main User Roles

1. **Citizen Portal (`citizen.html`):**
   - Hindi-first accessible interface.
   - Voice or text problem input with simulated AI assistant.
   - 4-step guided grievance submission wizard with category confirmation and locality selector.
   - Generation of a collision-resistant tracking identifier (e.g. `JS-REWA-2026-1006`).
   - Recent complaints history and direct tracking shortcuts.

2. **Government Officer Portal (`officer.html`):**
   - Simulated administrative desk for zonal and departmental officers.
   - Real-time calculated grievance metrics (Total, Pending, In Progress, Resolved, Overdue SLA).
   - Filterable queue by category, locality, status, and keywords.
   - Action modal: Assign departments, delegate to officer roles, change statuses, and log official inspection remarks.
   - Simulated audit trail recording status transitions and actors.

3. **District Administration Dashboard (`administration.html`):**
   - Executive dashboard for District Magistrate / Municipal Commissioner oversight.
   - Interactive schematic geographic problem map of Rewa District tehsils with clickable hotspots.
   - Dynamic zero-dependency analytics: Category distribution, top affected localities, and departmental workloads.
   - Simulated SLA compliance indicators.

4. **Public Landing & Information Hub (`index.html`, `services.html`, `tracking.html`):**
   - Public introduction with end-to-end civic journey.
   - Citizen guidance for MP e-District services (Income Certificate, Domicile, Water taps).
   - Permanent complaint tracking timeline by tracking ID.

---

## 4. Technology Stack

- **Markup & Layout:** Semantic HTML5, accessible ARIA attributes, responsive layout grids.
- **Styling:** Modular CSS3 with custom design tokens (`variables.css`, `global.css`, `components.css`, `responsive.css`).
- **Logic:** Clean, modular Vanilla JavaScript (ES2022). Zero heavy frontend frameworks.
- **Data Persistence:** Browser `localStorage` with cross-tab event synchronization (`storage` event) and safe JSON validation.
- **Asset Formats:** Custom lightweight SVGs for logos, illustrations, schematic district maps, and status charts. Works 100% offline.

---

## 5. Folder Structure

```
jansetu-ai/
├── index.html                   # Public landing page & demo entry
├── citizen.html                 # Citizen portal & 4-step submission wizard
├── officer.html                 # Government officer grievance desk & action modal
├── administration.html          # District administration analytics & schematic map
├── services.html                # Government services guidance & FAQs
├── tracking.html                # Complaint tracking page with vertical timeline
├── README.md                    # Project documentation
├── assets/
│   └── images/
│       ├── logo.svg             # JanSetu AI civic emblem
│       ├── hero-illustration.svg# Civic-tech workflow illustration
│       └── empty-state.svg      # Search empty state illustration
├── css/
│   ├── reset.css                # CSS reset
│   ├── variables.css            # Civic color tokens and design system variables
│   ├── global.css               # Global typography, banners, headers, footers
│   ├── components.css           # Buttons, cards, form controls, modals, toasts
│   ├── animations.css           # Subtle keyframe transitions and reduced-motion
│   ├── responsive.css           # Mobile & tablet layout rules (360px - 1440px)
│   ├── citizen.css              # Citizen portal & assistant styling
│   ├── officer.css              # Officer queue & detail modal layout
│   └── administration.css       # District administration dashboard & map layout
├── js/
│   ├── data.js                  # Seed complaints, Rewa localities, and categories
│   ├── storage.js               # LocalStorage wrapper & cross-tab sync
│   ├── validation.js            # Input validation & XSS escaping
│   ├── localization.js          # Centralized Hindi/English dictionary & switcher
│   ├── complaint-service.js     # ID generation, triaging, and status updates
│   ├── ai-simulator.js          # Rule-based simulated assistant & voice support
│   ├── navigation.js            # Header, mobile menu, toast notifications
│   ├── accessibility.js         # Focus trap, keyboard escape, ARIA announcer
│   ├── tracking.js              # Tracking page timeline renderer
│   ├── officer.js               # Officer portal controller
│   ├── analytics.js             # District metrics & workload aggregations
│   ├── map.js                   # Interactive schematic map of Rewa tehsils
│   ├── charts.js                # Zero-dependency offline charts
│   └── app.js                   # Main application coordinator
└── docs/
    ├── prototype-limitations.md # Explicit boundaries of this frontend demo
    └── demo-script.md           # 13-step hackathon judging script
```

---

## 6. How to Run the Project

### Option A: Local Dev Server (Vite)
1. In the project directory, run:
   ```bash
   npm run dev
   ```
2. Open your browser at `http://localhost:3000/`.

### Option B: Direct Static Browser Opening
Since JanSetu AI is implemented purely in HTML5, CSS3, and Vanilla JavaScript with relative paths and zero external runtime dependencies:
- Simply double-click `index.html` or open it in any modern web browser.
- Alternatively, serve it via Python:
  ```bash
  python3 -m http.server 3000
  ```

---

## 7. Demo Role Selection

A prominent **Demo Role Switcher** is provided at the top of every page:
- **Citizen:** Direct access to `citizen.html`
- **Officer:** Direct access to `officer.html`
- **District Admin:** Direct access to `administration.html`

*Note: This role switcher is for prototype evaluation and demonstration purposes. No real security or authentication is implied.*

---

## 8. Main Demonstration Workflow

1. Open **Citizen Portal** (`citizen.html`).
2. Type or select a problem in Hindi: *"मेरे मोहल्ले में तीन दिन से पानी नहीं आ रहा है।"*
3. The AI Assistant categorizes it as **Water Supply (जल आपूर्ति)** and suggests **Municipal Corporation Rewa (Jal Vibhag)**.
4. Click **"Start Water Complaint"** to populate the 4-step submission wizard.
5. Confirm category and select locality (e.g. *Bodabag, Rewa*).
6. Review the summary and click **Confirm & Submit Demo Request**.
7. Note down the generated tracking ID (e.g. `JS-REWA-2026-1006`).
8. Switch to **Officer Portal** (`officer.html`).
9. Locate the complaint in the queue and click **Review & Action**.
10. Update the status to **"Action in Progress"**, assign to **Assistant Engineer**, and enter a remark: *"Repair team dispatched with joint sleeves."*
11. Click **Save Update**.
12. Navigate to **Track Complaint** (`tracking.html`) or search for `JS-REWA-2026-1006`.
13. Observe the live updated status timeline with the officer's remark!
14. Switch to **District Administration** (`administration.html`) to see the updated volume and map hotspot.

---

## 9. Demonstration Data & Persistence

- **Initial Seed Data:** Includes realistic grievances for Rewa locations (Bodabag, Saman Tiraha, Civil Lines, Dhobia Tanki, Bichhiya).
- **Persistence:** Uses browser `localStorage` (`jansetu_demo_complaints`).
- **Reset Button:** A clearly marked **"Reset Demo Data"** button in the header banner instantly restores the initial sample state at any time.

---

## 10. Important Disclaimers & Official Boundaries

- **Not an Official Government Portal:** JanSetu AI is an academic prototype developed by students of AKS University for the iComputex TechFest 2026 Hackathon.
- **Sample Data Only:** All complaints, phone numbers, and statistics are fictional demonstrations.
- **No Official Government Integration:** The prototype does not connect to live government databases, MP CM Helpline, or payment gateways.
