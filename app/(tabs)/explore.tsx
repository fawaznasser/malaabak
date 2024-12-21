import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

type Location = {
  id: string;
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export default function MapWithPhoneNumbers() {
  const navigation = useNavigation();

  const labeledLocations: Location[] = [
    {
      id: '1',
      title: 'Soccer Field A',
      description: 'A large soccer field in Downtown.',
      phone: '123-456-7890',
      latitude: 33.8938,
      longitude: 35.5018,
    },
    {
      id: '2',
      title: 'Tennis Court 1',
      description: 'A modern tennis court at Green Valley.',
      phone: '098-765-4321',
      latitude: 33.8908,
      longitude: 35.5068,
    },
    {
      id: '3',
      title: 'Basketball Court',
      description: 'A basketball court in the City Arena.',
      phone: '555-555-5555',
      latitude: 33.8978,
      longitude: 35.5108,
    },
  ];

  const handleMarkerPress = (location: Location) => {
    type FieldDetailScreenProps = {
      route: {
        params: {
          title: string;
          description: string;
          phone: string;
          latitude: number;
          longitude: number;
        };
      };
    };    
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.8938,
          longitude: 35.5018,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {labeledLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={`Phone: ${location.phone}`}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
