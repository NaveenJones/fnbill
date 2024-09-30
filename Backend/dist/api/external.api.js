"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAPI = exports.getAllUsersAPI = exports.getTokenAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const getTokenAPI = async () => {
    try {
        const response = await axios_1.default.post("https://auth.fnmoney.ai/realms/master/protocol/openid-connect/token", new URLSearchParams({
            client_id: "Mfnauth",
            username: "admin",
            password: "VosL1CD9JMJJylWH0pKK",
            grant_type: "password",
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response;
    }
    catch (error) {
        console.error("Error fetching token:", error);
        throw error;
    }
};
exports.getTokenAPI = getTokenAPI;
const getAllUsersAPI = async (token) => {
    try {
        const response = await axios_1.default.get("https://auth.fnmoney.ai/admin/realms/fnauth/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
exports.getAllUsersAPI = getAllUsersAPI;
const createUserAPI = async (token, userData) => {
    try {
        const response = await axios_1.default.post("https://auth.fnmoney.ai/admin/realms/fnauth/users", userData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
exports.createUserAPI = createUserAPI;
