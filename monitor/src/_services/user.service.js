import axios from "axios";
import {authHeader} from "../_helpers/auth-header";
const API_URL = "http://localhost:5000/api/";
const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};
// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };
const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "all", { headers: authHeader()  });
}

const makeActive = (username) => {
  return axios.put(API_URL + 'active',{ headers: authHeader() } );
}
const UserService = {
  getPublicContent,
  getUserBoard,
//   getModeratorBoard,
  getAdminBoard,
  getAll,
  makeActive,
};
export default UserService;