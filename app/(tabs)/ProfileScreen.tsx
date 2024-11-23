import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
  
    const handleLogout = () => {
      router.push('/SignInScreen'); // Navigate to Sign-In Screen
    };
  
    const handleEditProfile = () => {
      router.push('/EditProfileScreen'); // Navigate to Edit Profile Screen
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* User Info Section */}
      <View style={styles.userInfoSection}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>
      <View style={styles.userInfoSection}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>johndoe@example.com</Text>
      </View>
      <View style={styles.userInfoSection}>
        <Text style={styles.label}>Membership:</Text>
        <Text style={styles.value}>Gold Member</Text>
      </View>

      {/* Booking History Section */}
      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      <View style={styles.bookingHistory}>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingText}>Soccer Field A</Text>
          <Text style={styles.bookingDate}>Date: 25th Nov 2024</Text>
        </View>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingText}>Tennis Court 3</Text>
          <Text style={styles.bookingDate}>Date: 20th Nov 2024</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000', // Black background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50', // Green text for title
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Subtle border for separation
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text for labels
  },
  value: {
    fontSize: 16,
    color: '#aaa', // Light gray for values
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Green text for section title
    marginVertical: 20,
  },
  bookingHistory: {
    marginBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#222', // Dark gray background for booking items
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bookingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text for booking names
  },
  bookingDate: {
    fontSize: 14,
    color: '#777', // Light gray for dates
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#FF5252', // Red button for logout
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
});
