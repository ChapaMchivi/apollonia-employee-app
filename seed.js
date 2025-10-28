require('dotenv').config();
const mongoose = require('mongoose');

const Department = require('./models/Department');
const Employee = require('./models/Employee');
const Training = require('./models/Training');
const Patient = require('./models/Patient');

const mongoURI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Department.deleteMany({});
    await Employee.deleteMany({});
    await Training.deleteMany({});
    await Patient.deleteMany({});

    // Seed departments
    const departments = await Department.insertMany([
      { name: 'General Dentistry' },
      { name: 'Pediatric Dentistry' },
      { name: 'Restorative Dentistry' },
      { name: 'Surgery' },
      { name: 'Orthodontics' }
    ]);

    const getDept = name => departments.find(d => d.name === name)._id;

    // Seed employees
    const employees = await Employee.insertMany([
      { firstName: 'Lisa', lastName: 'Harris', role: 'Dental Assistant', departments: [getDept('Restorative Dentistry'), getDept('Orthodontics')] },
      { firstName: 'Alfred', lastName: 'Christensen', role: 'Dentist', departments: [getDept('General Dentistry')] },
      { firstName: 'John', lastName: 'Dudley', role: 'Dentist', departments: [getDept('General Dentistry')] },
      { firstName: 'Danny', lastName: 'Perez', role: 'Dental Assistant', departments: [getDept('Restorative Dentistry')] },
      { firstName: 'Sarah', lastName: 'Alvarez', role: 'Hygienist', departments: [getDept('Pediatric Dentistry')] },
      { firstName: 'Constance', lastName: 'Smith', role: 'Surgeon', departments: [getDept('Surgery')] },
      { firstName: 'Travis', lastName: 'Combs', role: 'Receptionist', departments: [] },
      { firstName: 'Francisco', lastName: 'Willard', role: 'Hygienist', departments: [getDept('Pediatric Dentistry')] },
      { firstName: 'Janet', lastName: 'Doe', role: 'Admin', departments: [getDept('General Dentistry')] },
      { firstName: 'Leslie', lastName: 'Roche', role: 'Orthodontist', departments: [getDept('Orthodontics')] }
    ]);

    // Seed training modules
    const trainings = await Training.insertMany([
      {
        title: 'HIPAA Compliance',
        description: 'Privacy and security training for all staff',
        requiredForRoles: ['Admin', 'Dental Assistant'],
        completionDeadlineDays: 30
      },
      {
        title: 'Infection Control',
        description: 'Sterilization and PPE protocols',
        requiredForRoles: ['Hygienist', 'Dentist'],
        completionDeadlineDays: 15
      },
      {
        title: 'Patient Intake Workflow',
        description: 'Front desk onboarding and scheduling',
        requiredForRoles: ['Receptionist'],
        completionDeadlineDays: 10
      }
    ]);

    // Seed patients
    await Patient.insertMany([
      {
        firstName: 'Lena',
        lastName: 'Nguyen',
        dateOfBirth: new Date('1985-04-12'),
        contactInfo: { phone: '555-1234', email: 'lena.nguyen@example.com' },
        insuranceProvider: 'Delta Dental'
      },
      {
        firstName: 'Carlos',
        lastName: 'Ramirez',
        dateOfBirth: new Date('1990-09-22'),
        contactInfo: { phone: '555-5678', email: 'c.ramirez@example.com' },
        insuranceProvider: 'Aetna'
      },
      {
        firstName: 'Priya',
        lastName: 'Kumar',
        dateOfBirth: new Date('1978-12-05'),
        contactInfo: { phone: '555-9012', email: 'priya.kumar@example.com' },
        insuranceProvider: 'Cigna'
      }
    ]);

    // Assign trainings to employees based on role
    for (const emp of employees) {
      const eligibleTrainings = trainings.filter(t =>
        t.requiredForRoles.includes(emp.role)
      );
      emp.certifications = eligibleTrainings.map(t => t._id);
      await emp.save();
    }

    console.log('✅ Seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedData();

