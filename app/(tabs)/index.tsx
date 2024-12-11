import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Home from './Home';

const firebaseConfig = {
  apiKey: "AIzaSyAlS3URYvS_b--ls4Pud7IcRV6WlU4RjNw",
  authDomain: "sepp-project.firebaseapp.com",
  projectId: "sepp-project",
  storageBucket: "sepp-project.firebasestorage.app",
  messagingSenderId: "948590273784",
  appId: "1:948590273784:web:7a41a180038b94fb8f470d",
  measurementId: "G-LF2GWLEY1Y"
}

export default function HomeScreen() {
  useEffect(() => {
    if(firebaseConfig){
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      console.log('Firebase Config:', firebaseConfig);
    }
    else{
      console.warn('Firebase Config:', firebaseConfig);
    }
  }, [firebaseConfig]);

  return (
    <View style={styles.container}>
      <Home />
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
