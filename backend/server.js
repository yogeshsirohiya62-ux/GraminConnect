const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Security Middlewares (OWASP Mitigations)
app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: true, // Allow dynamically matching request origin (localhost:3000, localhost:3001, etc.)
  credentials: true,
}));
app.use(express.json({ limit: '50kb' })); // DOS Mitigation

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300, // Limit each IP
  message: { message: 'Too many requests from this network, please retry later.' },
});
app.use('/api/', apiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GraminConnect Backend Service',
    architecture: 'Micro-Frontend Modular Architecture + MVC Pattern',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Initialize MySQL Relational Database Pool (with fallback to high-speed in-memory store)
const { initMySQL } = require('./database/mysqlDb');
initMySQL();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(` 🌱 GraminConnect REST API Server Running  `);
  console.log(` 🚀 Listening on: http://localhost:${PORT}  `);
  console.log(`===========================================`);
});
