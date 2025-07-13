import React, { useState } from 'react';
import { Search, User, Loader2 } from 'lucide-react';
import { getPatientInfo } from '../services/api';

const PatientLookup = ({ onPatientFound, isLoading, error }) => {
  const [patientId, setPatientId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = async () => {
    if (!patientId.trim()) return;
    
    setIsSearching(true);
    
    try {
      const result = await getPatientInfo(patientId);
      
      if (result.success) {
        // Transform API response to match component expectations
        const patientData = {
          id: result.data.id || patientId,
          name: result.data.name || result.data.fullName || 'Unknown Patient',
          age: result.data.age || 'N/A',
          gender: result.data.gender || 'N/A',
          phone: result.data.phone || result.data.phoneNumber || 'N/A',
          email: result.data.email || 'N/A',
          address: result.data.address || 'N/A',
          bloodType: result.data.bloodType || result.data.blood_type || 'N/A',
          allergies: result.data.allergies || [],
          medicalHistory: result.data.medicalHistory || result.data.medical_history || []
        };
        
        onPatientFound(patientData);
      } else {
        // Handle API error
        onPatientFound(null, result.error);
      }
    } catch (error) {
      onPatientFound(null, 'Network error. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Patient Lookup</h2>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter patient ID..."
            onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleLookup}
            disabled={!patientId.trim() || isLoading || isSearching}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            {isLoading || isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            {isLoading || isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientLookup;