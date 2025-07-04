import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Clock, 
  User,
  Stethoscope,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-react';

export default function TreatmentPlanner() {
  const { patients, addIncident } = useData();
  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      id: 'tp1',
      patientId: 'p1',
      title: 'Complete Dental Restoration',
      description: 'Comprehensive treatment plan for full mouth restoration',
      treatments: [
        { id: 1, name: 'Initial Consultation', duration: 60, cost: 150, status: 'completed', date: '2025-01-15' },
        { id: 2, name: 'Deep Cleaning', duration: 90, cost: 200, status: 'completed', date: '2025-01-20' },
        { id: 3, name: 'Root Canal (Tooth #14)', duration: 120, cost: 800, status: 'scheduled', date: '2025-02-01' },
        { id: 4, name: 'Crown Placement', duration: 90, cost: 1200, status: 'pending', date: '2025-02-15' },
        { id: 5, name: 'Follow-up Visit', duration: 30, cost: 100, status: 'pending', date: '2025-03-01' }
      ],
      totalCost: 2450,
      estimatedDuration: '6 weeks',
      priority: 'high',
      notes: 'Patient has dental anxiety, recommend sedation for major procedures'
    }
  ]);

  const [showNewPlan, setShowNewPlan] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Treatment Planner
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive treatment planning and scheduling</p>
        </div>
        <button
          onClick={() => setShowNewPlan(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          New Treatment Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {treatmentPlans.map((plan) => {
          const patient = patients.find(p => p.id === plan.patientId);
          const completedTreatments = plan.treatments.filter(t => t.status === 'completed').length;
          const progress = (completedTreatments / plan.treatments.length) * 100;

          return (
            <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Plan Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                      <p className="text-gray-600 mt-1">{plan.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{patient?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(plan.priority)}`}>
                      {plan.priority} priority
                    </span>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Treatment Progress</span>
                    <span className="text-sm text-gray-600">{completedTreatments}/{plan.treatments.length} completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Plan Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="text-lg font-bold text-gray-900">${plan.totalCost}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-lg font-bold text-gray-900">{plan.estimatedDuration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="text-lg font-bold text-gray-900">{Math.round(progress)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment List */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Treatment Schedule</h4>
                <div className="space-y-3">
                  {plan.treatments.map((treatment, index) => (
                    <div key={treatment.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          treatment.status === 'completed' 
                            ? 'bg-green-500' 
                            : treatment.status === 'scheduled'
                            ? 'bg-blue-500'
                            : 'bg-gray-400'
                        }`}>
                          {treatment.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{treatment.name}</h5>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{treatment.duration} min</span>
                            <span>${treatment.cost}</span>
                            <span>{treatment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                          {treatment.status}
                        </span>
                        {treatment.status === 'pending' && (
                          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                            Schedule
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {plan.notes && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-yellow-800">Treatment Notes</h5>
                        <p className="text-yellow-700 text-sm mt-1">{plan.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {treatmentPlans.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No treatment plans created yet</p>
          <p className="text-gray-400 text-sm">Create comprehensive treatment plans for your patients</p>
        </div>
      )}
    </div>
  );
}


