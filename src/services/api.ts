import axios from "axios";
import { KEY_REFRESH_TOKEN, KEY_SIGNED, KEY_TOKEN } from "../utils/consts";

const baseApiURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://pinte4.herokuapp.com/api/";
  }
  return import.meta.env.VITE_APP_API;
};

export const api = axios.create({
  baseURL: baseApiURL(),
  timeout: 12000,
  headers: {
    Authorization: localStorage.getItem(KEY_TOKEN)
      ? "Bearer " + localStorage.getItem(KEY_TOKEN)
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      console.log("1");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseApiURL + "accounts/token/refresh/"
    ) {
      window.location.href = "/login";
      console.log("2");
      localStorage.removeItem(KEY_SIGNED);
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN);
      console.log("3");
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);
        console.log("4");
        if (tokenParts.exp > now) {
          console.log("5");
          return api
            .post("accounts/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem(KEY_TOKEN, response.data.access);
              localStorage.setItem(KEY_REFRESH_TOKEN, response.data.refresh);

              api.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return api(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login";
          console.log("6");
          localStorage.removeItem(KEY_SIGNED);
        }
      } else {
        console.log("Refresh token not available.");
        console.log("7");
        localStorage.removeItem(KEY_SIGNED);
        window.location.href = "/login";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
