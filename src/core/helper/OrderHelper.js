import { API } from "../../backend";
export const CreateOrder = ({ orderData, token, userId }) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
