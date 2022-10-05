import axios from 'axios';

const api = axios.create({
  baseURL: 'http://20.242.111.210:5000/Api/',
});

export default api;
