import api from './api';

export interface Guide {
  _id: string;
  title: string;
  description: string;
  audience?: string;
  status: 'DRAFT' | 'GENERATED';
  createdAt: string;
  updatedAt: string;
}

export interface Step {
  _id: string;
  guide: string;
  title: string;
  description: string;
  orderIndex: number;
  imageUrl?: string;
}

export const getGuides = async () => {
  const response = await api.get('/guides');
  return response.data;
};

export const getGuideById = async (id: string) => {
  const response = await api.get(`/guides/${id}`);
  return response.data;
};

export const createGuide = async (data: { title: string; description?: string; audience?: string }) => {
  const response = await api.post('/guides', data);
  return response.data;
};

export const deleteGuide = async (id: string) => {
  const response = await api.delete(`/guides/${id}`);
  return response.data;
};

export const generateSummary = async (id: string) => {
  const response = await api.post(`/guides/${id}/generate-summary`);
  return response.data;
};

export const getSteps = async (guideId: string) => {
  const response = await api.get(`/guides/${guideId}/steps`);
  return response.data;
};

export const addStep = async (guideId: string, data: { title: string; description: string; orderIndex?: number }) => {
  const response = await api.post(`/guides/${guideId}/steps`, data);
  return response.data;
};

export const deleteStep = async (guideId: string, stepId: string) => {
  const response = await api.delete(`/guides/${guideId}/steps/${stepId}`);
  return response.data;
};
