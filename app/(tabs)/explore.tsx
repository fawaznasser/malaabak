import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.8547, // Latitude for Lebanon
          longitude: 35.8623, // Longitude for Lebanon
          latitudeDelta: 1.5, // Zoom level for latitude
          longitudeDelta: 1.5, // Zoom level for longitude
        }}
      >
        {/* Marker for Beirut */}
        <Marker
          coordinate={{
            latitude: 33.8938, // Latitude for Beirut
            longitude: 35.5018, // Longitude for Beirut
          }}
          title="Beirut"
          description="Capital of Lebanon"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
