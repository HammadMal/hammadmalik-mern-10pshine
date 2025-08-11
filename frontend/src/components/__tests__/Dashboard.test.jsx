// src/components/__tests__/Dashboard.test.jsx
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render, userEvent, setupFetchMock } from '../../tests/utils/testUtils';
import Dashboard from '../Dashboard';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock apiService
jest.mock('../../services/apiService', () => ({
  checkAuth: jest.fn(),
  getNotes: jest.fn(),
  getNoteStats: jest.fn(),
  logout: jest.fn(),
  toggleStar: jest.fn(),
  deleteNote: jest.fn(),
}));

import apiService from '../../services/apiService';

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock responses
    apiService.checkAuth.mockResolvedValue({
      status: true,
      user: 'testuser@example.com'
    });
    
    apiService.getNotes.mockResolvedValue({
      notes: [
        {
          _id: '1',
          title: 'Test Note 1',
          content: '<p>This is test content</p>',
          tags: ['test'],
          isStarred: false,
          wordCount: 4,
          createdAt: '2024-01-01T10:00:00Z',
          modifiedAt: '2024-01-01T10:00:00Z',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalNotes: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
    
    apiService.getNoteStats.mockResolvedValue({
      stats: {
        totalNotes: 1,
        starredNotes: 0,
        archivedNotes: 0,
        recentNotes: 1,
      },
    });
  });

  it('renders dashboard header correctly', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('My Notes')).toBeInTheDocument();
      expect(screen.getByText('New Note')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });
  });

  it('renders search and filter controls', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search notes...')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Notes')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Last Modified')).toBeInTheDocument();
    });
  });

  it('displays notes when loaded', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no notes', async () => {
    apiService.getNotes.mockResolvedValue({
      notes: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalNotes: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('No notes yet')).toBeInTheDocument();
      expect(screen.getByText('Create your first note to get started')).toBeInTheDocument();
    });
  });

  it('handles search input', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search notes...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search notes...');
    await user.type(searchInput, 'test query');
    
    expect(searchInput).toHaveValue('test query');
  });

  it('handles logout', async () => {
    const user = userEvent.setup();
    apiService.logout.mockResolvedValue({ success: true });
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    const logoutButton = screen.getByText('Sign Out');
    await user.click(logoutButton);
    
    expect(apiService.logout).toHaveBeenCalled();
  });

  it('navigates to note editor when creating new note', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('New Note')).toBeInTheDocument();
    });

    const newNoteButton = screen.getByText('New Note');
    await user.click(newNoteButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/note-editor');
  });

  it('handles filter change', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('All Notes')).toBeInTheDocument();
    });

    const filterSelect = screen.getByDisplayValue('All Notes');
    await user.selectOptions(filterSelect, 'starred');
    
    expect(filterSelect).toHaveValue('starred');
  });

  it('redirects to signin when not authenticated', async () => {
    apiService.checkAuth.mockResolvedValue({
      status: false,
    });

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
  });
});