import { http_client } from "./axios";
import { useGlobalState } from "./global_store";


// User API
export const getUsersAPI = async () => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.get(`users`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const createUserAPI = async (data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.post(`users`, data ,{
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

// Custom Invoice API
export const getCustomInvoicesAPI = async (id) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.get(`custom-invoices/${id}`, {
    params: { id },
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const getAllCustomInvoicesAPI = async () => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.get("custom-invoices", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const createCustomInvoiceAPI = async (data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.post("custom-invoices", data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const updateCustomInvoiceAPI = async (id, data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.put(`custom-invoices/${id}`, data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const updateCustomInvoiceStateAPI = async (id,state) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.patch(
    `custom-invoices/${id}`,
    {state},
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return res.data;
};


export const updateCustomInvoicePaymentAPI = async (id,data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.patch(
    `custom-invoices/payment/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return res.data;
};

export const deleteCustomInvoiceAPI = async (id) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.delete(
    `custom-invoices/${id}`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  return res.data;
};

// Company info API

export const getAllCompaniesAPI = async () => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.get("companies", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};
export const createCompanyAPI = async (data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.post("companies", data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const updateCompanyAPI = async (id, data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.put(`companies/${id}`, data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

// Advertisement Info API
export const getAllAdvertisementAPI = async () => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.get("advertisements", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};
export const createAdvertisementAPI = async (data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.post("advertisements", data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const updateAdvertisementAPI = async (id, data) => {
  const access_token = useGlobalState.getState().user_info.access_token;
  const res = await http_client.put(`advertisements/${id}`, data, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

// Download Images API

async function getImageBlob(image_id) {
  try {
    const response = await http_client.get(
      `file-handling/download.php?image=${image_id}`,
      {
        responseType: "blob",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const blob = response.data;
    return blob;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}
