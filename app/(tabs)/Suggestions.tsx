import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import recipes from '../recipes.json';
import ingredients from '../ingredients.json';

const Suggestions = ({ navigation }) => {
  const { fridgeItems } = ingredients;
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe

  // Calculate match percentage for each recipe
  const calculateMatchPercentage = (recipe: any) => {
    const total = recipe.ingredients.length;
    const have = recipe.ingredients.filter((ingredient: any) => fridgeItems.includes(ingredient)).length;
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

  // Handle recipe card click
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe to the selectedRecipe state
  };

  // Handle back button click to navigate
  const handleBackClick = () => {
    if (selectedRecipe !== null) {
      setSelectedRecipe(null); // Reset selectedRecipe to null when back button is pressed (go back to list)
    } else {
      navigation.goBack(); // Go back to the previous screen (home screen in this case)
    }
  };

  return (
    <View style={styles.container}>
      {/* Recipe List or Recipe Details */}
      {selectedRecipe === null ? (
        <View style={styles.recipeListContainer}>
          <Text style={styles.title}>Recipe Suggestions</Text>
          <Text style={styles.subtitle}>Suggested Recipes:</Text>

          <FlatList
            data={filteredAndSortedRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.recipeCard,
                  index < 5 && styles.highlightedCard, // Highlight top 5 recipes
                ]}
                onPress={() => handleRecipeClick(item)} // Handle card click
              >
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.matchPercentage}>
                  Match: {item.matchPercentage}%
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        // Recipe Details
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.recipeDetailTitle}>Name: {selectedRecipe.name}</Text>

          <Text style={styles.recipeDetailTitle}>Ingredients:</Text>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.detailText}>
              - {ingredient}
            </Text>
          ))}

          <Text style={styles.recipeDetailTitle}>Instructions:</Text>
          {selectedRecipe.instructions.map((step, index) => (
            <Text key={index} style={styles.detailText}>
              {index + 1}. {step}
            </Text>
          ))}
        </ScrollView>
      )}

      {/* Back Button at the bottom */}
      <View style={styles.backButtonContainer}>
        <Button title={selectedRecipe ? "Back to Recipes" : "Back to Home"} onPress={handleBackClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e9df',
    justifyContent: 'space-between', // Ensures the back button stays at the bottom
  },
  recipeListContainer: {
    flex: 1,
    padding: 20,
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
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2e9df',
  },
  recipeDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  backButtonContainer: {
    paddingBottom: 20, // Adds padding at the bottom for the button
  },
});

export default Suggestions;