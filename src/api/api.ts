import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  AppConfig,
} from './config';

export const baseAPI: AxiosInstance = axios.create({
  baseURL: AppConfig.baseURL,
});

const responseSuccessInterceptor = (response: AxiosResponse) => {
  const data = response.data;

  return { data } as AxiosResponse;
};

const errorInterceptor = (error: AxiosError) => {
  const responseError = error?.response?.data;

  return { error: responseError || error };
};

baseAPI.interceptors.response.use(responseSuccessInterceptor, errorInterceptor);