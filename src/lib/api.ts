// API Configuration for NestJS Backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Utility to always include the auth token
function getAuthHeader() {
  const token = localStorage.getItem('pap_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Generic API call function
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers,
      },
      ...options,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = (result as any)?.message || response.statusText;
      throw new Error(message);
    }

    return (result as any).data ?? result;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

export async function uploadFile(file: File): Promise<{ url: string }> {
  const url = `${API_BASE_URL}/upload`;
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (result as any)?.message || response.statusText;
    throw new Error(message);
  }

  return result;
}

// Pastors API
export const pastorsAPI = {
  getAll: () => apiCall('/pastors'),
  getById: (id: string) => apiCall(`/pastors/${id}`),
  create: (data: any) => apiCall('/pastors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/pastors/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/pastors/${id}`, { method: 'DELETE' }),
};

// Ministries API
export const ministriesAPI = {
  getAll: () => apiCall('/ministries'),
  getById: (id: string) => apiCall(`/ministries/${id}`),
  create: (data: any) => apiCall('/ministries', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/ministries/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/ministries/${id}`, { method: 'DELETE' }),
};

// Sermons API
export const sermonsAPI = {
  getAll: () => apiCall('/sermons'),
  getById: (id: string) => apiCall(`/sermons/${id}`),
  create: (data: any) => apiCall('/sermons', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/sermons/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/sermons/${id}`, { method: 'DELETE' }),
};

// Events API
export const eventsAPI = {
  getAll: () => apiCall('/events'),
  getById: (id: string) => apiCall(`/events/${id}`),
  create: (data: any) => apiCall('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/events/${id}`, { method: 'DELETE' }),
};

// Users API
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id: string) => apiCall(`/users/${id}`),
  create: (data: any) => apiCall('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/users/${id}`, { method: 'DELETE' }),
};

// Gallery API
export const galleryAPI = {
  getAll: () => apiCall('/gallery'),
  getById: (id: string) => apiCall(`/gallery/${id}`),
  create: (data: any) => apiCall('/gallery', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/gallery/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/gallery/${id}`, { method: 'DELETE' }),
};
