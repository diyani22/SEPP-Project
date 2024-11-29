import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const Suggestions = () => {
  const sampleRecipes = [
    { id: '1', name: 'Pasta Primavera', ingredients: ['Pasta', 'Tomatoes', 'Broccoli', 'Olive Oil'] },
    { id: '2', name: 'Vegetable Stir Fry', ingredients: ['Noodles', 'Onion', 'Garlic', 'Broccoli', 'Pepper'] },
    { id: '3', name: 'Chicken Curry', ingredients: ['Chicken', 'Curry Powder', 'Onion', 'Garlic', 'Tomatoes'] },
    { id: '4', name: 'Margarita Pizza', ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella'] },
    { id: '5', name: 'Beef Tacos', ingredients: ['Beef', 'Taco Shells', 'Lettuce', 'Cheese'] },
    { id: '6', name: 'Tomato Soup', ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Cream'] },
    { id: '7', name: 'Grilled Cheese Sandwich', ingredients: ['Bread', 'Cheese', 'Butter'] },
    { id: '8', name: 'Avocado Toast', ingredients: ['Avocado', 'Bread', 'Salt', 'Pepper'] },
    { id: '9', name: 'Shrimp Scampi', ingredients: ['Shrimp', 'Garlic', 'Butter', 'Pasta'] },
    { id: '10', name: 'Caesar Salad', ingredients: ['Lettuce', 'Croutons', 'Caesar Dressing', 'Parmesan'] },
    { id: '11', name: 'Vegetarian Chili', ingredients: ['Beans', 'Tomatoes', 'Onion', 'Garlic', 'Chili Powder'] },
    { id: '12', name: 'Pan-Seared Salmon', ingredients: ['Salmon', 'Lemon', 'Butter', 'Garlic'] },
    { id: '13', name: 'Breakfast Burrito', ingredients: ['Tortilla', 'Eggs', 'Cheese', 'Sausage'] },
    { id: '14', name: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef', 'Garlic', 'Onion'] },
    { id: '15', name: 'Caprese Salad', ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'] },
  ];

  const fridgeItems = ['Tomatoes', 'Onion', 'Garlic', 'Mozzarella', 'Pasta', 'Olive Oil', 'Cheese', 'Bread'];

  // Calculate match percentage for each recipe
  const calculateMatchPercentage = (recipe) => {
    const total = recipe.ingredients.length;
    const have = recipe.ingredients.filter((ingredient) => fridgeItems.includes(ingredient)).length;
    return Math.round((have / total) * 100); // Rounded to nearest integer
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = sampleRecipes
    .map((recipe) => ({
      ...recipe,
      matchPercentage: calculateMatchPercentage(recipe),
    }))
    .filter((recipe) => recipe.matchPercentage > 0) // Only include recipes with >0% match
    .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort descending by match percentage

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Suggestions</Text>

      {/* Recipe List */}
      <Text style={styles.subtitle}>Suggested Recipes:</Text>
      <FlatList
        data={filteredAndSortedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.recipeCard,
              index < 5 && styles.highlightedCard, // Highlight top 5 recipes
            ]}
          >
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.matchPercentage}>
              Match: {item.matchPercentage}%
            </Text>
          </View>
        )}
      />

      {/* Back Button */}
      <Button
        title="Back" />
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
    backgroundColor: '#bfdff5',
    borderWidth: 2,
    borderColor: '#276fa1',
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