const express = require('express');
const router = express.Router();
const {
  getAllTrainings,
  createTraining,
  assignTrainingToEmployee
} = require('../controllers/trainingController');

// GET all training modules
router.get('/', getAllTrainings);

// POST a new training module
router.post('/', createTraining);

// PUT: assign training to an employee
router.put('/:id/assign', assignTrainingToEmployee);

module.exports = router;
