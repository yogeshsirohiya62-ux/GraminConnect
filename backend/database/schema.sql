-- =========================================================================
-- GraminConnect - Production Relational Database Schema
-- Database: MySQL 8.0+ / MySQL Workbench Compatible
-- Architecture: Two-Sided Rural Ecosystem (Farmers & Traders Separation)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS gramin_connect_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE gramin_connect_db;

-- -------------------------------------------------------------------------
-- 1. Table: farmers (Kisano Ka Panjikaran & Vivaran)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS farmers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) DEFAULT 'Jaipur',
    state VARCHAR(100) DEFAULT 'Rajasthan',
    land_area_bigha DECIMAL(6, 2) DEFAULT 2.00,
    khasra_no VARCHAR(50) DEFAULT '142/9',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 2. Table: traders (Vyapari / Mandi Aadhatiyon Ka Panjikaran)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS traders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    firm_name VARCHAR(150) NOT NULL,
    mandi_name VARCHAR(100) NOT NULL,
    mandi_license_no VARCHAR(50) DEFAULT 'RAJ-APMC-2026',
    gst_no VARCHAR(50) DEFAULT '08AAAAA0000A1Z5',
    district VARCHAR(100) DEFAULT 'Jaipur',
    state VARCHAR(100) DEFAULT 'Rajasthan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 3. Table: market_commodities (Mandi Fasal Bhav & Utpadan)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS market_commodities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commodity_code VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    category ENUM('Grains', 'Oilseeds', 'Pulses', 'Cash Crops') NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    min_price DECIMAL(10, 2) NOT NULL,
    max_price DECIMAL(10, 2) NOT NULL,
    trend_direction ENUM('up', 'down', 'stable') DEFAULT 'stable',
    trend_percentage VARCHAR(10) DEFAULT '0.0%',
    location VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT 'Rajasthan',
    avg_yield_per_bigha DECIMAL(6, 2) DEFAULT 10.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 4. Table: schemes (Sarkari Welfare Yojnayein)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    benefit_amount_text VARCHAR(255) NOT NULL,
    eligibility_criteria TEXT NOT NULL,
    department VARCHAR(150) NOT NULL,
    official_portal_url VARCHAR(255) NOT NULL,
    deadline_text VARCHAR(100) DEFAULT 'Ongoing',
    status ENUM('Active', 'Expired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 5. Table: scheme_applications (Kisano Ke Dwara Kiye Gaye Aavedan)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_no VARCHAR(50) UNIQUE NOT NULL,
    farmer_id INT,
    scheme_id INT NOT NULL,
    farmer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    village VARCHAR(100) NOT NULL,
    land_khasra VARCHAR(100),
    aadhaar_no VARCHAR(20),
    status ENUM('Under Review', 'Approved', 'Disbursed', 'Rejected') DEFAULT 'Under Review',
    remarks TEXT,
    applied_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 6. Table: forum_posts (Kisan Chopal Sawal & Posts)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS forum_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'Crop Health',
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 7. Table: marketplace_listings (Kisan Bazar Fasal Bikri)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_name VARCHAR(100) NOT NULL,
    crop VARCHAR(100) NOT NULL,
    variety VARCHAR(100) DEFAULT 'Standard',
    quantity_quintals DECIMAL(10, 2) NOT NULL,
    expected_price_per_q DECIMAL(10, 2) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    description TEXT,
    status ENUM('Available', 'Sold', 'Reserved') DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 8. Table: equipment_rentals (Krishi Yantra Kiraya)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS equipment_rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(150) NOT NULL,
    category VARCHAR(50) DEFAULT 'Tractors',
    rate_per_hour DECIMAL(8, 2) DEFAULT 0.00,
    rate_per_bigha DECIMAL(8, 2) DEFAULT 0.00,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    description TEXT,
    status ENUM('Available', 'Rented', 'Maintenance') DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================================
-- INITIAL SEED DATA (Sampoorna Data Pre-Fill)
-- =========================================================================

-- 1. Insert Initial Farmers
INSERT INTO farmers (id, name, phone, password_hash, village, district, land_area_bigha) VALUES
(1, 'Ram Singh (किसान)', '9876543210', '123456', 'Gurha Barsal', 'Jaipur', 4.5),
(2, 'Kailash Meena (किसान)', '9876543212', '123456', 'Sambhar', 'Jaipur', 3.0)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Initial Traders
INSERT INTO traders (id, name, phone, password_hash, firm_name, mandi_name, district) VALUES
(1, 'Suresh Sharma (आढ़ती)', '9876543211', '123456', 'Shree Ram Trading Co.', 'Jaipur Central Mandi', 'Jaipur'),
(2, 'Mukesh Agrawal (व्यापारी)', '9876543213', '123456', 'Agrawal Grain Traders', 'Kota Bhamashah Mandi', 'Kota')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Insert Major Mandi Crops
INSERT INTO market_commodities 
(commodity_code, name_en, name_hi, category, current_price, min_price, max_price, trend_direction, trend_percentage, location, district, avg_yield_per_bigha) VALUES
('WHEAT01', 'Wheat (गेहूं - Sharbati)', 'गेहूं (Sharbati Wheat)', 'Grains', 2480.00, 2350.00, 2620.00, 'up', '+1.2%', 'Jaipur Central Mandi', 'Jaipur', 12.0),
('MUSTARD01', 'Mustard (सरसों - Black 42% Oil)', 'सरसों (Mustard 42% Oil)', 'Oilseeds', 5720.00, 5580.00, 5850.00, 'up', '+1.8%', 'Bharatpur Mandi', 'Bharatpur', 7.5),
('JEERA01', 'Cumin Seed / Jeera (जीरा)', 'जीरा (Cumin Seed)', 'Cash Crops', 24500.00, 23800.00, 25200.00, 'up', '+3.5%', 'Unjha / Jodhpur Mandi', 'Jodhpur', 2.8),
('CHANA01', 'Chickpeas / Desi Chana (चना)', 'देसी चना (Gram)', 'Pulses', 6150.00, 5950.00, 6300.00, 'up', '+0.8%', 'Bikaner Mandi', 'Bikaner', 6.0),
('GARLIC01', 'Garlic / Lahsun (लहसुन - Ooty)', 'लहसुन (Garlic)', 'Cash Crops', 16500.00, 15200.00, 17800.00, 'up', '+6.2%', 'Kota Mandi', 'Kota', 15.0)
ON DUPLICATE KEY UPDATE current_price=VALUES(current_price);

-- 4. Insert Welfare Schemes
INSERT INTO schemes 
(scheme_code, name, category, benefit_amount_text, eligibility_criteria, department, official_portal_url) VALUES
('PMKISAN', 'PM Kisan Samman Nidhi', 'Direct Income Support', '₹6,000 per year in 3 equal installments', 'All small & marginal landholder farmer families', 'Ministry of Agriculture', 'https://pmkisan.gov.in/RegistrationFormNew.aspx'),
('PMFBY', 'Pradhan Mantri Fasal Bima Yojana', 'Crop Insurance', 'Comprehensive risk coverage against crop loss', 'All farmers growing notified crops', 'Department of Agriculture', 'https://pmfby.gov.in/farmerRegistrationForm'),
('KUSUM', 'PM-KUSUM Solar Agriculture Pump', 'Solar Subsidy', 'Up to 60% government subsidy on solar pumps', 'Individual farmers & cooperatives', 'MNRE & RajKisan', 'https://rajkisan.rajasthan.gov.in/')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 5. Insert Sample Kisan Marketplace Listings
INSERT INTO marketplace_listings 
(farmer_name, crop, variety, quantity_quintals, expected_price_per_q, village, district, phone, description) VALUES
('Ram Singh', 'Wheat (गेहूं - Sharbati)', 'Sharbati Organic Grade', 120.00, 2550.00, 'Gurha Barsal', 'Jaipur', '9876543210', 'Cleaned, graded, and moisture-tested Sharbati wheat directly from farm.'),
('Kailash Meena', 'Mustard (सरसों - 42% Oil)', 'Pusa Bold High Oil', 65.00, 5800.00, 'Sambhar Lake Region', 'Jaipur', '9876543212', 'High oil percentage bold black mustard seed harvest.');
