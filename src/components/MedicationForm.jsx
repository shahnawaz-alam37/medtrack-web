import React, { useState } from 'react';
import { Pill, Calendar, Clock, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { addMedicationReminder } from '../services/api';

const MedicationForm = ({ patientId, onSave, isSaving }) => {
  const [medications, setMedications] = useState([
    {
      name: '',
      dosage: '',
      quantity: '',
      startDate: '',
      endDate: '',
      instructions: ''
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: '',
        dosage: '',
        quantity: '',
        startDate: '',
        endDate: '',
        instructions: ''
      }
    ]);
  };

  const removeMedication = (index) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index, field, value) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
  };

  const handleSave = async () => {
    const validMedications = medications.filter(med => 
      med.name && med.dosage && med.quantity && med.startDate
    );
    
    if (validMedications.length > 0) {
      setIsSubmitting(true);
      
      try {
        // Prepare data for API
        const medicationData = {
          patientId: patientId,
          medications: validMedications.map(med => ({
            medicineName: med.name,
            dosage: med.dosage,
            quantity: med.quantity,
            startDate: med.startDate,
            endDate: med.endDate || null,
            instructions: med.instructions || '',
            frequency: med.quantity // You might want to separate frequency from quantity
          }))
        };
        
        const result = await addMedicationReminder(medicationData);
        
        if (result.success) {
          onSave(validMedications, null, result.data);
          
          // Reset form after successful save
          setMedications([{
            name: '',
            dosage: '',
            quantity: '',
            startDate: '',
            endDate: '',
            instructions: ''
          }]);
        } else {
          onSave(null, result.error);
        }
      } catch (error) {
        onSave(null, 'Network error. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid = medications.some(med => 
    med.name && med.dosage && med.quantity && med.startDate
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Prescription</h2>
        </div>
        <button
          onClick={addMedication}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Medication
        </button>
      </div>

      <div className="space-y-6">
        {medications.map((medication, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
            {medications.length > 1 && (
              <button
                onClick={() => removeMedication(index)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={medication.name}
                  onChange={(e) => updateMedication(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Amoxicillin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage *
                </label>
                <input
                  type="text"
                  value={medication.dosage}
                  onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 500mg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="text"
                  value={medication.quantity}
                  onChange={(e) => updateMedication(index, 'quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 2 tablets twice daily"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Start Date *
                </label>
                <input
                  type="date"
                  value={medication.startDate}
                  onChange={(e) => updateMedication(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  End Date / Duration
                </label>
                <input
                  type="date"
                  value={medication.endDate}
                  onChange={(e) => updateMedication(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                value={medication.instructions}
                onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                placeholder="Additional instructions for the patient..."
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!isFormValid || isSaving || isSubmitting}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        >
          {isSaving || isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {isSaving || isSubmitting ? 'Saving Prescription...' : 'Save Prescription'}
        </button>
      </div>
    </div>
  );
};

export default MedicationForm;