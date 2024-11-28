import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Suggestions = () => {
  const sampleRecipes = [
    { id: '1', name: 'Pasta Primavera', matchPercentage: '90%' },
    { id: '2', name: 'Vegetable Stir Fry', matchPercentage: '85%' },
    { id: '3', name: 'Chicken Curry', matchPercentage: '85%' },
    { id: '4', name: 'Margarita Pizza', matchPercentage: '80%' },
    { id: '5', name: 'Beef Tacos', matchPercentage: '80%' },
    { id: '6', name: 'Tomato Soup', matchPercentage: '70%' },
    { id: '7', name: 'Grilled Cheese Sandwich', matchPercentage: '65%' },
    { id: '8', name: 'Avocado Toast', matchPercentage: '50%' },
    { id: '9', name: 'Shrimp Scampi', matchPercentage: '50%' },
    { id: '10', name: 'Caesar Salad', matchPercentage: '20%' },
    { id: '11', name: 'Caesar Salad', matchPercentage: '20%' },
    { id: '12', name: 'Spaghetti Bolognese', matchPercentage: '15%' },
    { id: '13', name: 'Vegetarian Chili', matchPercentage: '15%' },
    { id: '14', name: 'Pan-Seared Salmon', matchPercentage: '10%' },
    { id: '15', name: 'Breakfast Burrito', matchPercentage: '0%' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Suggestions</Text>

      {/* Recipe List */}
      <Text style={styles.subtitle}>Suggested Recipes:</Text>
      <FlatList
        data={sampleRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.recipeCard,
              index < 5 && styles.highlightedCard, // Highlight the top 5
            ]}
          >
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.matchPercentage}>
              Match: {item.matchPercentage}
            </Text>
          </View>
        )}
      />
      
      {/* Button to fetch suggestions */}
      <Button 
        title="Back"
        onPress={() => console.log('Fetching recipes...')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2e9df',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  highlightedCard: {
    backgroundColor: '#bfdff5', // Light orange for highlighting
    borderWidth: 2,
    borderColor: '#276fa1', // Darker orange border
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  matchPercentage: {
    fontSize: 14,
    color: '#888',
  },
});

export default Suggestions;