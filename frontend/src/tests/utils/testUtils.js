// src/tests/utils/testUtils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Custom render function that includes providers
function render(ui, { route = '/', ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock API responses
export const mockApiResponses = {
  auth: {
    success: {
      status: true,
      user: 'testuser@example.com',
    },
  },
  notes: {
    success: {
      status: true,
      notes: [
        {
          _id: '1',
          title: 'Test Note 1',
          content: '<p>This is test content</p>',
          tags: ['test', 'sample'],
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
      },
    },
  },
};

// Mock fetch responses
export const setupFetchMock = (responses = {}) => {
  global.fetch = jest.fn((url, options) => {
    const method = options?.method || 'GET';
    const key = `${method} ${url}`;
    
    if (responses[key]) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responses[key]),
        status: 200,
      });
    }
    
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Not found' }),
      status: 404,
    });
  });
};

// Re-export everything
export * from '@testing-library/react';
export { render };
export { default as userEvent } from '@testing-library/user-event';