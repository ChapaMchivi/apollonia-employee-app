const Department = require('../models/department');
const Employee = require('../models/employee');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('manager');
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const newDept = new Department(req.body);
    await newDept.save();
    res.status(201).json(newDept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignManager = async (req, res) => {
  try {
    const { managerId } = req.body;
    const dept = await Department.findByIdAndUpdate(
      req.params.id,
      { manager: managerId },
      { new: true }
    );
    res.status(200).json(dept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
