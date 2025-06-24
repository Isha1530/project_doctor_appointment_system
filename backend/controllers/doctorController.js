import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import { v2 as cloudinary } from 'cloudinary'

const changeAvailablity = async (req, res) => {

  try {

    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed ' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const doctorList = async (req, res) => {

  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body
    const doctor = await doctorModel.findOne({ email })
    if (!doctor) {
      return res.json({ success: false, message: 'Doctor does not exist' })
    }
    const isMatch = await bcrypt.compare(password, doctor.password)
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const getMyAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: 'Missing doctor ID' });
    }
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const getDoctorProfile = async (req, res) => {
  try {
    const { email, doctorId } = req.query;
    let doctor;
    if (doctorId) {
      doctor = await doctorModel.findById(doctorId);
    } else if (email) {
      doctor = await doctorModel.findOne({ email });
    } else {
      return res.json({ success: false, message: 'Missing doctor ID or email' });
    }
    if (!doctor) {
      return res.json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, isCompleted } = req.body;
    if (!appointmentId) {
      return res.json({ success: false, message: 'Missing appointment ID' });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted });
    res.json({ success: true, message: 'Appointment status updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId, name, email, speciality, degree, experience, about, fees } = req.body;
    if (!doctorId) {
      return res.json({ success: false, message: 'Missing doctor ID' });
    }
    const updateFields = { name, email, speciality, degree, experience, about, fees };
    if (req.file) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
      updateFields.image = imageUpload.secure_url;
    }
    const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, updateFields, { new: true });
    res.json({ success: true, doctor: updatedDoctor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export { changeAvailablity, doctorList, loginDoctor, getMyAppointments, getDoctorProfile, updateAppointmentStatus, updateDoctorProfile }