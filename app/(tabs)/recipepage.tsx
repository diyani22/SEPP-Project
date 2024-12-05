import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import recipes from '../../recipes.json';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Recipe = () => {
  const router = useRouter();
  const { selectedRecipeID }: { selectedRecipeID: any } = useLocalSearchParams();
  const recipe = recipes.find((r) => r.id == selectedRecipeID);

  console.log(selectedRecipeID)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe?.name}</Text> {/* Main header title is recipe name */}
      
      {/* Ingredients Section */}
      <Text style={styles.subHeader}>Ingredients:</Text>
      <View style={styles.section}>
        {recipe?.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
      </View>

      {/* Instructions Section */}
      <Text style={styles.subHeader}>Instructions:</Text>
      <View style={styles.section}>
        {recipe?.instructions.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Suggestions')}>
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