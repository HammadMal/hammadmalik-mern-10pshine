// src/components/__tests__/NoteEditor.test.jsx
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render, userEvent } from '../../tests/utils/testUtils';
import NoteEditor from '../NoteEditor';

// Mock useNavigate and useParams
const mockNavigate = jest.fn();
const mockParams = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams,
}));

// Mock apiService
jest.mock('../../services/apiService', () => ({
  getNote: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
  toggleStar: jest.fn(),
}));

import apiService from '../../services/apiService';

describe('NoteEditor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockParams.noteId = undefined; // Reset to new note by default
  });

  it('renders new note editor correctly', async () => {
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Untitled Note')).toBeInTheDocument();
      expect(screen.getByText('Create Note')).toBeInTheDocument();
    });
  });

  it('loads existing note when noteId is provided', async () => {
    mockParams.noteId = '123';
    
    apiService.getNote.mockResolvedValue({
      note: {
        _id: '123',
        title: 'Existing Note',
        content: '<p>Existing content</p>',
        tags: ['test'],
        isStarred: true,
        color: 'blue'
      }
    });

    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(apiService.getNote).toHaveBeenCalledWith('123');
    });
  });

  it('handles title input', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Untitled Note')).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText('Untitled Note');
    await user.type(titleInput, 'My New Note');
    
    expect(titleInput).toHaveValue('My New Note');
  });

  it('renders formatting toolbar', async () => {
    render(<NoteEditor />);
    
    await waitFor(() => {
      // Check for some formatting buttons
      expect(screen.getByTitle('Bold (Ctrl+B)')).toBeInTheDocument();
      expect(screen.getByTitle('Italic (Ctrl+I)')).toBeInTheDocument();
      expect(screen.getByTitle('Bullet List')).toBeInTheDocument();
    });
  });

  it('handles tag input', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a tag...')).toBeInTheDocument();
    });

    const tagInput = screen.getByPlaceholderText('Add a tag...');
    await user.type(tagInput, 'newtag{enter}');
    
    expect(tagInput).toHaveValue('');
    expect(screen.getByText('newtag')).toBeInTheDocument();
  });

  it('handles save button click for new note', async () => {
    const user = userEvent.setup();
    apiService.createNote.mockResolvedValue({
      note: { _id: '456', title: 'New Note' }
    });

    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByText('Create Note')).toBeInTheDocument();
    });

    // Add some content first
    const titleInput = screen.getByPlaceholderText('Untitled Note');
    await user.type(titleInput, 'Test Note');

    const saveButton = screen.getByText('Create Note');
    await user.click(saveButton);
    
    expect(apiService.createNote).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Note',
      })
    );
  });

  it('handles back button navigation', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Untitled Note')).toBeInTheDocument();
    });

    // Find the back button by looking for the ArrowLeft icon
    const buttons = screen.getAllByRole('button');
    const backButton = buttons.find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.querySelector('path[d="m12 19-7-7 7-7"]');
    });
    
    expect(backButton).toBeInTheDocument();
    await user.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('renders sidebar sections', async () => {
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByText('Tags')).toBeInTheDocument();
      expect(screen.getByText('Note Color')).toBeInTheDocument();
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    });
  });

  it('shows loading state when loading note', async () => {
    mockParams.noteId = '123';
    
    // Make the API call hang to test loading state
    apiService.getNote.mockImplementation(() => new Promise(() => {}));

    render(<NoteEditor />);
    
    expect(screen.getByText('Loading note...')).toBeInTheDocument();
  });

  it('handles note color selection', async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByText('Note Color')).toBeInTheDocument();
    });

    // Find Blue color button specifically
    const blueColorButton = screen.getByTitle('Blue');
    expect(blueColorButton).toBeInTheDocument();
    
    await user.click(blueColorButton);
    // Color selection is handled internally, just verify the button exists and is clickable
  });

  it('displays word and character count', async () => {
    render(<NoteEditor />);
    
    await waitFor(() => {
      expect(screen.getByText('0 words')).toBeInTheDocument();
      expect(screen.getByText('0 characters')).toBeInTheDocument();
    });
  });
});