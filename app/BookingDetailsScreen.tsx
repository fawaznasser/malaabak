import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function BookingDetailsScreen({ navigation, ...props }: any) {
  const court = useLocalSearchParams();

  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleConfirmBooking = () => {
    if (!startTime || !endTime) {
      Alert.alert("Error", "Please select both start and end times.");
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      `You have booked ${court.name} from ${startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} to ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`,
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking: {court.name}</Text>
      <Text style={styles.details}>Location: {court.location}</Text>
      <Text style={styles.details}>Price: {court.price}</Text>

      {/* Time Pickers */}
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeButtonText}>
          {startTime
            ? `Start Time: ${startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : "Select Start Time"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeButtonText}>
          {endTime
            ? `End Time: ${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : "Select End Time"}
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartPicker(false);
            if (selectedTime) setStartTime(selectedTime);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndPicker(false);
            if (selectedTime) setEndTime(selectedTime);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
  },
  details: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 15,
  },
  timeButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
