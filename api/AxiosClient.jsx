// src/utils/axios.js or src/api/axios.js
import axios from 'axios';
import { getLocalStorage } from '../util/Localstorage';

const axiosPrivateInstance = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1/',
  // baseURL: "/api/v1",
  // baseURL: "https://usetaskfycom-backend-production.up.railway.app/api/v1",
  baseURL: "https://usetaskfycom-backend-production.up.railway.app/api/v1",
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getLocalStorage('jwtToken') || ''}`,
  },
});


const axiosPublicInstance = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1/',
    // baseURL: "/api/v1",
     baseURL: "https://usetaskfycom-backend-production.up.railway.app/api/v1",
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export  { axiosPrivateInstance, axiosPublicInstance };
