# 🏗️ KUTHE Real Estate Platform

![KUTHE Banner](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop)

### 🚀 Modern Corporate Presence & Internal Management System
A premium, high-performance real estate platform designed for **Arnold Kuthe Immobilienverwaltungs- GmbH**. This system combines a stunning public-facing corporate website with a secure, integrated CRM for internal asset management.

---

## ✨ Key Features

### 🏢 Corporate Website (Public)
- **Premium Light Theme:** A modern, minimalist aesthetic using the "White-Red-Black" corporate palette.
- **Bilingual Interface:** Full support for German (DE) and English (EN) with seamless switching.
- **Dynamic Property Portfolio:** Showcase of high-value Berlin assets (offices, factory yards, nursing homes) with real-time filtering.
- **Brand Alignment:** Integrated official logo and corporate identity across all UI components.

### 🔐 Internal Management (Private)
- **Role-Based Access Control (RBAC):** Secure login for administrators and managers.
- **CRM Dashboard:** Centralized platform to manage serviced properties, tenants, and internal records.
- **Asset Integrity:** Direct PostgreSQL integration via Prisma for high-performance data handling.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication:** [Auth.js v5](https://authjs.dev/)
- **Database:** [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)

---

## 🗺️ Roadmap (Upcoming Features)

- [ ] **Advanced CRM Analytics:** Real-time occupancy and financial charts.
- [ ] **Interactive Map Integration:** View properties across Berlin's districts.
- [ ] **Investment Calculators:** Professional tools for yield analysis and property valuation.
- [ ] **Enhanced Tenant Portal:** Dedicated space for tenant communication and service requests.

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- PostgreSQL instance

### 2. Installation
```bash
git clone git@github.com:MaksymDoroshenkoDCI/kuthe.de.git
cd kuthe.de
npm install
```

### 3. Environment Setup
Create a `.env` file with the following:
```env
DATABASE_URL="your_postgresql_url"
AUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Initialization
```bash
npx prisma db push
npm run seed
```

### 5. Running Localy
```bash
npm run dev
```

---

## 🏛️ Brand Identity
Managed by **Arnold Kuthe Immobilienverwaltungs- GmbH**.
*Continuity · Quality · Independence*

---
© 2024 MaksymDoroshenkoDCI / Arnold Kuthe.
