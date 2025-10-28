const Training = require('../models/Training');
const Employee = require('../models/Employee');

// GET all training modules
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new training module
exports.createTraining = async (req, res) => {
  try {
    const newTraining = new Training(req.body);
    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT: Assign training to an employee
exports.assignTrainingToEmployee = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const { employeeId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Ensure certifications array exists
    employee.certifications = employee.certifications || [];

    // Avoid duplicate assignment
    if (!employee.certifications.includes(trainingId)) {
      employee.certifications.push(trainingId);
      await employee.save();
    }

    res.status(200).json({ message: 'Training assigned successfully', employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
