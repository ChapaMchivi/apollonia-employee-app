const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  createDepartment,
  assignManager
} = require('../controllers/departmentsController');

router.get('/', getAllDepartments);
router.post('/', createDepartment);
router.put('/:id/assign-manager', assignManager);

module.exports = router;
