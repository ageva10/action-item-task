import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api'
})

axiosInstance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response: AxiosResponse) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export { axios, axiosInstance }