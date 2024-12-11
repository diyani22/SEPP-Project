import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Recipepage from '@/app/(tabs)/recipepage';
import { useRouter, useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

const mockRouter = {
    push: jest.fn(),
};

describe('Recipe page Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useLocalSearchParams as jest.Mock).mockReturnValue({ selectedRecipeID: '1' }); 
    });

    it('navigates to Home on back button click', () => {
        render(<Recipepage />);
        fireEvent.press(screen.getByText('BACK'));
        expect(mockRouter.push).toHaveBeenCalledWith('/Suggestions'); 
    });
});





