import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMedicine } from '@/components/MedicineContext';

export default function AddNewScreen() {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once a day'); // Default selection
  const [notes, setNotes] = useState('');

  const { addMedicine } = useMedicine();

  const handleAddMedicine = async () => {
    if (!medicineName || !dosage) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    await addMedicine({ medicineName, dosage, frequency, notes });
    Alert.alert('Success', 'Medicine added successfully!');

    setMedicineName('');
    setDosage('');
    setFrequency('Once a day');
    setNotes('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Medicine</Text>

      {/* Medicine Name */}
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

      {/* Dosage */}
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

      {/* Frequency Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Frequency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={frequency}
            onValueChange={(itemValue) => setFrequency(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Once a day" value="Once a day" />
            <Picker.Item label="Twice a day" value="Twice a day" />
            <Picker.Item label="Three times a day" value="Three times a day" />
            <Picker.Item label="As needed" value="As needed" />
          </Picker>
        </View>
      </View>

      {/* Notes Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Any additional instructions..."
          placeholderTextColor="#aaa"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {/* Add Medicine Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
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