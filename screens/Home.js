import React, { useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Checkbox = ({ title, checked, onPress }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <ThemedView style={[styles.checkbox, checked && styles.checkedCheckbox]} />
    <ThemedText style={styles.checkboxTitle}>{title}</ThemedText>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [items, setItems] = useState([
    { id: '1', title: 'Milk', checked: false },
    { id: '2', title: 'Eggs', checked: false },
  ]);

  const toggleCheck = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Fridge Items</ThemedText>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Checkbox
            title={item.title}
            checked={item.checked}
            onPress={() => toggleCheck(item.id)}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 16,
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: '#007BFF',
  },
  checkboxTitle: {
    fontSize: 18,
    color: '#000000',
  },
});
