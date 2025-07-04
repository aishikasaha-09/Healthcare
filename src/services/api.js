const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  // Helper method to get headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Helper method to handle responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }
    return response.json();
  }

  // Auth methods
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await this.handleResponse(response);
    
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async register(userData) {
    console.log('Attempting to register with:', userData);
    console.log('API URL:', `${API_BASE_URL}/auth/register`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const data = await this.handleResponse(response);
      console.log('Registration successful:', data);
      
      if (data.token) {
        this.token = data.token;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async updateProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData),
    });
    
    return this.handleResponse(response);
  }

  async changePassword(passwords) {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(passwords),
    });
    
    return this.handleResponse(response);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Article methods
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/articles?${queryString}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getArticle(slug) {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async likeArticle(articleId) {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/like`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async bookmarkArticle(articleId) {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/bookmark`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getUserBookmarks() {
    const response = await fetch(`${API_BASE_URL}/articles/user/bookmarks`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Newsletter methods
  async subscribeToNewsletter(email, firstName, lastName) {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName }),
    });
    
    return this.handleResponse(response);
  }

  async unsubscribeFromNewsletter(email) {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return this.handleResponse(response);
  }

  async getSubscriptionStatus(email) {
    const response = await fetch(`${API_BASE_URL}/newsletter/status/${email}`);
    return this.handleResponse(response);
  }

  // User methods
  async getUserDashboard() {
    const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getReadingHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/user/reading-history?${queryString}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async trackReading(articleId, timeSpent) {
    const response = await fetch(`${API_BASE_URL}/user/track-reading`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ articleId, timeSpent }),
    });
    
    return this.handleResponse(response);
  }

  async getUserPreferences() {
    const response = await fetch(`${API_BASE_URL}/user/preferences`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async updateUserPreferences(preferences) {
    const response = await fetch(`${API_BASE_URL}/user/preferences`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(preferences),
    });
    
    return this.handleResponse(response);
  }

  async getUserAchievements() {
    const response = await fetch(`${API_BASE_URL}/user/achievements`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Analytics methods
  async trackEvent(eventType, eventData) {
    const response = await fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ eventType, eventData }),
    });
    
    return this.handleResponse(response);
  }

  // Utility methods
  isAuthenticated() {
    return !!this.token;
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}

export default new ApiService();