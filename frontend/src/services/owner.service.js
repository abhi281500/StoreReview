import api from "./api.js"

export const getOwnerDashboard = async () => {
  const { data } = await api.get("/owner/dashboard");
  return data;
};


export const getOwnerRatings = async () => {
  const { data } = await api.get("/owner/ratings");
  return data;
};

export const  updateOwnerPassword = async (credentials) => {
  const { data } = await api.put("/owner/password",credentials);
  return data;
};


