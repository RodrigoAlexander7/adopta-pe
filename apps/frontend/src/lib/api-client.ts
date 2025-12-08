import axios, { AxiosInstance } from 'axios';
import type {
  Pet,
  Story,
  Shelter,
  AdoptionForm,
  CreatePetDto,
  CreateStoryDto,
  CreateShelterDto,
  CreateAdoptionDto,
  User,
} from '@/types';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  me: () => apiClient.get<User>('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};

// Pets API
export const petsApi = {
  getAll: (params?: { species?: string; size?: string; search?: string }) =>
    apiClient.get<Pet[]>('/pets', { params }),
  
  getById: (id: string) =>
    apiClient.get<Pet>(`/pets/${id}`),
  
  getMyPets: () =>
    apiClient.get<Pet[]>('/pets/me'),
  
  create: (data: CreatePetDto) =>
    apiClient.post<Pet>('/pets', data),
  
  update: (id: string, data: Partial<CreatePetDto>) =>
    apiClient.put<Pet>(`/pets/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/pets/${id}`),
};

// Stories API
export const storiesApi = {
  getAll: () =>
    apiClient.get<Story[]>('/stories'),
  
  getById: (id: string) =>
    apiClient.get<Story>(`/stories/${id}`),
  
  getMyStories: () =>
    apiClient.get<Story[]>('/stories/me'),
  
  create: (data: CreateStoryDto) =>
    apiClient.post<Story>('/stories', data),
  
  delete: (id: string) =>
    apiClient.delete(`/stories/${id}`),
};

// Shelters API
export const sheltersApi = {
  getAll: () =>
    apiClient.get<Shelter[]>('/shelters'),
  
  getById: (id: string) =>
    apiClient.get<Shelter>(`/shelters/${id}`),
  
  create: (data: CreateShelterDto) =>
    apiClient.post<Shelter>('/shelters', data),
};

// Adoptions API
export const adoptionsApi = {
  getMyAdoptions: () =>
    apiClient.get<AdoptionForm[]>('/adoptions/me'),
  
  getByShelter: () =>
    apiClient.get<AdoptionForm[]>('/adoptions/shelter'),
  
  create: (data: CreateAdoptionDto) =>
    apiClient.post<AdoptionForm>('/adoptions', data),
  
  updateStatus: (id: string, status: string) =>
    apiClient.patch<AdoptionForm>(`/adoptions/${id}/status`, { status }),
};

// Export the client for custom requests
export default apiClient;
