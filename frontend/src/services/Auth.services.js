import axios from "axios";

const API_URL = "http://localhost:9090/user/";


/*
 *Login
 */

 const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      },{header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json' }})
      .then((response) => {
        if (response.data.email) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const AuthService = {
    login,
  };
  
  export default AuthService;