export type StateInterface = 0 | 1 | 2;

export interface AddressInterface {
  value: string;
}
export interface PaymentInterface {
  value: string;
}

export interface ServiceInterface {
  name: string;
  description: string;
  hsn_code: string;
  quantity: string;
  price: string;
  total: number;
}

export interface TaxInterface {
  name: string;
  percentage: string;
  total: number;
}

export interface PaymentDetailsInterface {
  due_amount: number;
  amount: number;
  payment_terms: string;
  paid_by: string;
  paid_on: string;
  bank_account: PaymentInterface[];
  cheque: PaymentInterface[];
}

export interface CustomInvoiceInterface {
  billing_address: AddressInterface[];
  shipping_address: AddressInterface[];
  company_address: AddressInterface[];
  services: ServiceInterface[];
  taxes: TaxInterface[];
  invoice_id: string;
  dop: string;
  buyers_gst: string;
  is_round_off: boolean;
  round_off: number;
  total_amount: number;
  company_name: string;
  phone: string;
  website_link: string;
  contact_mail: string;
  sellers_gst: string;
  logo_file: string;
  delivery_note: string;
  delivery_note_date: string;
  supplier_references: string;
  other_references: string;
  buyers_order_no: string;
  despatch_doc_no: string;
  despatched_through: string;
  destination: string;
  terms_of_delivery: string;
  payment_terms: "bank_account" | "cheque" | "cash";
  bank_account: PaymentInterface[];
  cheque: PaymentInterface[];
  upi_file: string;
  ad_file: string;
  ad_name: string;
}
