import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomePage from '@/app/(tabs)/HomePage';
import { useRouter } from 'expo-router';
import ingredients from '../../ingredients.json';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../ingredients.json', () => ({
  fridgeItems: ['Tomatoes', 'Onion', 'Garlic', 'Mozzarella', 'Pasta'],
}));

const mockRouter = {
  push: jest.fn(),
};

describe('HomePage Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders the title and subheader correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('In your fridge:')).toBeTruthy();
  });

  it('displays list of fridge items', () => {
    render(<HomePage />);
    const fridgeItems = ingredients.fridgeItems;

    fridgeItems.forEach((item) => {
      expect(screen.getByText(`- ${item}`)).toBeTruthy();
    });
  });

  it('navigates to the Suggestions page when button clicked', () => {
    render(<HomePage />);
    const button = screen.getByText('What can I make?');

    fireEvent.press(button);

    expect(mockRouter.push).toHaveBeenCalledWith('/Suggestions');
  });

  it('applies the correct styles to the container and button', () => {
    const { getByText, getByTestId } = render(<HomePage />);

    const title = screen.getByText('Home');
    expect(title.props.style).toContainEqual({
      fontSize: 24,
      fontWeight: 'bold',
      color: '#276fa1',
      marginBottom: 20,
    });

    const button = screen.getByText('What can I make?');
    expect(button.props.style).toContainEqual({
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    });
  });
});
