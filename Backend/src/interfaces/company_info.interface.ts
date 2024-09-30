export interface AddressInterface {
  value: string;
}

export interface CompanyInfoInterface {
  name: string;
  info: {
    logo_file: string;
    sellers_gst: string;
    company_name: string;
    contact_mail: string;
    website_link: string;
    phone: string;
    company_address: AddressInterface[];
  };
}
