import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

type FieldDetailScreenProps = {
  route: {
    params: {
      title: string;
      description: string;
      phone: string;
      image?: string; // Optional in case there's no image
      location: string;
      size: number;
      type: string;
      numberOfPlayers: number;
      rating: number;
    };
  };
};

export default function FieldDetailScreen({ route }: FieldDetailScreenProps) {
  const {
    title,
    description,
    phone,
    image,
    location,
    size,
    type,
    numberOfPlayers,
    rating,
  } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
        {description}
      </Text>
      <Text style={styles.details}>Phone: {phone}</Text>
      <Text style={styles.details}>Location: {location}</Text>
      <Text style={styles.details}>Size: {size}</Text>
      <Text style={styles.details}>Type: {type}</Text>
      <Text style={styles.details}>Players: {numberOfPlayers}</Text>
      <Text style={styles.details}>Rating: {rating.toFixed(1)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
});
