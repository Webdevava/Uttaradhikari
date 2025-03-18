
// auth-api.js
import api from "./api";

export const signupUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup/", {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      mobile: userData.phoneNumber,
      dob: userData.dob,
      password: userData.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otpData, config = {}) => {
  try {
    const response = await api.post("/auth/verify-otp/", otpData, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (config = {}) => {
  try {
    const response = await api.post("/auth/resend-otp/", {}, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login/", {
      mobile: loginData.phoneNumber,
      password: loginData.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh-token/", {
      refresh_token: refreshToken,
    });
    return response;
  } catch (error) {
    throw error;
  }
};