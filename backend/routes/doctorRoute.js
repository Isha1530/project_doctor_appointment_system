import express from 'express'
import { doctorList, loginDoctor, getMyAppointments, getDoctorProfile, updateAppointmentStatus, updateDoctorProfile } from '../controllers/doctorController.js'
import upload from '../middlewares/multer.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.post('/my-appointments', getMyAppointments)
doctorRouter.get('/profile', getDoctorProfile)
doctorRouter.post('/update-appointment-status', updateAppointmentStatus)
doctorRouter.post('/update-profile', upload.single('image'), updateDoctorProfile)

export default doctorRouter