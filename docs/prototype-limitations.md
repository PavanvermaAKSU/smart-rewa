# JanSetu AI - Prototype Limitations & Architectural Boundaries

**Project:** JanSetu AI  
**Context:** iComputex TechFest 2026 (Smart Rewa 2030 Hackathon)  
**Team:** Team Vindhya Innovators | AKS University  

---

## 1. Executive Summary

This document establishes the honest technical boundaries of the JanSetu AI prototype. In civic technology, transparency is paramount. We explicitly distinguish between features **actively implemented in this frontend prototype** and capabilities that are **simulated or planned for future production phases**.

---

## 2. Implemented in the Frontend Prototype

The following capabilities are fully functional and demonstrable in the client-side application:

| Feature | Implementation Mechanism |
| :--- | :--- |
| **Bilingual Hindi/English Interface** | Centralized in-memory translation dictionary (`localization.js`) with instant DOM updates across all pages. |
| **Simulated AI Assistant** | Rule-based keyword matching and intent recognition in Hindi & English with simulated response latencies. |
| **Voice Input Capability** | Web Speech API integration (`SpeechRecognition`) with graceful error handling and fallback to text. |
| **Guided 4-Step Submission Wizard** | Client-side input validation, photo preview, GPS simulation, review summary, and collision-resistant ID generation (`JS-REWA-2026-XXXX`). |
| **Cross-Portal Data Persistence** | Unified browser `localStorage` model with `storage` event synchronization for real-time cross-tab updates. |
| **Demonstration Officer Queue** | Real-time calculations of grievance metrics, interactive multi-column filters, and full search. |
| **Workflow Status Management** | Officer assignment of departments, roles, priority, official remarks, and simulated audit history. |
| **Vertical Status Timeline** | Transparent tracking view rendering actual stored status history and latest remarks. |
| **Schematic Geographic Map** | Pure SVG interactive schematic of Rewa district tehsils with clickable complaint pins and detail cards. |
| **Data-Driven Visual Analytics** | Zero-dependency offline charts recalculating instantly on new submissions or status updates. |
| **Pristine Data Reset** | Guaranteed reset functionality restoring original seed demo records without corrupted state. |

---

## 3. Simulated or Future Capabilities

The following features are demonstrated conceptually or simulated, and would require backend cloud infrastructure and government authorizations in production:

### A. Machine Learning & Natural Language Processing
- **Current State:** Predefined rule-based intent recognition matching common keywords (पानी, सड़क, लाइट, कचरा, etc.).
- **Production Scope:** Integration with state-of-the-art multilingual LLMs (e.g. Gemini 2.5 Flash / Pro) fine-tuned on local Bagheli/Hindi dialects and administrative grievance taxonomies.
- **RAG Knowledge Base:** Production would query verified municipal ordinances, gazettes, and MP e-District service guarantees via a vector database.

### B. Security, Authentication & Role-Based Access Control (RBAC)
- **Current State:** A top-level demo role switcher (`Citizen`, `Officer`, `District Admin`) for hackathon judges.
- **Production Scope:** Secure OAuth2 / SAML authentication with government employee single sign-on (SSO), OTP-based citizen authentication (Aadhaar/Mobile), and granular cryptographic RBAC.

### C. Backend Persistence & Data Authority
- **Current State:** Browser-local `localStorage`. Data is local to the evaluator's browser and shared only across tabs of the same machine.
- **Production Scope:** Cloud-hosted relational database (PostgreSQL / Cloud SQL) with end-to-end encryption, automated backups, and transactional ACID guarantees.

### D. Official Government Integration
- **Current State:** Self-contained academic prototype with sample records.
- **Production Scope:** Integration with Madhya Pradesh CM Helpline (181), Samagra Portal APIs, Lok Seva Kendra backend, and municipal ERPs.

### E. Geographic Information System (GIS)
- **Current State:** Lightweight SVG schematic diagram of Rewa district boundaries and tehsils.
- **Production Scope:** Precision GIS integration with Google Maps Platform / Survey of India cadastral maps, live ward polygon geofencing, and GPS ground-verification.

### F. Notifications & Citizen Communication
- **Current State:** Instant UI updates and in-app toasts.
- **Production Scope:** Automated SMS gateways, WhatsApp Business API notifications, and IVR voice updates in Hindi.

---

## 4. Ethical & Academic Statement

Team Vindhya Innovators confirms that JanSetu AI makes **no claim** of official government endorsement, live police/magistrate integration, or legal grievance authority. It is designed to inspire district administrators with what modern civic technology can achieve when citizen accessibility and transparency are placed at the center.
