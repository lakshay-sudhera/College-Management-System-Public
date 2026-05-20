import axios from "axios";

const API = axios.create({
  baseURL: "https://college-management-system-public.onrender.com/api",
});

//Attach token to API
// Axios provides interceptors to run code before a request is sent or after a response is received.
// .request.use() specifically intercepts outgoing requests.
// It takes two optional functions:
// axios.interceptors.request.use(onFulfilled, onRejected);
// onFulfilled → Runs before the request is sent. You can modify the request config here.
// onRejected → Runs if there’s an error before sending the request.
API.interceptors.request.use((req) => {
// This function runs before every request made using API
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;