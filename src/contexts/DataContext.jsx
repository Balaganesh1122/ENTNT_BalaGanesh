import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

const initialData = {
  patients: [
    {
      id: "p1",
      name: "John Doe",
      dob: "1990-05-10",
      contact: "1234567890",
      email: "john@entnt.in",
      address: "123 Main St, New York, NY",
      healthInfo: "No known allergies, diabetes type 2",
      emergencyContact: "Jane Doe - 0987654321"
    },
    {
      id: "p2",
      name: "Jane Smith",
      dob: "1985-08-22",
      contact: "2345678901",
      email: "jane@entnt.in",
      address: "456 Oak Ave, Los Angeles, CA",
      healthInfo: "Allergic to penicillin",
      emergencyContact: "Bob Smith - 1987654321"
    }
  ],
  incidents: [
    {
      id: "i1",
      patientId: "p1",
      title: "Toothache",
      description: "Upper molar pain",
      comments: "Sensitive to cold drinks",
      appointmentDate: "2025-01-25T10:00:00",
      cost: 80,
      treatment: "Root canal therapy",
      status: "Completed",
      nextDate: "2025-02-15T10:00:00",
      files: []
    },
    {
      id: "i2",
      patientId: "p1",
      title: "Regular Checkup",
      description: "6-month routine dental examination",
      comments: "Good oral hygiene",
      appointmentDate: "2025-01-30T14:00:00",
      cost: 120,
      treatment: "Cleaning and examination",
      status: "Scheduled",
      nextDate: null,
      files: []
    },
    {
      id: "i3",
      patientId: "p2",
      title: "Teeth Whitening",
      description: "Professional teeth whitening treatment",
      comments: "Patient wants brighter smile",
      appointmentDate: "2025-01-28T11:00:00",
      cost: 200,
      treatment: "Professional whitening",
      status: "Scheduled",
      nextDate: null,
      files: []
    }
  ]
};

export function DataProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const savedPatients = localStorage.getItem('dental_patients');
    const savedIncidents = localStorage.getItem('dental_incidents');

    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    } else {
      setPatients(initialData.patients);
      localStorage.setItem('dental_patients', JSON.stringify(initialData.patients));
    }

    if (savedIncidents) {
      setIncidents(JSON.parse(savedIncidents));
    } else {
      setIncidents(initialData.incidents);
      localStorage.setItem('dental_incidents', JSON.stringify(initialData.incidents));
    }
  }, []);

  const savePatients = (newPatients) => {
    setPatients(newPatients);
    localStorage.setItem('dental_patients', JSON.stringify(newPatients));
  };

  const saveIncidents = (newIncidents) => {
    setIncidents(newIncidents);
    localStorage.setItem('dental_incidents', JSON.stringify(newIncidents));
  };

  // Patient operations
  const addPatient = (patient) => {
    const newPatient = { ...patient, id: `p${Date.now()}` };
    const updatedPatients = [...patients, newPatient];
    savePatients(updatedPatients);
    return newPatient;
  };

  const updatePatient = (id, updatedPatient) => {
    const updatedPatients = patients.map(p => 
      p.id === id ? { ...updatedPatient, id } : p
    );
    savePatients(updatedPatients);
  };

  const deletePatient = (id) => {
    const updatedPatients = patients.filter(p => p.id !== id);
    const updatedIncidents = incidents.filter(i => i.patientId !== id);
    savePatients(updatedPatients);
    saveIncidents(updatedIncidents);
  };

  // Incident operations
  const addIncident = (incident) => {
    const newIncident = { ...incident, id: `i${Date.now()}` };
    const updatedIncidents = [...incidents, newIncident];
    saveIncidents(updatedIncidents);
    return newIncident;
  };

  const updateIncident = (id, updatedIncident) => {
    const updatedIncidents = incidents.map(i => 
      i.id === id ? { ...updatedIncident, id } : i
    );
    saveIncidents(updatedIncidents);
  };

  const deleteIncident = (id) => {
    const updatedIncidents = incidents.filter(i => i.id !== id);
    saveIncidents(updatedIncidents);
  };

  const getPatientIncidents = (patientId) => {
    return incidents.filter(i => i.patientId === patientId);
  };

  const getUpcomingAppointments = (limit = 10) => {
    const now = new Date();
    return incidents
      .filter(i => new Date(i.appointmentDate) >= now && i.status !== 'Completed')
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, limit);
  };

  const getPatientById = (id) => {
    return patients.find(p => p.id === id);
  };

  const value = {
    patients,
    incidents,
    addPatient,
    updatePatient,
    deletePatient,
    addIncident,
    updateIncident,
    deleteIncident,
    getPatientIncidents,
    getUpcomingAppointments,
    getPatientById
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}