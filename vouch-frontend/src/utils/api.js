const BASE_URL = 'http://localhost:5000/api';

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const callApi = async (endpoint, options = {}) => {
  const token = getCookie('vouch_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const api = {
  auth: {
    login: (credentials) => callApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => callApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  },
  profile: {
    onboarding: (profileData) => callApi('/profile/onboarding', { method: 'POST', body: JSON.stringify(profileData) }),
    getMe: () => callApi('/profile/me', { method: 'GET' }),
  },
};
