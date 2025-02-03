// app/index.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMedicine } from '@/components/MedicineContext';

export default function HomeScreen() {
  const { medicines } = useMedicine(); // Access medicines from components

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      {medicines.length === 0 ? (
        <Text style={styles.emptyText}>No medicines added yet.</Text>
      ) : (
        <FlatList
          data={medicines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.medicineItem}>
              <Text style={styles.medicineName}>{item.medicineName}</Text>
              <Text>Dosage: {item.dosage}</Text>
              <Text>Frequency: {item.frequency}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  medicineItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 2,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
