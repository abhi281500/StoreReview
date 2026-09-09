import api from "./api.js";

export const getDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

export const createUser = async (credentials) => {
  const { data } = await api.post("/admin/users", credentials);
  return data;
};

export const createAdmin = async (credentials) => {
  const { data } = await api.post("/admin/admins", credentials);
  return data;
};

export const createStoreOwner = async (credentials) => {
  const { data } = await api.post("/admin/store-owners", credentials);
  return data;
};

export const createStore = async (credentials) => {
  const { data } = await api.post("/admin/stores", credentials);
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};

export const getStores = async () => {
  const { data } = await api.get("/admin/stores");
  return data;
};

export const updatePassword = async (credentials) => {
  const { data } = await api.put(
    "/admin/password",
    credentials
  );

  return data;
};