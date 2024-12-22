import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const courts = [
  {
    id: "1",
    name: "Soccer Field A",

    location: "Downtown Sports Complex",
    price: "$50/hour",
    image: "https://example.com/soccer-field.jpg",
  },
  {
    id: "2",
    name: "Tennis Court 1",
    location: "Green Valley Club",
    price: "$30/hour",
    image: "https://example.com/tennis-court.jpg",
  },
  {
    id: "3",
    name: "Basketball Court",
    location: "City Sports Arena",
    price: "$40/hour",
    image: "https://example.com/basketball-court.jpg",
  },
];

export default function CourtsBookingScreen({}: any) {
  const router = useRouter();
  const renderCourt = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "/BookingDetailsScreen", params: item });
        console.log(item);
      }}
    >
      <View style={styles.courtCard}>
        <Image source={{ uri: item.image }} style={styles.courtImage} />
        <View style={styles.courtDetailsContainer}>
          <Text style={styles.courtName}>{item.name}</Text>
          <Text style={styles.courtDetails}>Location: {item.location}</Text>
          <Text style={styles.courtDetails}>Price: {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Courts</Text>
      <FlatList
        data={courts}
        keyExtractor={(item) => item.id}
        renderItem={renderCourt}
      />
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
    textAlign: "center",
    marginBottom: 20,
  },
  courtCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  courtImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  courtDetailsContainer: {
    padding: 15,
  },
  courtName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  courtDetails: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 5,
  },
});
