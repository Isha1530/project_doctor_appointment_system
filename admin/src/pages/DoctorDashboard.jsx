import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('aToken');
  const doctorId = localStorage.getItem('doctorId');

  // Fetch appointments for the doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!doctorId) return;
        const { data } = await axios.post(
          backendUrl + '/api/doctor/my-appointments',
          { docId: doctorId },
          { headers: { token } }
        );
        if (data.success) {
          setAppointments(data.appointments);
        }
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctorId, backendUrl, token]);

  // Fetch doctor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!doctorId) return;
        const { data } = await axios.get(backendUrl + '/api/doctor/profile', { params: { doctorId }, headers: { token } });
        if (data.success) {
          setProfile(data.doctor);
        }
      } catch (error) {
        // handle error
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [doctorId]);

  // Handler to change appointment status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-appointment-status',
        { appointmentId: id, isCompleted: newStatus === 'Completed' },
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(prev =>
          prev.map(app =>
            app._id === id ? { ...app, isCompleted: newStatus === 'Completed' } : app
          )
        );
      }
    } catch (error) {
      // handle error
    }
  };

  // Handler to update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('doctorId', doctorId);
      formData.append('name', profile.name || '');
      formData.append('email', profile.email || '');
      formData.append('speciality', profile.speciality || '');
      formData.append('degree', profile.degree || '');
      formData.append('experience', profile.experience || '');
      formData.append('about', profile.about || '');
      formData.append('fees', profile.fees || '');
      if (profileImage) {
        formData.append('image', profileImage);
      }
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        formData,
        { headers: { token, 'Content-Type': 'multipart/form-data' } }
      );
      if (data.success) {
        alert('Profile updated!');
        setProfile(data.doctor);
        setProfileImage(null);
        setEditMode(false);
      }
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  // Status badge with icon
  const statusBadge = (app) => {
    if (app.cancelled) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-red-500 text-red-500 bg-red-50 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          Cancelled
        </span>
      );
    } else if (app.isCompleted) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-green-500 text-green-500 bg-green-50 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Completed
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-yellow-500 text-yellow-700 bg-yellow-50 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
          Pending
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 sm:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-indigo-700 text-center tracking-wide drop-shadow-lg">Doctor Dashboard</h2>
        {/* Appointments Card */}
        <div className="mb-12 rounded-3xl shadow-2xl bg-white p-6 sm:p-10 max-w-4xl w-full flex flex-col items-center border border-blue-100">
          <h3 className="text-2xl font-bold mb-6 text-blue-700 text-center flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            My Appointments
          </h3>
          {loading ? <p className="text-center text-lg">Loading...</p> : (
            <div className="overflow-x-auto w-full">
              <table className="w-full max-w-4xl border rounded-2xl overflow-hidden text-base text-center shadow-md">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border p-3 text-center">Patient Name</th>
                    <th className="border p-3 text-center">Patient Email</th>
                    <th className="border p-3 text-center">Date</th>
                    <th className="border p-3 text-center">Time</th>
                    <th className="border p-3 text-center">Status</th>
                    <th className="border p-3 text-center">Amount</th>
                    <th className="border p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app, idx) => (
                    <tr key={app._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100 transition'}>
                      <td className="border p-3 text-center font-semibold text-blue-900">{app.userData?.name || '-'}</td>
                      <td className="border p-3 text-center text-blue-700">{app.userData?.email || '-'}</td>
                      <td className="border p-3 text-center">{app.slotDate}</td>
                      <td className="border p-3 text-center">{app.slotTime}</td>
                      <td className="border p-3 text-center">{statusBadge(app)}</td>
                      <td className="border p-3 text-center text-green-700 font-bold">{app.amount}</td>
                      <td className="border p-3 text-center">
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <button className="px-4 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:from-green-500 hover:to-green-700 transition-all w-32 shadow" onClick={() => handleStatusChange(app._id, 'Completed')}>
                            <span className="flex items-center gap-1 justify-center">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Mark Complete
                            </span>
                          </button>
                          <button className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all w-32 shadow" onClick={() => handleStatusChange(app._id, 'Pending')}>
                            <span className="flex items-center gap-1 justify-center">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                              Mark Pending
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Profile Card */}
        <div id="doctor-profile-section" className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 mb-8 flex flex-col items-center text-center border border-purple-100">
          <div className="flex flex-col items-center mb-6">
            {profile.image ? (
              <img src={profile.image} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-400 shadow-lg" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'D'}
              </div>
            )}
            <h3 className="text-2xl font-bold mb-1 text-purple-700 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.866-1.343-7-3-7s-3 3.134-3 7c0 3.866 1.343 7 3 7s3-3.134 3-7z" /></svg>
              My Profile
            </h3>
            <p className="text-gray-500">{profile.email}</p>
          </div>
          {profileLoading ? <p>Loading profile...</p> : (
            editMode ? (
              <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4" encType="multipart/form-data">
                <div className="flex flex-col items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                  <input type="file" accept="image/*" onChange={e => setProfileImage(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-700" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input className="border p-2 rounded w-full" type="text" placeholder="Name" value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input className="border p-2 rounded w-full" type="email" placeholder="Email" value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                    <input className="border p-2 rounded w-full" type="text" placeholder="Speciality" value={profile.speciality || ''} onChange={e => setProfile({ ...profile, speciality: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input className="border p-2 rounded w-full" type="text" placeholder="Degree" value={profile.degree || ''} onChange={e => setProfile({ ...profile, degree: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input className="border p-2 rounded w-full" type="text" placeholder="Experience" value={profile.experience || ''} onChange={e => setProfile({ ...profile, experience: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <input className="border p-2 rounded w-full" type="text" placeholder="About" value={profile.about || ''} onChange={e => setProfile({ ...profile, about: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                    <input className="border p-2 rounded w-full" type="number" placeholder="Fees" value={profile.fees || ''} onChange={e => setProfile({ ...profile, fees: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-2 mt-4 justify-center">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-6 rounded-full font-semibold transition-all duration-200 shadow" type="submit">Update Profile</button>
                  <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-full font-semibold transition-all duration-200 shadow" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-purple-50 rounded-xl p-4 text-left">
                    <span className="block text-xs text-purple-400 font-semibold mb-1">Speciality</span>
                    <span className="text-lg font-bold text-purple-700">{profile.speciality}</span>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-left">
                    <span className="block text-xs text-blue-400 font-semibold mb-1">Degree</span>
                    <span className="text-lg font-bold text-blue-700">{profile.degree}</span>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-left">
                    <span className="block text-xs text-purple-400 font-semibold mb-1">Experience</span>
                    <span className="text-lg font-bold text-purple-700">{profile.experience}</span>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-left">
                    <span className="block text-xs text-blue-400 font-semibold mb-1">Fees</span>
                    <span className="text-lg font-bold text-blue-700">{profile.fees}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mt-4 w-full text-left">
                  <span className="block text-xs text-gray-400 font-semibold mb-1">About</span>
                  <span className="text-base text-gray-700">{profile.about}</span>
                </div>
                <button className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-8 rounded-full font-semibold transition-all duration-200 shadow" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 