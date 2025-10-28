const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  createPatient,
  updatePatientContact,
  addAppointmentToPatient
} = require('../controllers/patientsController');

// GET all patients
router.get('/', getAllPatients);

// POST a new patient
router.post('/', createPatient);

// PUT: update contact info
router.put('/:id/contact', updatePatientContact);

// PUT: add appointment reference
router.put('/:id/appointments', addAppointmentToPatient);

module.exports = router;