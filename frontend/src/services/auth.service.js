import api  from "./api.js"

export const registerUser =async(credentials)=> {
     const { data } = await api.post("/auth/register", credentials);
  return data;
}

export const loginUser =async(credentials)=> {
    const { data } = await api.post("/auth/login", credentials);
  return data;
}

export const logoutUser =async()=> {
    const { data } = await api.post("/auth/logout");
  return data;
}