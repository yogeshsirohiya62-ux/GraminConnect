# 🌱 GraminConnect (ग्रामीण कनेक्ट)
### Modern Digital Agriculture & Rural Commercial Ecosystem Platform

**GraminConnect** is an enterprise-grade, micro-frontend agricultural platform designed for Indian farmers, traders, and rural communities. It brings real-time Mandi rates, AI-powered crop disease diagnosis, direct farmer-to-buyer crop marketplaces, tractor rentals, and government welfare subsidies directly into farmers' hands.

---

## 🌟 Key Features

- **🌾 Live Mandi Rates (National Agmarknet API)**: Real-time agricultural commodity prices from Open Government Data (`data.gov.in`) with 7-day visual price trend curves.
- **🎙️ Voice Search ("बोलकर खोजें")**: Web Speech API integration in Hindi & English for effortless hands-free crop rate discovery.
- **📊 Smart Crop Production & Profit Estimator**: Land-area based calculation of minimum, average, and bumper crop yield, straw byproduct revenue, and net profit with **1-Click Print/PDF Export**.
- **🩺 Kisan AI Crop Doctor**: Instant symptomatic diagnosis with chemical and organic treatments, spray timings, and **Hindi audio narration** (`Web Speech Synthesis`).
- **🌱 Smart Crop Matchmaker Wizard**: Recommends top 3 crops tailored to specific soil types, irrigation availability, season, and budget.
- **🛒 Kisan Bazar (Direct Marketplace)**: Direct farmer-to-buyer produce listing with 1-click WhatsApp and direct phone calling.
- **🚜 Farm Equipment & Tractor Rental Hub**: Local machinery sharing (tractors, laser land levelers, combine harvesters) on hourly/per-bigha rental rates.
- **🏛️ Government Schemes Portal**: Direct one-click application redirection to verified portals (**PM-KISAN, PMFBY Crop Insurance, PM-KUSUM Solar, Rajasthan Tarbandi**).
- **☀️ High-Contrast Outdoor Sunlight Mode**: Instant toggle for clear readability under direct bright sunlight in open fields.
- **🚨 24x7 Emergency Kisan Helpline**: Floating speed-dial for Toll-Free Kisan Call Center (1800-180-1551) and state agriculture control rooms.

---

## 🏗️ Architecture

```
GraminConnect/
├── backend/                      # Node.js Express REST API (Port 5000)
│   ├── controllers/              # Auth, Data, Marketplace & Equipment Controllers
│   ├── database/                 # MySQL Connection Pool & Schema (schema.sql)
│   ├── services/                 # data.gov.in Agmarknet API, Crop Doctor & Recommendation Engines
│   └── server.js
├── frontend-host/                # Webpack 5 Module Federation Host Shell (Port 3000)
│   └── src/components/           # Schemes, AI Doctor, Matchmaker, Marketplace, Rentals
└── frontend-remote-dashboard/    # Federated Remote Micro-Frontend (Port 3001)
    └── src/Dashboard.js          # Mandi Rates, SVG Sparklines, Voice Search & Live Weather
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MySQL**: (Optional, automatic fallback to high-speed in-memory store)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GraminConnect.git
   cd GraminConnect
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   *Runs on `http://localhost:5000`*

3. **Start Federated Remote Dashboard**:
   ```bash
   cd ../frontend-remote-dashboard
   npm install
   npm start
   ```
   *Runs on `http://localhost:3001`*

4. **Start Host Application Shell**:
   ```bash
   cd ../frontend-host
   npm install
   npm start
   ```
   *Runs on `http://localhost:3000`*

---

## 🗄️ Database Setup (MySQL Workbench)
Open MySQL Workbench and execute the [`backend/database/schema.sql`](backend/database/schema.sql) file to initialize relational tables:
- `farmers` (Farmer Profiles & Land Records)
- `traders` (Buyer & APMC Trader License Records)
- `marketplace_listings` (Direct Produce Listings)
- `equipment_rentals` (Machinery Rental Hub)
- `market_commodities` (Mandi Crop History)
- `schemes` & `scheme_applications` (Govt Welfare Subsidies)
- `forum_posts` & `forum_replies` (Kisan Chopal Q&A)

---

## 🛡️ License
Distributed under the MIT License.
