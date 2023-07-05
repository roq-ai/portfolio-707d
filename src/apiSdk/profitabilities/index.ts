import axios from 'axios';
import queryString from 'query-string';
import { ProfitabilityInterface, ProfitabilityGetQueryInterface } from 'interfaces/profitability';
import { GetQueryInterface } from '../../interfaces';

export const getProfitabilities = async (query?: ProfitabilityGetQueryInterface) => {
  const response = await axios.get(`/api/profitabilities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProfitability = async (profitability: ProfitabilityInterface) => {
  const response = await axios.post('/api/profitabilities', profitability);
  return response.data;
};

export const updateProfitabilityById = async (id: string, profitability: ProfitabilityInterface) => {
  const response = await axios.put(`/api/profitabilities/${id}`, profitability);
  return response.data;
};

export const getProfitabilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/profitabilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProfitabilityById = async (id: string) => {
  const response = await axios.delete(`/api/profitabilities/${id}`);
  return response.data;
};
