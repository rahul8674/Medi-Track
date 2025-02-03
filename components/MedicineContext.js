import React, { createContext, useState, useContext } from 'react';

// Create context
const MedicineContext = createContext();

// Provider component
export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState([]);

  // Function to add a new medicine
  const addMedicine = (medicine) => {
    setMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
}

// Custom hook for consuming the context
export function useMedicine() {
  return useContext(MedicineContext);
}
