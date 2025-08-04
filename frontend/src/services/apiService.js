// src/services/apiService.js
const API_BASE_URL = 'http://localhost:4000';

class ApiService {
  // Helper method for making authenticated requests
  async makeRequest(url, options = {}) {
    const config = {
      ...options,
      credentials: 'include', // Important: include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async checkAuth() {
    return this.makeRequest('/', {
      method: 'POST',
    });
  }

  async logout() {
    return this.makeRequest('/logout', {
      method: 'POST',
    });
  }

  // Note CRUD operations
  async createNote(noteData) {
    return this.makeRequest('/api/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  }

  async getNotes(queryParams = {}) {
    const searchParams = new URLSearchParams();
    
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== '') {
        if (Array.isArray(queryParams[key])) {
          searchParams.append(key, queryParams[key].join(','));
        } else {
          searchParams.append(key, queryParams[key]);
        }
      }
    });

    const queryString = searchParams.toString();
    const url = `/api/notes${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest(url);
  }

  async getNote(noteId) {
    return this.makeRequest(`/api/notes/${noteId}`);
  }

  async updateNote(noteId, noteData) {
    return this.makeRequest(`/api/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    });
  }

  async deleteNote(noteId) {
    return this.makeRequest(`/api/notes/${noteId}`, {
      method: 'DELETE',
    });
  }

  async toggleStar(noteId) {
    return this.makeRequest(`/api/notes/${noteId}/star`, {
      method: 'PATCH',
    });
  }

  async toggleArchive(noteId) {
    return this.makeRequest(`/api/notes/${noteId}/archive`, {
      method: 'PATCH',
    });
  }

  async getNoteStats() {
    return this.makeRequest('/api/notes/stats');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;