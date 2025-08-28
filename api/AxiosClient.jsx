// src/utils/axios.js or src/api/axios.js
import axios from 'axios';
import { getLocalStorage } from '../util/Localstorage';

const axiosPrivateInstance = axios.create({
  // baseURL:  'http://localhost:8080/api/v1/',
  // baseURL: "/api/v1",
  baseURL: "https://usetaskfycom-backend-production.up.railway.app/api/v1",
  // baseURL: "https://ec2-18-61-66-135.ap-south-2.compute.amazonaws.com:8080/api/v1",
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getLocalStorage('jwtToken') || ''}`,
  },
});


const axiosPublicInstance = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1/',
    // baseURL: "/api/v1",
    //  baseURL: "https://ec2-18-61-66-135.ap-south-2.compute.amazonaws.com:8080/api/v1",
     baseURL: "https://usetaskfycom-backend-production.up.railway.app/api/v1",
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export  { axiosPrivateInstance, axiosPublicInstance };
