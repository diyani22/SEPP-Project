import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ingredients from '../../ingredients.json';

const HomePage = () => {
  const router = useRouter();
  const { fridgeItems } = ingredients;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.subHeader}>In your fridge:</Text>

      {/* Ingredients List */}
      <View style={styles.section}>
        {fridgeItems.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
      </View>

      {/* "What can I make?" Button */}
      <TouchableOpacity
        style={styles.toSuggestionsButton}
        onPress={() => router.push('/Suggestions')}
      >
        <Text style={styles.buttonText}>What can I make?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2e9df',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#276fa1',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    minHeight: 500,
    backgroundColor: '#bfdff5',
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#276fa1',
  },
  text: {
    fontSize: 30,
    marginBottom: 5,
  },
  toSuggestionsButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#276fa1',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomePage;