import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ingredients from '../../ingredients.json';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';
import { doc, setDoc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FirebaseError } from 'firebase/app';

const HomePage = () => {
  const router = useRouter();
  const { fridgeItems } = ingredients;

  const handleButtonClick = async () => {
    console.log('Button clicked');
  
    if (!analytics) {
      console.warn('Firebase Analytics is not initialized.');
      return;
    }
  
    try {
      await logEvent(analytics, 'what_can_i_make_button_click', {
        itemCount: fridgeItems.length.toString(),
        screen: 'Home',
        timestamp: Date.now(),
      });
      console.log('Event logged: what_can_i_make_button_click');
  
      router.push('/Suggestions');
      console.log('Navigation to /Suggestions triggered');
  
      // Increment Firestore counter (metrics, observability)
      const clickDocRef = doc(db, 'metrics', 'button_clicks');
      await updateDoc(clickDocRef, { totalClicks: increment(1) });
      console.log('Firestore updated: button_clicks incremented');
  
    } catch (error) {
      console.error('Error logging event or updating Firestore:', error);
  
      if (error instanceof FirebaseError && error.code === 'not-found') {
        await setDoc(doc(db, 'metrics', 'button_clicks'), { totalClicks: 1 });
        console.log('Firestore document created with initial count of 1');
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.subHeader}>In your fridge:</Text>

      {/* Ingredients List */}
      <View style={styles.section}>
        {fridgeItems.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            - {ingredient}
          </Text>
        ))}
      </View>

      {/* "What can I make?" Button */}
      <TouchableOpacity
        style={styles.toSuggestionsButton}
        onPress={handleButtonClick} //call the function to log the event and navigate to suggestions page
      >
        <Text style={styles.buttonText}>What can I make?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2e9df',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#276fa1',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    minHeight: 500,
    backgroundColor: '#bfdff5',
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#276fa1',
  },
  text: {
    fontSize: 30,
    marginBottom: 5,
  },
  toSuggestionsButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#276fa1',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomePage;