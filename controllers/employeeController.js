const Employee = require('../models/Employee');

// GET all employees
exports.getAllEmployees = async (req, res) => {
  try {
    console.log('🔍 GET /api/employees hit');
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('❌ Error fetching employees:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// POST a new employee
exports.createEmployee = async (req, res) => {
  try {
    console.log('📥 POST /api/employees payload:', req.body);
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('❌ Error creating employee:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// GET a single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    console.log(`🔍 GET /api/employees/${req.params.id}`);
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      console.warn('⚠️ Employee not found:', req.params.id);
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error('❌ Error fetching employee by ID:', err.message);
    res.status(400).json({ error: err.message });
  }
};

