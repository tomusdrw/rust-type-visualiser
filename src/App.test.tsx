import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should not crash', () => {
  render(<App />)
});
