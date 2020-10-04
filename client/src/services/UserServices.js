import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/register", {
      phone_number: newUser.phone_number,
      password: newUser.password,
    })
    .then((response) => {
      return response.data;
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/login", {
      phone_number: user.phone_number,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("user", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProfile = (user) => {
  return axios
    .get("users/profile", {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
