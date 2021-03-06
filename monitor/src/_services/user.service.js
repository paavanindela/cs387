import axios from "axios";
import {authHeader} from "../_helpers/auth-header";
const API_URL = "http://localhost:5000/api/";
const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "all", { headers: authHeader()  });
}

const makeActive = (username) => {
  return axios.put(API_URL + 'active',{username},{ headers: authHeader()  });
}

const revokeAccess = (username) => {
  return axios.put(API_URL + 'revoke',{username},{ headers: authHeader() } );
}

const deleteController = (username) => {
  return axios.delete(API_URL + 'controller/delete/'+ username,{ headers: authHeader() } ).then(
    (response) => {
      return response.data;
    }
  );
}

const addHosts = (username, list) => {
  // console.log(username)
  return axios.post(API_URL + 'chcacm/'+username, {'hlist':list,'alist':[],'mlist':[]}, { headers: authHeader() }).then(
    (response) => {
      // console.log(response);
      return response;
    }
  );
}

const getHosts = (username) => {
  // console.log(username)
  return axios.get(API_URL + 'chcacm/'+ username, { headers: authHeader() }).then(
    (response) => {
      return response.data;
    }
  );
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getAll,
  makeActive,
  revokeAccess,
  deleteController,
  addHosts,
  getHosts,
};
export default UserService;