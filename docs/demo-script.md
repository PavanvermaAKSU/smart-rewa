# JanSetu AI - Repeatable Hackathon Demonstration Script

**Event:** iComputex TechFest 2026 (Smart Rewa 2030)  
**Track:** AI for Digital Governance & Smart City  
**Team:** Team Vindhya Innovators | AKS University  
**Estimated Demo Time:** 3 - 5 Minutes  

---

## Preparation
- Open the application at the home landing page: `index.html` or `http://localhost:3000/`.
- Ensure language is set to Hindi or English based on judge preference (toggle button in header).
- If needed, click **"Reset Demo Data"** in the top banner to start with pristine sample records.

---

## 13-Step Judging Walkthrough

### Step 1: Open the Citizen Portal
- From the landing page or the top demo role bar, click **"Citizen Portal"** (or `citizen.html`).
- **Showcase:** Clean, accessible civic layout with Devanagari Hindi support and 3 primary actions.

### Step 2: Test the Simulated AI Assistant
- In the Assistant card, click the prompt chip: *"मेरे मोहल्ले में तीन दिन से पानी नहीं आ रहा है।"*
- Click **"विश्लेषण करें (Ask / Analyze)"**.
- **Showcase:** Typing indicator simulation, rule-based detection recognizing **Water Supply (जल आपूर्ति)**, and suggestion of **Municipal Corporation Rewa (Jal Vibhag)**.

### Step 3: Launch Guided Submission
- Click the assistant's action button: **"जल आपूर्ति शिकायत दर्ज करें (Start Water Complaint)"**.
- Notice how the form smoothly scrolls into view and prefills Step 1!

### Step 4: Step 2 - Verify Category
- Click **"अगले चरण पर जाएं (Continue)"**.
- Show that the category is automatically set to **Water Supply**, and explain that citizens can freely change it if needed.

### Step 5: Step 3 - Location Entry (No Mandatory GPS)
- Click **"अगले चरण पर जाएं"**.
- Select locality: **Bodabag, Rewa**.
- Enter Ward: `Ward 14` and Landmark: `Near Primary School`.
- Click **"मेरा स्थान पहचानें (डेमो जीपीएस)"** to demonstrate optional simulated location detection.

### Step 6: Step 4 - Review and Confirm
- Click **"समीक्षा पर जाएं"**.
- Review the complete summary table.
- Point out the honest prototype disclosure notice in the red banner.
- Check the confirmation box and click **"पुष्टि करें और डेमो अनुरोध दर्ज करें (Confirm & Submit)"**.

### Step 7: Note the Generated Tracking ID
- The animated **Submission Success Screen** appears!
- Note the generated collision-resistant ID (e.g. `JS-REWA-2026-1006`).

### Step 8: Switch to Government Officer Portal
- In the top role bar, click **"Officer"** (or `officer.html`).
- **Showcase:** The officer interface is a completely distinct operational desk.
- Point out that the newly submitted complaint (`JS-REWA-2026-1006`) immediately appears at the top of the queue with status **"Submitted"**!
- Point out that **"Total Requests"** and **"Pending Review"** have dynamically updated.

### Step 9: Officer Review & Action
- Click **"Review & Action"** next to `JS-REWA-2026-1006`.
- The modal opens displaying the citizen's complaint details and previous audit history.
- Change Status to: **"Action in Progress (कार्यवाही जारी)"**.
- Assign Department: **"Municipal Corporation Rewa - Jal Vibhag"**.
- Assign Role: **"Assistant Engineer - Water Works"**.
- Enter Official Remark:  
  *"पाइपलाइन लीकेज स्थल चिन्हित। सुधार दल स्पेयर पाइप स्लीव के साथ रवाना। (Pipeline leak isolated. Repair crew dispatched with sleeves.)"*
- Click **"Save & Update Workflow"**.
- A confirmation toast appears and the table updates in real time.

### Step 10: Citizen Tracking Verification
- In the top navigation, click **"Track Complaint"** (or `tracking.html`).
- Notice the search bar prefilled, or enter `JS-REWA-2026-1006` and click **"स्थिति देखें (Track)"**.

### Step 11: Inspect Live Updated Timeline
- **Showcase to judges:**
  - Status indicator now reflects **"Action in Progress"**.
  - Department is now listed as **"Municipal Corporation Rewa - Jal Vibhag"**.
  - Officer Remark shows the exact text entered by the officer in Step 9!
  - The vertical timeline highlights stages 1, 2, 3, and 4 in active state, with zero hardcoding.

### Step 12: Open District Administration Dashboard
- In the top role bar, click **"District Admin"** (or `administration.html`).
- **Showcase:** Executive leadership view designed for the District Collector and Department heads.

### Step 13: Review Spatial Map & Data-Driven Analytics
- Scroll to the **Geographic Problem Map**:
  - Show the schematic map of Rewa district tehsils (Huzur, Sirmour, Mangawan, etc.).
  - Click the **"W"** pin on Bodabag to see the popup detail showing our active water complaint.
- Show the **Category Distribution Bar Chart**: Water supply count reflects our addition.
- Show the **Department Workload Chart** and the **SLA Compliance Meter**.

---

## Concluding Statement to Judges
> *"JanSetu AI proves that with thoughtful UX, local language respect, and transparent status tracking, digital governance can transition from a frustrating bureaucratic hurdle into an empowering civic bridge for every citizen of Rewa."*
