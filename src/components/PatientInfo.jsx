import React from 'react';
import { User, Phone, Mail, MapPin, Heart, AlertTriangle, FileText } from 'lucide-react';

const PatientInfo = ({ patient }) => {
  console.log("patient", patient);
  // Combine currentMedications and medicationReminders for display
  const currentMedications = Array.isArray(patient.currentMedications) ? patient.currentMedications : [];
  const medicationReminders = Array.isArray(patient.medicationReminders) ? patient.medicationReminders : [];
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-900">{patient.name}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <span className="text-gray-400 font-bold">#</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-semibold text-gray-900">{patient.id}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-900">{patient.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">{patient.email}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold text-gray-900">{patient.address}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Age & Gender</p>
              <p className="font-semibold text-gray-900">{patient.age} years, {patient.gender}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <span className="text-red-500 font-bold">B</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-semibold text-gray-900">{patient.bloodType}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Allergies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-gray-900">Medical History</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {patient.medicalHistory.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Current Medications Section */}
        <div className="mt-8">
          {/* <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-semibold text-gray-900">Current Medications</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {currentMedications.length > 0 ? (
              currentMedications.map((med, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {typeof med === 'string' ? med : med.medicineName || JSON.stringify(med)}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No current medications listed.</span>
            )}
          </div> */}
          {/* Medication Reminders Section (from patient.medicationReminders) */}
          {Array.isArray(medicationReminders) && medicationReminders.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center mb-1">
                <FileText className="h-5 w-5 text-purple-500 mr-2" />
                <h4 className="font-semibold text-gray-900 text-base">Past Medications</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicationReminders.map((reminder, idx) => (
                  <div
                    key={idx}
                    className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-900 shadow-sm"
                  >
                    <div className="font-semibold text-purple-700 mb-1">
                      {reminder.medicineName || 'Medication Reminder'}
                    </div>
                    {reminder.dosage && (
                      <div className="text-sm mb-1"><span className="font-medium">Dosage:</span> {reminder.dosage}</div>
                    )}
                    {reminder.quantity && (
                      <div className="text-sm mb-1"><span className="font-medium">Quantity:</span> {reminder.quantity}</div>
                    )}
                    {Array.isArray(reminder.times) && reminder.times.length > 0 && (
                      <div className="text-sm mb-1"><span className="font-medium">Times:</span> {reminder.times.join(', ')}</div>
                    )}
                    {reminder.durationDays && (
                      <div className="text-sm mb-1"><span className="font-medium">Duration (days):</span> {reminder.durationDays}</div>
                    )}
                    {reminder.startDate && (
                      <div className="text-sm mb-1"><span className="font-medium">Start Date:</span> {new Date(reminder.startDate).toLocaleDateString()}</div>
                    )}
                    {reminder.endDate && (
                      <div className="text-sm mb-1"><span className="font-medium">End Date:</span> {new Date(reminder.endDate).toLocaleDateString()}</div>
                    )}
                    {reminder.instructions && (
                      <div className="text-sm mb-1"><span className="font-medium">Instructions:</span> {reminder.instructions}</div>
                    )}
                    {reminder.frequency && (
                      <div className="text-sm mb-1"><span className="font-medium">Frequency:</span> {reminder.frequency}</div>
                    )}
                    {reminder.prescribedBy && (
                      <div className="text-sm mb-1"><span className="font-medium">Prescribed By:</span> {typeof reminder.prescribedBy === 'object' ? JSON.stringify(reminder.prescribedBy) : reminder.prescribedBy}</div>
                    )}
                    {reminder.createdAt && (
                      <div className="text-xs text-purple-700"><span className="font-medium">Created At:</span> {new Date(reminder.createdAt).toLocaleString()}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Medical Reminders Section (from patient.medicalReminders) */}
          {Array.isArray(patient.medicalReminders) && patient.medicalReminders.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center mb-1">
                <FileText className="h-5 w-5 text-pink-500 mr-2" />
                <h4 className="font-semibold text-gray-900 text-base">Medical Reminders</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.medicalReminders.map((reminder, idx) => (
                  <div
                    key={idx}
                    className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-pink-900 shadow-sm"
                  >
                    <div className="font-semibold text-pink-700 mb-1">
                      {reminder.title || reminder.type || 'Medical Reminder'}
                    </div>
                    {reminder.date && (
                      <div className="text-sm mb-1">
                        <span className="font-medium">Date:</span> {new Date(reminder.date).toLocaleString()}
                      </div>
                    )}
                    {reminder.time && (
                      <div className="text-sm mb-1">
                        <span className="font-medium">Time:</span> {reminder.time}
                      </div>
                    )}
                    {reminder.location && (
                      <div className="text-sm mb-1">
                        <span className="font-medium">Location:</span> {reminder.location}
                      </div>
                    )}
                    {reminder.status && (
                      <div className="text-sm mb-1">
                        <span className="font-medium">Status:</span> {reminder.status}
                      </div>
                    )}
                    {reminder.notes && (
                      <div className="text-sm mb-1">
                        <span className="font-medium">Notes:</span> {reminder.notes}
                      </div>
                    )}
                    {/* Show any other fields dynamically */}
                    {Object.entries(reminder).map(([key, value]) => (
                      !['title','type','date','time','location','status','notes','_id','id','createdAt','updatedAt','__v'].includes(key) && value ? (
                        <div className="text-xs text-pink-700" key={key}>
                          <span className="font-medium">{key}:</span> {typeof value === 'object' ? JSON.stringify(value) : value}
                        </div>
                      ) : null
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;