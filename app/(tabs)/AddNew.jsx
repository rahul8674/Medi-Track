import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useMedicine } from '@/components/MedicineContext';

export default function AddNewScreen() {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const { addMedicine } = useMedicine();

  const handleAddMedicine = async () => {
    if (!medicineName || !dosage || !frequency) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    await addMedicine({ medicineName, dosage, frequency });
    Alert.alert('Success', 'Medicine added successfully!');

    setMedicineName('');
    setDosage('');
    setFrequency('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Medicine</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medicine Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Aspirin"
          placeholderTextColor="#aaa"
          value={medicineName}
          onChangeText={setMedicineName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dosage</Text>
        <TextInput
          style={styles.input}
          placeholder="500mg"
          placeholderTextColor="#aaa"
          value={dosage}
          onChangeText={setDosage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Frequency</Text>
        <TextInput
          style={styles.input}
          placeholder="Twice a day"
          placeholderTextColor="#aaa"
          value={frequency}
          onChangeText={setFrequency}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});