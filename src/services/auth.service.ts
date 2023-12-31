import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const signUp = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signUp", {
        username,
        email,
        password,
    });
};

export const signIn = (username: string, password: string) => {
    return axios
        .post(API_URL + "signIn", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};