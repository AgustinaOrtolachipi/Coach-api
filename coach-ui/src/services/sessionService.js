import axios from 'axios';

const API_URL = 'http://localhost:3001/sessions';


export const getSessions = () => {
  return axios.get(API_URL);
};

export const getSessionById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createSession = (session) => {
  return axios.post(API_URL, session);
};

export const updateSession = (id, session) => {
  return axios.patch(`${API_URL}/${id}`, session);
};

export const deleteSession = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const searchSessions = (title) => {
  return axios.get(`${API_URL}/search?title=${title}`);
};
