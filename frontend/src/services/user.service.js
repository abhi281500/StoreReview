import api from "./api.js"

export const getStores= async () => {
  const { data } = await api.get("/user/stores");
  return data;
};

export const submitRating =async(credentials)=> {
    const { data } = await api.post("/user/ratings", credentials);
  return data;
}

export const  updateRating = async (id,credentials) => {
  const { data } = await api.put(`/user/ratings/${id}`,credentials);
  return data;
};

export const  updatePassword = async (credentials) => {
  const { data } = await api.put("/user/password",credentials);
  return data;
};
