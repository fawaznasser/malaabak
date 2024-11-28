import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Field {
  id: string;
  name: string;
  image: string;
}

const fields: Field[] = [
  { id: '1', name: 'Soccer Field A', image: 'https://imgs.search.brave.com/wpv0Q86byQo3fAGkbT9KGxW9tpnT0luMOgwq4ox0giQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/OTA0MTc4NC9waG90/by9zb2NjZXItZmll/bGQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9BMElQenRS/R0t1dm9CdUlYWE1Z/Sl9mVDZ1bWl3Q3hD/VS0zY2w4RC1WZkE9' },
  { id: '2', name: 'Tennis Court 1', image: 'https://imgs.search.brave.com/0dN57UpWyW0hS_WnbSpjP-3fPYf6l5oxgPbPkBUw0nw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODcw/NTQyNDQyL3Bob3Rv/L3Rlbm5pcy1jb3Vy/dC1jb2xvdXItYWJz/dHJhY3QuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVktTjl1/S3pKQk41Q29MaVZQ/Uy1oN2MtelVRaDNp/OGdLbXR0UHZnd2oz/Wm89' },
  { id: '3', name: 'Basketball Court', image: 'https://imgs.search.brave.com/BvUWNE7gcPs0n6pXWCz1TYMIFa_EsO-HJ3VX9RFgJys/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM5/MjU5NzIzL3Bob3Rv/L2Jhc2tldGJhbGwt/YXJlbmEuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUx1Mi1y/S3Fjb1VBX3FLNFlx/TnZsOUx1V3BOTVEz/RjFrTU56Y1hrRHRf/UVk9' },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fields.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + fields.length) % fields.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fields.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Image
          source={{ uri: fields[currentIndex].image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlayButtonsContainer}>
          <TouchableOpacity onPress={handlePrevious} style={styles.overlayButton}>
            <Text style={styles.buttonText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.overlayButton}>
            <Text style={styles.buttonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.fieldName}>{fields[currentIndex].name}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          Welcome to Malaabak! Explore top fields for your sports needs.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 220, // Adjust as needed
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  fieldName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  overlayButtonsContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  overlayButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
