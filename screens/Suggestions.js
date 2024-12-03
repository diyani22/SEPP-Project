import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import recipes from '../recipes.json';
import ingredients from '../ingredients.json';

const Suggestions = () => {

  const { fridgeItems } = ingredients;

  // Calculate match percentage for each recipe
  const calculateMatchPercentage = (recipe) => {
    const total = recipe.ingredients.length;
    const have = recipe.ingredients.filter((ingredient) => fridgeItems.includes(ingredient)).length;
    return Math.round((have / total) * 100); // Rounded to nearest integer
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = recipes
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