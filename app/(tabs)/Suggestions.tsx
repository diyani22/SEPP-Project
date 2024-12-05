import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import recipes from '../../recipes.json';
import ingredients from '../../ingredients.json';

import { useRouter } from 'expo-router';

const Suggestions = ({ navigation }: any) => {
  const router = useRouter();
  const { fridgeItems } = ingredients;
  const [selectedRecipe, setSelectedRecipe]: any = useState(null); // State to store the selected recipe

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
  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe); // Set the clicked recipe to the selectedRecipe state
    router.push(`/recipepage?selectedRecipeID=${recipe.id}`);
  };

  // Handle back button click to navigate
  const handleBackClick = () => {
    router.push('/Home')
  };

  return (
    <View style={styles.container}>
      {/* Recipe List or Recipe Details */}
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

      {/* Back Button at the bottom */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Home')}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e9df',
    justifyContent: 'space-between', // Ensures the back button stays at the bottom
    padding: 20,
  },
  recipeListContainer: {
    flex: 1,
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
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#276fa1',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Suggestions;