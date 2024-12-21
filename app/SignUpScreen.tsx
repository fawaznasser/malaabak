import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the type for your navigation stack
type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [preferredSports, setPreferredSports] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password || !bio || !preferredSports || !age || !sex) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/signup', {
        username,
        email,
        password,
        bio,
        preferredSports,
        age: parseInt(age), // Ensure age is sent as an integer
        sex,
      });

      Alert.alert('Success', response.data.message);
      navigation.navigate('SignIn'); // Navigate to sign-in page after signup
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error details:', error.response.data || error.message);
        Alert.alert('Error', error.response.data?.message || 'Network error');
      } else {
        console.error('Unexpected error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Sports"
        value={preferredSports}
        onChangeText={setPreferredSports}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex (e.g., Male/Female)"
        value={sex}
        onChangeText={setSex}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
