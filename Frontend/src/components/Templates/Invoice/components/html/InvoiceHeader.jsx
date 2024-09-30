import React, { Fragment } from "react";
import { ImageDownloadURL } from "../../../../../env";

const InvoiceHeader = ({ invoice }) => {
  const company_address = invoice.company_address;
  console.log(invoice);
  return (
    <div className="flex flex-row justify-between mt-3">
      <div className="flex justify-start ">
        <img className="w-20 h-16" src={`${ImageDownloadURL}${invoice.logo_file}`} />
      </div>
      <div className="flex justify-start ">
        <div className="mt-3 flex flex-col justify-start">
          {/* <div className="text-sm font-bold">#{invoice.invoice_id}</div>
           <div>{invoice.dop}</div> */}
          <div className="font-bold"> {invoice.company_name}</div>
          <div className="font-medium"> {invoice.website_link}</div>

          <div>{company_address[1].value},</div>
          <div>
            {company_address.map((address, index) => {
              if (index === 0 || index === 1) return;
              const value = address.value;
              if (index === company_address.length - 1) return <Fragment key={`company_address_${index}`}>{value}</Fragment>;
              return <Fragment key={`company_address_${index}`}>{value}, </Fragment>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
