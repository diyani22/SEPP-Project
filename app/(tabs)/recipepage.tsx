import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Recipe = () => {
  const sampleRecipes = [
    {
      id: '1',
      name: 'Vegetable Stir Fry',
      ingredients: ['Noodles', 'Onion', 'Garlic', 'Broccoli', 'Pepper', 'Bean Sprouts', 'Peppers', 'Sauce', 'Olive Oil'],
      instructions: [
        'Cook the noodles according to package instructions.',
        'Chop onion, garlic, broccoli and peppers.',
        'Heat olive oil in a pan and add vegetables.',
        'Mix the sauce with the cooked noodles and serve.',
        'Once vegetables are nearly ready, add cooked noodles and stir in sauce.',
        'Allow all ingredients to cook together for 3 minutes and serve.',
      ],
    },
  ];
  const recipe = sampleRecipes[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text> {/* Main header title is recipe name */}

      {/* Ingredients Section */}
      <Text style={styles.subHeader}>Ingredients:</Text>
      <View style={styles.section}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
      </View>

      {/* Instructions Section */}
      <Text style={styles.subHeader}>Instructions:</Text>
      <View style={styles.section}>
        {recipe.instructions.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  section: {
    backgroundColor: '#bfdff5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#276fa1',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
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

export default Recipe;