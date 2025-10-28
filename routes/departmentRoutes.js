const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new department
router.post('/', async (req, res) => {
  try {
    const department = new Department(req.body);
    const saved = await department.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Department name already exists.' });
    }
    res.status(400).json({ error: err.message });
  }
});

// UPDATE department by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found.' });
    }

    res.json(updatedDepartment);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate department name.' });
    }
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


