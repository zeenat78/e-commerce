import { API } from "../../backend";
// creating category
export const createCategory = (category, token, userId) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
//get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    // headers:{
    //     Accept:"application/json",
    //     // "Content-Type":"application/json"
    // }
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
//create a product
export const createProduct = (userId, product, token) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
//get all products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    // headers:{
    //     Accept:"application/json"
    // }
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
//get a product
export const getaProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
//update a product
export const updateProduct = ({ productId, userId, token, product }) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      // "Content-Type":"application/json",
      Authorization: `bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
//delete a product
export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",

      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
