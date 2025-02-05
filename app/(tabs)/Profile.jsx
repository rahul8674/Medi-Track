import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState('+1 234 567 890');
  const [address, setAddress] = useState('New York, USA');

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }} 
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      {/* User Info Section (Editable) */}
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{phone}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          ) : (
            <Text style={styles.value}>{address}</Text>
          )}
        </View>
      </View>

      {/* Edit / Save Button */}
      <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
        <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef',
    padding: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
