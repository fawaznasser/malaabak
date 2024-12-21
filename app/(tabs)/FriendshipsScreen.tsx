import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function FriendshipsScreen({ navigation, route }: any) {
  const [friendships, setFriendships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userId] = useState(1); // Example user ID. Replace with actual logged-in user ID.

  // Fetch friendships from the backend
  const fetchFriendships = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.100:5000/api/friendships/${userId}`
      );
      setFriendships(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch friendships');
    }
  };

  // Search for users by username
  const searchUsers = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        `http://192.168.1.100:5000/api/players/search?username=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to search users');
    }
  };

  // Add a new friendship
  const addFriendship = async (friendId: number) => {
    try {
      const response = await axios.post(
        `http://192.168.1.100:5000/api/friendships`,
        {
          userID1: userId,
          userID2: friendId,
          status: 'Pending',
        }
      );
      Alert.alert('Success', response.data.message);
      fetchFriendships(); // Refresh the list
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add friendship');
    }
  };

  useEffect(() => {
    fetchFriendships();
  }, []);

  // Render a single friendship item
  const renderFriendship = ({ item }: { item: any }) => (
    <View style={styles.friendshipItem}>
      <Text style={styles.friendName}>
        Friend: {item.UserID1 === userId ? item.UserID2 : item.UserID1}
      </Text>
      <Text>Status: {item.Status}</Text>
    </View>
  );

  // Render a single search result item
  const renderSearchResult = ({ item }: { item: any }) => (
    <View style={styles.searchResultItem}>
      <Text style={styles.friendName}>Username: {item.Username}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addFriendship(item.UserID)}
      >
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friendships</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search by username"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchUsers}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.UserID.toString()}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Friendships List */}
      <FlatList
        data={friendships}
        renderItem={renderFriendship}
        keyExtractor={(item) => item.FriendshipID.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  friendshipItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultItem: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
