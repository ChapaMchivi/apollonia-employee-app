const Patient = require('../models/Patient');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePatientContact = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { contactInfo: { phone, email } },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addAppointmentToPatient = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    patient.appointments = patient.appointments || [];
    if (!patient.appointments.includes(appointmentId)) {
      patient.appointments.push(appointmentId);
      await patient.save();
    }

    res.status(200).json({ message: 'Appointment added', patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

