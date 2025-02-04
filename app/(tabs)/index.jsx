import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useMedicine } from '@/components/MedicineContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const { medicines, setMedicines } = useMedicine();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Delete Confirmation Alert
  const confirmDeleteMedicine = useCallback((medicineName) => {
    Alert.alert(
      "Delete Medicine",
      `Are you sure you want to delete ${medicineName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteMedicine(medicineName), style: "destructive" }
      ]
    );
  }, [medicines]);

  const deleteMedicine = useCallback((medicineName) => {
    setMedicines((prev) => prev.filter((medicine) => medicine.medicineName !== medicineName));
  }, [setMedicines]);

  // Filter & Sort Medicines (Memoized)
  const filteredMedicines = useMemo(() => {
    return medicines
      .filter(item => item?.medicineName?.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (sortBy === 'name' ? a.medicineName.localeCompare(b.medicineName) : a.frequency - b.frequency));
  }, [medicines, searchQuery, sortBy]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Medicine..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.sortContainer}>
        <SortButton label="Sort by Name" onPress={() => setSortBy('name')} />
        <SortButton label="Sort by Frequency" onPress={() => setSortBy('frequency')} />
      </View>

      {filteredMedicines.length === 0 ? (
        <Text style={styles.emptyText}>No medicines found.</Text>
      ) : (
        <FlatList
          data={filteredMedicines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MedicineItem item={item} onDelete={confirmDeleteMedicine} />
          )}
        />
      )}
    </View>
  );
}

// Medicine Item Component
const MedicineItem = ({ item, onDelete }) => (
  <View style={styles.medicineItem}>
    <Icon name="pill" size={24} color="#007bff" style={styles.icon} />
    <View style={styles.medicineDetails}>
      <Text style={styles.medicineName}>{item.medicineName}</Text>
      <Text>Dosage: {item.dosage}</Text>
      <Text>Frequency: {item.frequency}</Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(item.medicineName)} style={styles.deleteButton}>
      <Icon name="delete" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

// Sort Button Component
const SortButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.sortButton}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  sortContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sortButton: { backgroundColor: '#e0e0e0', padding: 8, borderRadius: 6 },
  emptyText: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 20 },
  medicineItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginVertical: 8, borderRadius: 6, elevation: 2 },
  icon: { marginRight: 10 },
  medicineDetails: { flex: 1 },
  medicineName: { fontSize: 18, fontWeight: 'bold' },
  deleteButton: { padding: 10, borderRadius: 6 },
});
