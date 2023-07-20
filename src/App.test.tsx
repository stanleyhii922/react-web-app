import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('check title appear ', () => {
  render(<App />);
  const titleElement = screen.getByText(/User List/i);
  expect(titleElement).toBeInTheDocument();
});
