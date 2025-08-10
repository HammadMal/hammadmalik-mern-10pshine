import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../tests/utils/testUtils';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders navbar with logo and brand name', () => {
    render(<Navbar />);
    
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('NoteHive')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<Navbar />);
    
    expect(screen.getByRole('button', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /faqs/i })).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    render(<Navbar />);
    
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});