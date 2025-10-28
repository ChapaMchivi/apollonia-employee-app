require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Modular route imports
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Optional health check route for uptime monitoring and Docker diagnostics
app.get('/pingness', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Apollonia backend is alive and well.',
    timestamp: new Date().toISOString()
  });
});

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully');

    // Register API routes
    app.use('/api/employees', employeeRoutes);
    app.use('/api/departments', departmentRoutes);
    app.use('/api/training', trainingRoutes);
    app.use('/api/patients', patientRoutes);

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });




