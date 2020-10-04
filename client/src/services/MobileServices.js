import axios from "axios";

//create new mobile
export const createMobile = (newMobile) => {
  return axios
    .post("http://localhost:5000/create", {
      brand: newMobile.brand,
      model: newMobile.model,
      price: newMobile.price,
    })
    .then((response) => {
      return response.data;
    });
};

//get all mobiles
export const getAllMobiles = () => {
  return axios.post("http://localhost:5000/read").then((response) => {
    return response.data;
  });
};

//update mobile
export const updateMobile = (editMobile) => {
  return axios
    .post(`http://localhost:5000/update/${editMobile.id}`, {
      brand: editMobile.brand,
      model: editMobile.model,
      price: editMobile.price,
    })
    .then((response) => {
      return response.data;
    });
};

//delete mobile
export const deleteMobile = (mobileId) => {
  return axios
    .post(`http://localhost:5000/delete/${mobileId}`)
    .then((response) => {
      return response.data;
    });
};
