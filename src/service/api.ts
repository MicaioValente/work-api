import axios from 'axios';

const api = axios.create({
  baseURL: 'https://report.workdb.com.br/api/',
});

export default api;
