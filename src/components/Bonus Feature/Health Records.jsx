import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  Heart, 
  Activity, 
  FileText, 
  Download, 
  Eye,
  Calendar,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Shield,
  Pill,
  Thermometer
} from 'lucide-react';
import { format } from 'date-fns';

export default function HealthRecords() {
  const { user } = useAuth();
  const { patients, getPatientIncidents } = useData();
  
  const patient = patients.find(p => p.id === user.patientId);
  const incidents = getPatientIncidents(user.patientId);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const healthRecords = [
    {
      id: 'hr1',
      type: 'X-Ray',
      title: 'Panoramic X-Ray',
      date: '2025-01-20',
      doctor: 'Dr. Sarah Johnson',
      description: 'Full mouth panoramic radiograph showing overall dental health',
      files: [
        { name: 'panoramic_xray_20250120.jpg', type: 'image', size: '2.4 MB' },
        { name: 'xray_report.pdf', type: 'pdf', size: '156 KB' }
      ],
      findings: 'No significant abnormalities detected. Wisdom teeth development normal.',
      recommendations: 'Continue regular dental hygiene. Next X-ray in 12 months.'
    },
    {
      id: 'hr2',
      type: 'Blood Test',
      title: 'Pre-Surgery Blood Work',
      date: '2025-01-15',
      doctor: 'Dr. Michael Chen',
      description: 'Complete blood count and coagulation studies before root canal procedure',
      files: [
        { name: 'blood_test_results.pdf', type: 'pdf', size: '89 KB' }
      ],
      findings: 'All values within normal range. Hemoglobin: 14.2 g/dL, Platelet count: 285,000',
      recommendations: 'Cleared for dental surgery. No contraindications found.'
    },
    {
      id: 'hr3',
      type: 'Treatment',
      title: 'Root Canal Therapy',
      date: '2025-01-25',
      doctor: 'Dr. Sarah Johnson',
      description: 'Endodontic treatment of tooth #14 with crown placement',
      files: [
        { name: 'treatment_photos_before.jpg', type: 'image', size: '1.8 MB' },
        { name: 'treatment_photos_after.jpg', type: 'image', size: '1.9 MB' },
        { name: 'treatment_notes.pdf', type: 'pdf', size: '234 KB' }
      ],
      findings: 'Successful root canal treatment completed. Crown fitted perfectly.',
      recommendations: 'Avoid hard foods for 2 weeks. Follow-up in 1 month.'
    }
  ];

  const vitalSigns = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: Heart },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: Activity },
    { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal', icon: Thermometer },
    { label: 'Weight', value: '165', unit: 'lbs', status: 'normal', icon: TrendingUp }
  ];

  const medications = [
    { name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily', duration: '7 days', prescribed: '2025-01-25' },
    { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: 'PRN pain', prescribed: '2025-01-25' }
  ];

  const allergies = [
    { allergen: 'Penicillin', reaction: 'Skin rash', severity: 'Moderate' },
    { allergen: 'Latex', reaction: 'Contact dermatitis', severity: 'Mild' }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'pdf': return '📄';
      default: return '📎';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Health Records
          </h1>
          <p className="text-gray-600 mt-2">Your complete medical and dental history</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">HIPAA Protected</span>
        </div>
      </div>

      {/* Patient Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{patient?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-900">{format(new Date(patient?.dob), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Type</p>
                <p className="font-medium text-gray-900">O+</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Visit</p>
                <p className="font-medium text-gray-900">Jan 25, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Vital Signs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalSigns.map((vital, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(vital.status)}`}>
                  <vital.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{vital.label}</p>
                  <p className="text-lg font-bold text-gray-900">{vital.value} <span className="text-sm font-normal text-gray-600">{vital.unit}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Medications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Pill className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Current Medications</h3>
          </div>
          <div className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: {med.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Prescribed</p>
                    <p className="text-sm font-medium text-gray-700">{med.prescribed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">Allergies & Reactions</h3>
          </div>
          <div className="space-y-4">
            {allergies.map((allergy, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{allergy.allergen}</h4>
                    <p className="text-sm text-gray-600">{allergy.reaction}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                    allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {allergy.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Records */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Medical Records</h3>
        <div className="space-y-4">
          {healthRecords.map((record) => (
            <div key={record.id} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{record.title}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {record.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(record.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                    
                    {/* Files */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {record.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
                          <span>{getFileIcon(file.type)}</span>
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedRecord.title}</h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Findings</h3>
                <p className="text-gray-700">{selectedRecord.findings}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                <p className="text-gray-700">{selectedRecord.recommendations}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Attached Files</h3>
                <div className="space-y-2">
                  {selectedRecord.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFileIcon(file.type)}</span>
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




