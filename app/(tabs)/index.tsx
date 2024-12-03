import React from 'react';
import { StyleSheet, View } from 'react-native';
import Suggestions from '../../screens/Suggestions';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
