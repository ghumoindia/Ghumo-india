import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

let tokenRefreshed = false;

const getToken = () => localStorage.getItem("accessToken");

const buildHeaders = (token) => {
  const headers = {};
  const finalToken = token || getToken();
  if (finalToken) headers["Authorization"] = `Bearer ${finalToken}`;
  return headers;
};

const handleUnauthorized = async (retryFn, url, data, params) => {
  tokenRefreshed = true;
  const { status, token } = await Api.generateToken();
  if (status !== "unauthorized") {
    tokenRefreshed = false;
    return retryFn(url, data, params, token);
  } else {
    tokenRefreshed = false;
    // User is not logged in, skip retry and return error
    throw new Error("Unauthorized and no token refresh possible");
  }
};

const catchUnauthorized = async (error, retryFn, url, data, params) => {
  const res = error?.response;
  const message = res?.data?.message;
  const isUnauthorized =
    (res?.status === 403 && message === "Invalid or expired token") ||
    (res?.status === 401 && message === "Invalid or expired token");

  // If request is public (no token), just throw
  if (!getToken()) {
    throw error;
  }

  if (!tokenRefreshed && isUnauthorized) {
    return await handleUnauthorized(retryFn, url, data, params);
  }

  console.error("API Error:", error);
  throw error;
};

const Api = {
  get: async (url, params = {}, token = null) => {
    try {
      const response = await instance.get(url, {
        params,
        headers: buildHeaders(token),
      });
      return response.data;
    } catch (error) {
      return await catchUnauthorized(error, Api.get, url, params);
    }
  },

  post: async (url, data = {}, params = {}, token = null) => {
    try {
      let payload = data;

      if (data.hasFiles) {
        payload = new FormData();
        for (const key in data) {
          if (key === "hasFiles") continue;
          const value = data[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if (item instanceof File) {
                payload.append(`${key}`, item);
              } else {
                payload.append(`${key}`, JSON.stringify(item));
              }
            });
          } else if (value instanceof File) {
            payload.append(key, value);
          } else {
            payload.append(key, value);
          }
        }
      }

      const response = await instance.post(url, payload, {
        params,
        headers: {
          ...buildHeaders(token),
          ...(data.hasFiles && { "Content-Type": "multipart/form-data" }),
        },
      });
      return response.data;
    } catch (error) {
      return await catchUnauthorized(error, Api.post, url, data, params);
    }
  },

  put: async (url, data = {}, params = {}, token = null) => {
    try {
      const response = await instance.put(url, data, {
        params,
        headers: buildHeaders(token),
      });
      return response.data;
    } catch (error) {
      return await catchUnauthorized(error, Api.put, url, data, params);
    }
  },

  delete: async (url, params = {}, token = null) => {
    try {
      const response = await instance.delete(url, {
        params,
        headers: buildHeaders(token),
      });
      return response.data;
    } catch (error) {
      return await catchUnauthorized(error, Api.delete, url, params);
    }
  },

  generateToken: async () => {
    const refreshTokenData = localStorage.getItem("refreshToken");

    if (!refreshTokenData) {
      return { status: "unauthorized" };
    }

    try {
      const response = await instance.post(
        "/admin/v1/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshTokenData}`,
          },
        }
      );

      const accessToken = response.data?.token;
      const refreshToken = response.data?.refreshToken;
      const adminData = response.data?.adminData;

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminData", JSON.stringify(adminData));
      }

      return { status: "authorized", token: accessToken };
    } catch (error) {
      if (error.response?.status === 403) {
        console.error("Error refreshing token=====>:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("adminData");
        return { status: "unauthorized" };
      }
      throw new Error(error);
    }
  },
};

export default Api;
