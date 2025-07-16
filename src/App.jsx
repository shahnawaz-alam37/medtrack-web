import React, { useState } from 'react';
import { Stethoscope, CheckCircle, X } from 'lucide-react';
import PatientLookup from './components/PatientLookup';
import PatientInfo from './components/PatientInfo';
import MedicationForm from './components/MedicationForm';

function App() {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handlePatientFound = (foundPatient, errorMessage = null) => {
    setIsLoading(false);
    
    if (errorMessage) {
      setError(errorMessage);
      setPatient(null);
    } else if (foundPatient) {
      console.log('Patient found:', foundPatient);
      console.log('Patient ID:', foundPatient._id || foundPatient.id);
      setPatient(foundPatient);
      setError(null);
    } else {
      setPatient(null);
      setError('Patient not found');
    }
  };

  const handleSavePrescription = async (medications, errorMessage = null, responseData = null) => {
    setIsSaving(true);
    
    if (errorMessage) {
      setError(errorMessage);
      setIsSaving(false);
      return;
    }
    
    if (medications && responseData) {
      console.log('Prescription saved successfully:', responseData);
      console.log('Medications saved:', medications);
      
      setSuccessMessage(`Prescription saved successfully for ${patient?.name}`);
      setError(null);
      setIsSaving(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setError('Failed to save prescription. Please try again.');
      setIsSaving(false);
    }
  };

  const resetPatient = () => {
    setPatient(null);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MedInsight</h1>
            </div>
            <div className="text-sm text-gray-600">
              Doctor Portal
            </div>
          </div>
        </div>
      </header>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-4 mt-4 rounded-r-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-green-700">{successMessage}</p>
            <button
              onClick={() => setSuccessMessage(null)}
              className="ml-auto text-green-400 hover:text-green-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {patient && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={resetPatient}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Search New Patient
            </button>
          </div>
        )}

        <PatientLookup
          onPatientFound={handlePatientFound}
          isLoading={isLoading}
          error={error}
        />

        {patient && !isLoading && (
          <>
            <PatientInfo patient={patient}/>
            <MedicationForm
              patientId={patient._id || patient.id}
              onSave={handleSavePrescription}
              isSaving={isSaving}
            />
          </>
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading patient information...</p>
          </div>
        )}

        {!patient && !isLoading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to MedInsight</h3>
            <p className="text-gray-600">Enter a patient ID above to begin creating a prescription.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;