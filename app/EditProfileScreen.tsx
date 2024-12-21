import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function EditProfileScreen({ navigation }: any) {
  const [name, setName] = useState('Fawaz Nasser');
  const [email, setEmail] = useState('fawaznasser807@gmail.com');
  const [password, setPassword] = useState('');

  const handleSaveChanges = () => {
    if (!name || !email) {
      Alert.alert('Error', 'Name and email cannot be empty.');
      return;
    }

    console.log('Updated Name:', name);
    console.log('Updated Email:', email);
    console.log('Updated Password:', password);

    Alert.alert('Success', 'Your profile has been updated.');
    navigation.goBack(); // Navigate back to the Profile Screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="New Password (optional)"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50', // Green title
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#444', // Dark gray border
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff', // White text
    backgroundColor: '#222', // Darker input background
  },
  button: {
    backgroundColor: '#4CAF50', // Green button
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: '#FF5252', // Red button for cancel
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});
