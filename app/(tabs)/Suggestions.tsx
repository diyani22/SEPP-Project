import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import recipes from '../../recipes.json';
import ingredients from '../../ingredients.json';

import { useRouter } from 'expo-router';

import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Suggestions = ({ }: any) => {
  const router = useRouter();
  const { fridgeItems } = ingredients;
  const [selectedRecipe, setSelectedRecipe]: any = useState(null);

  // Calculate match percentage for each recipe
  const calculateMatchPercentage = (recipe: any) => {
    const total = recipe.ingredients.length;
    const have = recipe.ingredients.filter((ingredient: any) => fridgeItems.includes(ingredient)).length;
    return Math.round((have / total) * 100);
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = recipes
    .map((recipe) => ({
      ...recipe,
      matchPercentage: calculateMatchPercentage(recipe),
    }))
    .filter((recipe) => recipe.matchPercentage > 0) // Only include recipes with >0% match percentage
    .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort in descending order by match percentage

  // Handle recipe card click
  const handleRecipeClick = async (recipe: any) => {
    if (!analytics) {
      console.warn('Firebase Analytics is not initialized.');
      return;
    }
  
    const recipeId = String(recipe.id); 
  
    try {
      // Log the recipe card click event to Firebase Analytics
      await logEvent(analytics, 'recipe_card_click', {
        screen: 'Suggestions',
        recipeName: recipe.name,
        match_percentage: recipe.matchPercentage.toString(),
        timestamp: Date.now(),
      });
  
      console.log('Event logged: recipe_card_click');
  
      // Increment click count of specific recipe in Firestore (metrics, observability)
      const recipeRef = doc(db, 'recipes', recipeId);
      await updateDoc(recipeRef, {
        clickCount: increment(1),
      });
  
      console.log('Click count updated in Firestore');
  
      setSelectedRecipe(recipe);
      router.push(`/recipepage?selectedRecipeID=${recipeId}`);
    } catch (error) {
      console.error('Error logging event or updating Firestore:', error);
    }
  };  

  // Handle back button click
  const handleBackClick = () => {
    router.push('/Home')
  };

  return (
    <View style={styles.container}>
      {/* List of Suggested Recipes */}
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
                  index < 5 && styles.highlightedCard,
                ]}
                onPress={() => handleRecipeClick(item)}
              >
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.matchPercentage}>
                  Match: {item.matchPercentage}%
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => handleBackClick()}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e9df',
    justifyContent: 'space-between',
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