import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Suggestions from '../../screens/Suggestions'; // Adjust the path if needed

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Replace the default content with your RecipeSuggestionPage */}
      <Suggestions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
});
