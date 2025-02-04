import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicineContext = createContext();

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState([]);

  // Load medicines from AsyncStorage on mount
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const storedMedicines = await AsyncStorage.getItem('medicines');
        if (storedMedicines) {
          setMedicines(JSON.parse(storedMedicines));
        }
      } catch (error) {
        console.error('Error loading medicines:', error);
      }
    };
    loadMedicines();
  }, []);

  // Sync medicines state to AsyncStorage
  useEffect(() => {
    const saveMedicines = async () => {
      try {
        await AsyncStorage.setItem('medicines', JSON.stringify(medicines));
      } catch (error) {
        console.error('Error saving medicines:', error);
      }
    };
    saveMedicines();
  }, [medicines]); // Runs when medicines change

  // Add a new medicine
  const addMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
  };

  // Delete a medicine
  const deleteMedicine = (medicineName) => {
    setMedicines(medicines.filter((med) => med.medicineName !== medicineName));
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, deleteMedicine, setMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicine() {
  return useContext(MedicineContext);
}
