# PlasticScan Frontend: The Classification Bridge

This repository contains the high-performance, multilingual Next.js user interface for the **PlasticScan AI** ecosystem. It is engineered with a focus on low-latency data visualization, modular state management, and an enterprise-grade aesthetics system.

---

## 🎨 Design System: "3 Shades of Black"
The interface implements a custom dark theme optimized for high-contrast monitoring and reduced power consumption on classification nodes.
- **Glassmorphic Elements**: Cards and headers use high-quality `backdrop-blur` for a layered, premium feel.
- **Micro-Animations**: Framer Motion and standard CSS transitions provide a responsive, "alive" experience for all neural events.
- **Typography Engine**: Integrated with custom localized fonts for optimal readability in **Hindi**, **Marathi**, and **Urdu**.

---

## 🌎 Centralized Multilingual Engine (`lib/language-context.tsx`)
A massive part of the frontend is the **global translation provider**. It ensures 100% UI coverage across:
- **English**: Standard professional UI.
- **Hindi (हिंदी)**: Native support for all technical disposal terms.
- **Marathi (मराठी)**: Grammatically correct localized actions.
- **Urdu (اردو)**: Right-aligned text support for a premium localized experience.

**Key Logic**: The `useLanguage` hook and `t()` function allow any component on any page to fetch translations instantly, synchronized across the entire site.

---

## 🚀 Dashboard Architecture

### **1. Smart Vision Upload (`/dashboard/upload`)**
The entry point of the neural bridge. Features:
- **Neural Drop Zone**: Interactive drag-and-drop file interface with real-time feedback.
- **Sub-Second Feedback**: Instant response from the FastAPI backend classifying plastic types.
- **Localized Disposal Guide**: Regional disposal instructions generated via LLM, localized per the user's preference.

### **2. Neural Analytics (`/dashboard/analytics`)**
A data-driven decision center featuring:
- **Mean Precision Stats**: Monitoring classification accuracy and confidence thresholds.
- **Environmental Ledger**: Cumulative CO₂ savings visualizations.
- **Distribution Matrices**: Breakdown of waste types (PET, HDPE, etc.) processed by the local node.
- **Data Export**: Capability to export local classification datasets for regional auditing.

### **3. Classification Audit Log (`/dashboard/history`)**
A historical ledger of every classification event.
- **State-Aware Entries**: Displays plastic type, confidence score, and carbon avoided per scan.
- **Secure Persistence**: Fetches and lists local historical data from the SQLite backend.

### **4. Terminal Settings (`/dashboard/settings`)**
Comprehensive control over the user node:
- **Global Identity**: Manage profile photo and corporate role.
- **Security Node**: Implementation of **Two-Factor Authentication** state and **Logged Sessions** monitoring.
- **Interface Protocol**: Switch between **Light/Dark modes** and toggle **Compact UX Logic** for high-density monitors.
- **Digest Cycles**: Configure the synchronization frequency for local telemetry reports (Daily/Weekly).

---

## 🛠️ Technical Implementation

### **Core Stack**
- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS with custom design system variables.
- **Icons**: Lucide-React for clean, consistent UI glyphs.
- **Components**: Radix UI + Custom-built high-performance library.
- **Context API**: Custom React Contexts for **Authentication**, **Theme**, and **Translation**.

---

## ⚙️ How to Initialize

1. **Clone the repository.**
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment setup**: Ensure the `NEXT_PUBLIC_API_URL` is pointing to your backend node.
4. **Launch Dev Environment**:
   ```bash
   npm run dev
   ```
5. **Build for Production**:
   ```bash
   npm run build
   ```

---

*PlasticScan — Auditing the future of waste.*
