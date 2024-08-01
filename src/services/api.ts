import axios from "axios";
import {
  KEY_REFRESH_TOKEN,
  KEY_SIGNED,
  KEY_TOKEN,
  KEY_USER,
} from "../utils/consts";

const baseApiURL = () => {
  if (process.env.NODE_ENV === "production") {
    return import.meta.env.VITE_APP_API;
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
      // alert(
      //   "A server/network error occurred. " +
      //     "Looks like CORS might be the problem. " +
      //     "Sorry about this - we will get it fixed shortly."
      // );

      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseApiURL + "accounts/token/refresh/"
    ) {
      clearLogin();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return api
            .post("arefresh/", { refresh: refreshToken })
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
          clearLogin();
          window.location.href = "/login";
        }
      } else {
        console.log("Refresh token not available.");
        clearLogin();
        window.location.href = "/login";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

const clearLogin = () => {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_SIGNED);
  localStorage.removeItem(KEY_TOKEN);
  localStorage.removeItem(KEY_REFRESH_TOKEN);
};
