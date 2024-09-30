import axios from "axios";
interface Credential {
  type: string;
  value: string;
  temporary: boolean;
}

interface UserData {
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  enabled: boolean;
  username: string;
  credentials: Credential[];
}

export const getTokenAPI = async () => {
  try {
    const response = await axios.post(
      "https://auth.fnmoney.ai/realms/master/protocol/openid-connect/token",
      new URLSearchParams({
        client_id: "Mfnauth",
        username: "admin",
        password: "VosL1CD9JMJJylWH0pKK",
        grant_type: "password",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const getAllUsersAPI = async (token: string) => {
  try {
    const response = await axios.get(
      "https://auth.fnmoney.ai/admin/realms/fnauth/users",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUserAPI = async (token: string, userData: UserData) => {
  try {
    const response = await axios.post(
      "https://auth.fnmoney.ai/admin/realms/fnauth/users",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
