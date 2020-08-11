import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true; //跨域访问需要发送cookie时一定要加axios.defaults.withCredentials = true;
const base = "http://47.101.33.200:9531/";
// const base = "http://localhost:9531/";
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data);
};
export const GET = (url, params) => {
  return axios
    .get(`${base}${url}`, {
      params: params
    })
    .then(res => res.data);
};
export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data);
};
export const POSTUP = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data);
};
export const DELETE = (url, params) => {
  return axios
    .delete(`${base}${url}`, {
      params: params
    })
    .then(res => res.data);
};
