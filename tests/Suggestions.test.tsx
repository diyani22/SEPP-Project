//Unit tests for Suggestion page
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Suggestions from '@/app/(tabs)/Suggestions';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../recipes.json', () => [
    {
        "id": 1,
        "name": "Pasta Primavera",
        "ingredients": ["Pasta", "Tomatoes", "Broccoli", "Olive Oil"],
        "instructions": [
          "Boil pasta according to package instructions.",
          "Chop and sauté broccoli in olive oil.",
          "Mix pasta with tomatoes and cooked broccoli.",
          "Serve and enjoy!"
        ]
      },
      {
        "id": 2,
        "name": "Margarita Pizza",
        "ingredients": ["Pizza Dough", "Tomato Sauce", "Mozzarella"],
        "instructions": [
          "Preheat oven to 425°F (220°C).",
          "Spread tomato sauce on pizza dough.",
          "Add mozzarella slices on top.",
          "Bake in the oven for 12-15 minutes."
        ]
      },
]);

jest.mock('../ingredients.json', () => ({
    fridgeItems: ["Tomatoes", "Onion", "Garlic", "Mozzarella", "Pasta", "Olive Oil", "Cheese", "Bread"],
}));

//Define a mock router
const mockRouter = {
    push: jest.fn(),
};

describe('Suggestions Component', () => {
    //set up mock function
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    //test to check that recipes are correctly displayed
    it('correctly renders the list of recipes', () => {
        render(<Suggestions />);
        expect(screen.getByText('Pasta Primavera')).toBeTruthy();
        expect(screen.getByText('Margarita Pizza')).toBeTruthy();
    });

    //test to check that the calculateMatchPercentage function works correctly
    it('should correctly calculate the match percentage', () => {
        render(<Suggestions />);

        expect(screen.getByText('Match: 75%')).toBeTruthy();
        expect(screen.getByText('Match: 33%')).toBeTruthy();
    });

    //test to check if clicking on a recipe card navigates to selected recipe page
    it('navigates to selected recipe page on recipe card click', () => {
        render(<Suggestions />);
        fireEvent.press(screen.getByText('Pasta Primavera')); //simulates pressing on the 'Pasta Primavera' recipe card
        expect(mockRouter.push).toHaveBeenCalledWith('/recipepage?selectedRecipeID=1');
    });

    //test to check if clicking on the back button navigates back to suggestion page
    it('navigates to Home on back button click', () => {
        render(<Suggestions />);
        fireEvent.press(screen.getByText('BACK'));
        expect(mockRouter.push).toHaveBeenCalledWith('/Home');
    });
});