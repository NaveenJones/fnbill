export const address_do = [
  { key: "customer_name", title: "Customer Name" },
  { key: "street_address", title: "Street Address" },
  { key: "city", title: "City" },
  { key: "state", title: "State" },
  { key: "zip", title: "Zip" },
];
export const AddressEmptyState = [
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
  {
    value: "",
  },
];

export const RemoveAddressDialog = {
  open: true,
  title: "Remove Address",
  message: "Are you sure you want to remove this address?",
  state: "danger",
  icon: "fa-triangle-exclamation",
};

export const CompanyInformationFormEmptyState = {
  address_list: [],
  company_address: [
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
    {
      value: "",
    },
  ],

  company_name: "",
  phone: "",
  website_link: "",
  contact_mail: "",
  sellers_gst: "",
  logo_file: "",
  payment_terms: [],
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

// Dialog Options

export const DialogInitState = {
  open: false,
  title: "Invoice Actions",
  message: "Are you sure?",
  state: "success",
  icon: "fa-triangle-exclamation",
  callbackOnSuccess: () => {},
  callbackOnFailed: () => {},
};

export const AddAnotherDialog = {
  open: true,
  title: "Add Another Invoice",
  message: "Do you want to add another Company?",
  state: "success",
  icon: "fa-triangle-exclamation",
};

export const bank_account_do = [
  { key: "name", title: "Name" },
  { key: "bank_name", title: "Bank Name" },
  { key: "account_number", title: "Account Number" },
  { key: "ifsc_code", title: "IFSC Code" },
  { key: "upi_id", title: "UPI ID" },
];
export const cheque_do = [
  { key: "cheque_no", title: "Cheque No" },
  { key: "cheque_date", title: "Cheque Date" },
];
