export const invoices_form_page = {
  1: {
    title: "Invoice Information",
  },
  2: {
    title: "Billing and Shipping",
  },
  3: {
    title: "Services and Taxes",
  },
  4: {
    title: "Terms of Payment",
  },
  5: {
    title: "Company Address",
  },
};

export const address_do = {
  0: { key: "customer_name", title: "Customer Name" },
  1: { key: "street_address", title: "Street Address" },
  2: { key: "city", title: "City" },
  3: { key: "state", title: "State" },
  4: { key: "zip", title: "Zip" },
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
  2: { key: "cheque_amount", title: "Cheque Amount" },
};

export const terms_and_condition_do = {
  bank_account: {
    icon: "fas fa-building-columns",
    text: (
      <>
        All payments must be made via bank transfer to the <br />
        account details provided on the invoice.
      </>
    ),
  },
  cheque: {
    icon: "fas fa-money-check",
    text: (
      <>
        Cheques must be dated and signed by an <br />
        authorized signatory of the payer.
      </>
    ),
  },
  cash: {
    icon: "fas fa-money-bill-1",
    text: (
      <>
        Payments must be made in full at the <br />
        time of delivery or service completion.
      </>
    ),
  },
};

export const TaxEmptyState = { name: "", percentage: "", total: 0 };
export const ServiceEmptyState = {
  name: "",
  description: "",
  hsn_code: "",
  quantity: "",
  price: "",
  total: 0,
};
export const InvoiceFormEmptyState = {
  billing_address: [
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
  shipping_address: [
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
  services: [
    {
      name: "",
      description: "",
      hsn_code: "",
      quantity: "",
      price: "",
      total: 0,
    },
  ],
  taxes: [],
  invoice_id: "",
  dop: "",
  buyers_gst: "",
  is_round_off: false,
  round_off: 0,
  total_amount: 0,
  company_name: "",
  phone: "",
  website_link: "",
  contact_mail: "",
  sellers_gst: "",
  logo_file: "",
  delivery_note: "",
  delivery_note_date: "",
  supplier_references: "",
  other_references: "",
  buyers_order_no: "",
  despatch_doc_no: "",
  despatched_through: "",
  destination: "",
  terms_of_delivery: "",
  payment_terms: ["cash"],

  upi_file: "",
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
    {
      value: "",
    },
  ],

  ad_file: "",
};

export const custom_invoice_state = {
  0: { state: 0, title: "Outstanding" },
  1: { state: 1, title: "Payment Required" },
  2: { state: 1, title: "Paid" },
};
export const custom_invoice_state_options = [
  { state: null, title: "ALL", class: "" },
  { state: 0, title: "Outstanding", class: "" },
  { state: 1, title: "Payment Required", class: "text-red-500" },
  { state: 2, title: "Paid", class: "" },
];

export const custom_invoice_payment_terms = {
  bank_account: { state: 0, title: "Bank Account" },
  cheque: { state: 1, title: "Cheque" },
  cash: { state: 1, title: "Cash" },
};
export const custom_invoice_payment_terms_options = [
  { state: "", title: "ALL", class: "" },
  { state: "bank_account", title: "Bank Account", class: "" },
  { state: "cheque", title: "Cheque", class: "" },
  { state: "cash", title: "Cash", class: "" },
];

// Remove this
export const ExampleInvoiceState = {
  billing_address: [
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
      value: "GA",
    },
    {
      value: "",
    },
  ],
  shipping_address: [
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
  services: [
    {
      name: "Item 1",
      description: "Item 1 Desc",
      hsn_code: "HSN0013",
      quantity: "12",
      price: "0",
      total: 0,
    },
    {
      name: "Item 1",
      description: "Item 2 Desc",
      hsn_code: "HSN0012",
      quantity: "12",
      price: "33",
      total: 396,
    },
  ],
  taxes: [
    {
      name: "GST",
      percentage: "12",
      total: 47.52,
    },
  ],
  invoice_id: "FN8D2BF26A",
  dop: "2024-05-14",
  buyers_gst: "54654",
  is_round_off: false,
  round_off: 0.52,
  total_amount: 443.52,
  company_name: "FNB",
  phone: "07904791417",
  website_link: "fnbill.com",
  contact_mail: "admin@fnbill.com",
  sellers_gst: "E21321",
  logo_file: "6643f5642496d.bmp",
  delivery_note: "asd",
  delivery_note_date: "",
  supplier_references: "das",
  other_references: "dad",
  buyers_order_no: "",
  despatch_doc_no: "asd",
  despatched_through: "",
  destination: "",
  terms_of_delivery: "",
  payment_terms: "cheque",

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
      value: "23423423",
    },
    {
      value: "02/12/23",
    },
    {
      value: "23232",
    },
  ],

  ad_file: "",
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

export const AddAnotherInvoiceDialog = {
  open: true,
  onConfirmText: "Add Another",
  onCloseText: "Generate Current Invoice",
  title: "Add Another Invoice",
  message: "Do you want to add another invoice?",
  state: "success",
  icon: "fa-triangle-exclamation",
};

export const RemoveServiceDialog = {
  open: true,
  title: "Remove Service",
  message: "Are you sure you want to remove this service?",
  state: "danger",
  icon: "fa-triangle-exclamation",
};

export const RemoveTaxDialog = {
  open: true,
  title: "Remove Tax",
  message: "Are you sure you want to remove this tax?",
  state: "danger",
  icon: "fa-triangle-exclamation",
};
