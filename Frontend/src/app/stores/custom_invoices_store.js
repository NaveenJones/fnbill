import { create } from "zustand";
import { getAllAdvertisementAPI, getAllCompaniesAPI, getAllCustomInvoicesAPI } from "../api";

const InitialCustomInvoicesState = {
  records: [],
  company_info: [],
  ad_info: [],
  selected_custom_invoice_idx: null,
  length: 0,
};

export const useCustomInvoicesState = create((set) => ({
  custom_invoices: InitialCustomInvoicesState,
  getAllInvoices: async () => {
    const response = await getAllCustomInvoicesAPI();
    if (response.code === 1200) {
      const content = response.content;
      set((state) => ({
        custom_invoices: {
          ...state.custom_invoices,
          records: content,
          length: content.length,
          selected_custom_invoice_idx: null,
        },
      }));
    }
  },
  getAllPreset: async () => {
    const advertisements_response = await getAllAdvertisementAPI();
    if (advertisements_response.code === 1200) {
      const content = advertisements_response.content;
      set((state) => ({
        custom_invoices: {
          ...state.custom_invoices,
          ad_info: content,
        },
      }));
    }
    const companies_response = await getAllCompaniesAPI();
    if (companies_response.code === 1200) {
      const content = companies_response.content;
      set((state) => ({
        custom_invoices: {
          ...state.custom_invoices,
          company_info: content,
        },
      }));
    }
  },
  setCustomInvoice: (payload) => {
    set((state) => ({
      custom_invoices: {
        ...state.custom_invoices,
        selected_custom_invoice_idx: payload,
      },
    }));
  },
  clearCustomInvoice: () => {
    set((state) => ({
      custom_invoices: {
        ...state.custom_invoices,
        selected_custom_invoice_idx: null,
      },
    }));
  },
  clearCustomInvoices: () => {
    set((state) => ({
      custom_invoices: { ...state.custom_invoices, InitialCustomInvoicesState },
    }));
  },
}));
