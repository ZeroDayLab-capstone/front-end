import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  timeout: 8000,
})

http.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('token')
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})
