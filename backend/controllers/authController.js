const jwt = require('jsonwebtoken');
const mockDb = require('../database/mockDb');
const { query, isMySQLConnected } = require('../database/mysqlDb');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey_for_demo_only';

exports.register = async (req, res) => {
  try {
    const { username, password, name, role = 'farmer', village, district = 'Jaipur', state = 'Rajasthan', phone, businessName, landArea } = req.body;
    
    if (!username || !password || !name) {
      return res.status(400).json({ message: 'Username, password and name are required' });
    }

    const contactPhone = phone || username;
    let userId = String(Date.now());

    // 1. If MySQL is connected, store in respective 'farmers' or 'traders' table
    if (isMySQLConnected()) {
      try {
        if (role === 'farmer') {
          const existing = await query('SELECT * FROM farmers WHERE phone = ? LIMIT 1', [contactPhone]);
          if (existing && existing.length > 0) {
            return res.status(400).json({ message: 'Farmer mobile number already registered in MySQL' });
          }

          const insertRes = await query(
            'INSERT INTO farmers (name, phone, password_hash, village, district, state, land_area_bigha) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, contactPhone, password, village || 'Gurha Barsal', district, state, Number(landArea) || 2.0]
          );
          userId = String(insertRes.insertId);
          console.log(`🐬 [MySQL] New Farmer Inserted: ID ${userId}, Name: ${name}`);
        } else {
          // Trader Registration
          const existing = await query('SELECT * FROM traders WHERE phone = ? LIMIT 1', [contactPhone]);
          if (existing && existing.length > 0) {
            return res.status(400).json({ message: 'Trader mobile number already registered in MySQL' });
          }

          const insertRes = await query(
            'INSERT INTO traders (name, phone, password_hash, firm_name, mandi_name, district, state) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, contactPhone, password, businessName || `${name} Trading Co.`, village || 'Jaipur Mandi', district, state]
          );
          userId = String(insertRes.insertId);
          console.log(`🐬 [MySQL] New Trader Inserted: ID ${userId}, Firm: ${businessName || name}`);
        }
      } catch (sqlErr) {
        console.warn('MySQL role insert fallback to memory:', sqlErr.message);
      }
    }

    // 2. Also keep in-memory store in sync
    const newUser = {
      id: userId,
      username: contactPhone,
      name,
      role,
      village: village || (role === 'farmer' ? 'Gurha Barsal' : 'Jaipur Mandi'),
      district,
      state,
      phone: contactPhone,
      password,
      businessName: businessName || ''
    };

    if (!mockDb.users) mockDb.users = [];
    mockDb.users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const { password: _, ...userSafe } = newUser;
    return res.status(201).json({
      message: `${role === 'farmer' ? 'Farmer' : 'Trader'} Registration Successful & Saved!`,
      token,
      user: userSafe
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUser = (username || '').trim();

    // 1. Check in MySQL 'farmers' table and 'traders' table
    if (isMySQLConnected()) {
      try {
        // Check Farmer Table
        const sqlFarmers = await query(
          'SELECT * FROM farmers WHERE phone = ? AND password_hash = ? LIMIT 1',
          [cleanUser, password]
        );
        if (sqlFarmers && sqlFarmers.length > 0) {
          const f = sqlFarmers[0];
          const token = jwt.sign(
            { id: String(f.id), username: f.phone, role: 'farmer', name: f.name },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
          const { password_hash: _, ...safeFarmer } = f;
          return res.status(200).json({
            message: 'Farmer login successful from MySQL (farmers table)!',
            token,
            user: { ...safeFarmer, username: f.phone, role: 'farmer' }
          });
        }

        // Check Trader Table
        const sqlTraders = await query(
          'SELECT * FROM traders WHERE phone = ? AND password_hash = ? LIMIT 1',
          [cleanUser, password]
        );
        if (sqlTraders && sqlTraders.length > 0) {
          const t = sqlTraders[0];
          const token = jwt.sign(
            { id: String(t.id), username: t.phone, role: 'trader', name: t.name },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
          const { password_hash: _, ...safeTrader } = t;
          return res.status(200).json({
            message: 'Trader login successful from MySQL (traders table)!',
            token,
            user: { ...safeTrader, username: t.phone, role: 'trader', village: t.mandi_name }
          });
        }
      } catch (sqlErr) {
        console.warn("MySQL role-based login check fallback:", sqlErr.message);
      }
    }

    // 2. Check in memory store
    const user = (mockDb.users || []).find(
      u => (u.username.toLowerCase() === cleanUser.toLowerCase() || u.phone === cleanUser) && u.password === password
    );

    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
      const { password: _, ...userSafe } = user;
      return res.status(200).json({
        message: `${user.role === 'farmer' ? 'Farmer' : 'Trader'} Login successful!`,
        token,
        user: userSafe
      });
    }

    // Quick demo login fallback for farmer & trader
    if (cleanUser === 'farmer' || cleanUser === 'kisan') {
      const demoFarmer = { id: '1', name: 'Ram Singh (किसान)', role: 'farmer', village: 'Gurha Barsal', district: 'Jaipur', phone: '9876543210' };
      const token = jwt.sign({ id: '1', username: '9876543210', role: 'farmer', name: demoFarmer.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ message: 'Farmer Demo Login successful!', token, user: demoFarmer });
    }

    if (cleanUser === 'trader' || cleanUser === 'vyapari') {
      const demoTrader = { id: '2', name: 'Suresh Sharma (व्यापारी)', role: 'trader', village: 'Jaipur Central Mandi', district: 'Jaipur', phone: '9876543211', businessName: 'Shree Ram Trading Co.' };
      const token = jwt.sign({ id: '2', username: '9876543211', role: 'trader', name: demoTrader.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ message: 'Trader Demo Login successful!', token, user: demoTrader });
    }

    return res.status(401).json({ message: 'Invalid phone/username or password' });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.me = (req, res) => {
  const user = (mockDb.users || []).find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User profile not found' });
  }
  const { password: _, ...userSafe } = user;
  res.status(200).json({ user: userSafe });
};
