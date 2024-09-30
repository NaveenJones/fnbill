export const InvoicePaymentFormEmptyState = {
  amount: "",
  payment_terms: "bank_account",
  paid_by: "",
  paid_on: "",
  bank_account: [
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
  ],
  cheque: [
    {
      value: "",
    },
    {
      value: "",
    },
  ],
};

export const bank_account_do = {
  0: { key: "name", title: "Name" },
  1: { key: "bank_name", title: "Bank Name" },
  2: { key: "account_number", title: "Account Number" },
  3: { key: "ifsc_code", title: "IFSC Code" },
  4: { key: "upi_id", title: "UPI ID" },
};
export const cheque_do = {
  0: { key: "cheque_no", title: "Cheque No" },
  1: { key: "cheque_date", title: "Cheque Date" },
};
