import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

interface Field {
  id: string;
  name: string;
  image: string;
}

const fields: Field[] = [
  {
    id: '1',
    name: 'Soccer Field A',
    image: 'https://imgs.search.brave.com/wpv0Q86byQo3fAGkbT9KGxW9tpnT0luMOgwq4ox0giQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/OTA0MTc4NC9waG90/by9zb2NjZXItZmll/bGQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9BMElQenRS/R0t1dm9CdUlYWE1Z/Sl9mVDZ1bWl3Q3hD/VS0zY2w4RC1WZkE9',
  },
  {
    id: '2',
    name: 'Tennis Court 1',
    image: 'https://imgs.search.brave.com/0dN57UpWyW0hS_WnbSpjP-3fPYf6l5oxgPbPkBUw0nw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODcw/NTQyNDQyL3Bob3Rv/L3Rlbm5pcy1jb3Vy/dC1jb2xvdXItYWJz/dHJhY3QuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVktTjl1/S3pKQk41Q29MaVZQ/Uy1oN2MtelVRaDNp/OGdLbXR0UHZnd2oz/Wm89',
  },
  {
    id: '3',
    name: 'Basketball Court',
    image: 'https://imgs.search.brave.com/BvUWNE7gcPs0n6pXWCz1TYMIFa_EsO-HJ3VX9RFgJys/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM5/MjU5NzIzL3Bob3Rv/L2Jhc2tldGJhbGwt/YXJlbmEuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUx1Mi1y/S3Fjb1VBX3FLNFlx/TnZsOUx1V3BOTVEz/RjFrTU56Y1hrRHRf/UVk9',
  },
];

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Field }) => (
    <View style={styles.sliderItem}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.fieldName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fields}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.slider}
      />
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
    paddingTop: height * 0.05, 
  },
  slider: {
    height: height * 0.35, 
  },
  sliderItem: {
    width,
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: height * 0.25, 
    borderRadius: 10,
    marginBottom: 5,
  },
  fieldName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
