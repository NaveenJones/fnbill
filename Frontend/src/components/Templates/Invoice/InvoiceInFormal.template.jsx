import React, { useRef } from "react";
import "./components/css/InvoiceInFormal.template.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { address_do, bank_account_do, cheque_do, terms_and_condition_do } from "../../../forms/Invoice/CustomInvoice/CustomInvoice.do";
import { ImageDownloadURL } from "../../../env";
function InvoiceInFormalTemplate({ invoice, styling, ...rest }) {
  const containerRef = useRef(null);
  if (!invoice) return <></>;
  const {
    invoice_id,
    dop,
    services,
    taxes,
    total_amount,
    billing_address,
    shipping_address,
    company_address,
    company_name,
    phone,
    website_link,
    contact_mail,
    delivery_note,
    delivery_note_date,
    supplier_references,
    other_references,
    buyers_order_no,
    despatch_doc_no,
    despatched_through,
    destination,
    terms_of_delivery,
    payment_terms,
    bank_account,
    cheque,
    ad_file,
    logo_file,
    upi_file,
    sellers_gst,
    buyers_gst,
  } = invoice;

  const other_invoice_info = {
    invoice_id,
    dop,
    sellers_gst,
    buyers_gst,
    delivery_note,
    delivery_note_date,
    supplier_references,
    other_references,
    buyers_order_no,
    despatch_doc_no,
    despatched_through,
    destination,
    terms_of_delivery,
  };
  const other_invoice_info_keys = Object.keys(other_invoice_info);
  const other_invoice_info_length = other_invoice_info_keys.map((key) => other_invoice_info[key]).filter(Boolean).length;
  const half_length = Math.ceil(other_invoice_info_length / 2);
  return (
    <div className="invoice-informal flex justify-center w-[800px] " ref={containerRef} {...rest}>
      <div
        className="container rounded-[16px] max-h-[1200] p-8 flex flex-col gap-2"
        style={{
          color: styling.color,
          background: styling.background,
          backgroundSize: "cover",
        }}
      >
        <div
          className="py-3 px-8 rounded-t-[16px] rounded-b-[6px]  min-h-[100px] flex justify-between items-center border hover:bg-[white!important] hover:text-gray-900 "
          id="header"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="h-full max-w-60 text-sm">
            <div className="font-bold text-base">{company_name}</div>
            <div className="">
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
            {website_link && (
              <div className="">
                <a href={`${website_link}`}>{website_link}</a>
              </div>
            )}
            {contact_mail && (
              <div className="">
                <a href={`mailto:${contact_mail}`}>{contact_mail}</a>
              </div>
            )}
          </div>
          <div>
            <img className="max-w-[5.5rem] rounded-md" src={`${ImageDownloadURL}${invoice.logo_file}`} alt="" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="toggle-switch w-10">
              <label className="switch-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked
                  onChange={(e) => (containerRef.current.style.filter = e.target.checked ? "invert(0%)" : "invert(100%)")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <FontAwesomeIcon icon={"fas fa-user"} />
          </div>
        </div>

        {invoice.ad_file ? (
          <div className=" ">
            <div className="flex items-baseline justify-end gap-1 pb-2 ">
              <span className="text-sm font-bold text-[#5097f3]">ⓘ</span>
              <span className="text-sm font-bold text-[#5097f3]">Advertisement</span>
            </div>
            <div
              className="border rounded-[6px]  min-h-[100px]  hover:bg-[white!important] hover:text-gray-900"
              id="advertisement"
              style={{
                background: styling.cardBackground,
                borderColor: styling.color,
              }}
            >
              <img className="h-96 w-full rounded-[6px] object-cover object-center" src={`${ImageDownloadURL}${invoice.ad_file}`} alt="" />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div
          className="py-3 px-8 rounded-[6px] border hover:bg-[white!important] hover:text-gray-900"
          id="invoice"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="flex justify-between">
            <div className="text-left">
              <div className="text-sm ">Amount to be Paid</div>
              <div className="text-lg font-bold flex items-center gap-1">
                <span>₹ {total_amount}</span>
                <span className="text-blue-500">ⓘ</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{moment().format("ddd, DD-MM-yyyy  h:mm A")}</div>
              <div className="text-lg font-bold   gap-1">
                {services.length}
                {services.length > 1 ? " Items" : " Item"}
              </div>
            </div>
          </div>
        </div>

        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="service"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3">Services Information</div>
          <div className="text-left py-2 font-bold">Invoice #{invoice_id}</div>
          <div className="w-full py-2">
            <div className="w-full flex gap-3 justify-between font-semibold">
              <div className="w-[30%] text-left">Services</div>
              <div className="w-[20%] text-center">HSN Code</div>
              <div className="w-[15%] text-center">Qty</div>
              <div className="w-[15%] text-center">Price</div>
              <div className="w-[20%] text-right">Amount</div>
            </div>
            {services.map((service, idx) => (
              <div className="w-full flex gap-3 justify-between" key={idx.toString()}>
                <div className="w-[30%] text-left">
                  {service.name}
                  {"\n"}
                  <div>{service.description}</div>
                </div>
                <div className="w-[20%] text-center">{service.hsn_code}</div>
                <div className="w-[15%] text-center">{service.quantity}</div>
                <div className="w-[15%] text-center">{service.price}</div>
                <div className="w-[20%] text-right">{service.total}</div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center py-2">
            <div className="w-full flex gap-3 justify-between font-semibold">
              <div className="w-[30%] text-left">Tax Name</div>
              <div className="w-[15%] text-center">Percentage</div>
              <div className="w-[20%] text-right">Amount</div>
            </div>
            {taxes.map((tax, idx) => (
              <div className="w-full flex gap-3 justify-between" key={idx.toString()}>
                <div className="w-[30%] text-left">{tax.name}</div>
                <div className="w-[15%] text-center">{tax.percentage}</div>
                <div className="w-[20%] text-right">{tax.total}</div>
              </div>
            ))}
          </div>

          {invoice.is_round_off ? (
            <div className="w-full flex  gap-2 justify-between items-center text-center text-lg py-2">
              <div className="flex">
                <div className="text-md font-bold ">Total Amount &nbsp;</div>
                <div className=" ">₹ {invoice.total_amount}</div>
              </div>
              <div className="flex">
                <div className="text-md font-bold ">Round Off &nbsp;</div>
                <div className=" ">₹ {invoice.round_off}</div>
              </div>
            </div>
          ) : (
            <div className="w-full flex  gap-2 justify-between items-center text-center text-lg py-2">
              <div className="flex">
                <div className="text-md font-bold ">Total Amount &nbsp;</div>
                <div className=" ">₹ {invoice.total_amount}</div>
              </div>
            </div>
          )}
        </div>

        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="invoice"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3">Invoice Information</div>
          <div className="flex gap-2 py-2 justify-between">
            <div className="flex flex-col gap-[0.5px] flex-1">
              {other_invoice_info_keys.slice(0, half_length).map((key, idx) => {
                if (!other_invoice_info[key]) return;
                return (
                  <div className="flex gap-1 justify-between" key={`invoice_row_1_${key}_{idx}`}>
                    <div className="capitalize  font-bold">{key.replaceAll("_", " ")}</div>
                    <div>{other_invoice_info[key]}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-[0.5px] flex-1">
              {other_invoice_info_keys.slice(half_length, other_invoice_info_keys.length).map((key, idx) => {
                if (!other_invoice_info[key]) return;
                return (
                  <div className="flex gap-1 justify-between" key={`invoice_row_2_${key}_{idx}`}>
                    <div className="capitalize  font-bold">{key.replaceAll("_", " ")}</div>
                    <div>{other_invoice_info[key]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="billing_and_shipping"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3">Billing Information</div>
          <div className="flex justify-around gap-4 py-2 ">
            <div className=" ">
              {billing_address.map((address, idx) => {
                if (idx === 4) return <span key={idx.toString()}> {address.value}. </span>;
                return <span key={idx.toString()}> {address.value}, </span>;
              })}
            </div>
          </div>
        </div>
        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="billing_and_shipping"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3">Shipping Information</div>
          <div className="flex justify-around gap-4 py-2 ">
            <div className="">
              {shipping_address.map((address, idx) => {
                if (idx === 4) return <span key={idx.toString()}> {address.value}. </span>;
                return <span key={idx.toString()}> {address.value}, </span>;
              })}
            </div>
          </div>
        </div>
        {/* <span className="font-bold">{address_do[idx].title}</span> */}

        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="payment"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3">Payment Information</div>
          <div className="flex justify-between gap-4 py-2 text-sm">
            <div className="flex flex-col justify-between">
              <div className="font-bold">Terms And Conditions</div>
              {payment_terms.map((payment_term, idx) => {
                return (
                  <div className="flex  gap-4 justify-between" key={idx.toString()}>
                    <div className="">{terms_and_condition_do[payment_term].text}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              {payment_terms.includes("bank_account") ? (
                <div className="">
                  <div className="font-bold text-right">Bank Account</div>
                  {bank_account.map((info, idx) => {
                    return (
                      <div className="flex  gap-4 justify-between" key={idx.toString()}>
                        <span className="font-bold">{bank_account_do[idx].title}</span>
                        <span className="">{info.value}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {payment_terms.includes("cheque") ? (
                <div className="mt-4">
                  <div className="font-bold text-right">Cheque</div>

                  {cheque.map((info, idx) => {
                    return (
                      <div className="flex gap-4 justify-between" key={idx.toString()}>
                        <span className="font-bold">{cheque_do[idx].title}</span>
                        <span className="">{info.value}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {payment_terms.includes("cash") ? (
                <div className="mt-4">
                  <div className="font-bold text-right">Cash</div>
                  <div className="flex gap-4 justify-between font-bold">Pay by Cash</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div
          className="py-3 px-8 rounded-[6px]  min-h-[100px] border hover:bg-[white!important] hover:text-gray-900"
          id="company"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className="text-center font-bold text-xl pb-3 ">Company Information</div>
          <div className="flex flex-col gap-4 py-2">
            <div className="h-full flex  justify-center ">
              <div className="w-[80%] flex gap-4 justify-between items-center">
                <div className="flex gap-2 justify-center items-center transition-colors hover:text-blue-600">
                  {/* <FontAwesomeIcon icon="fas fa-phone" /> */}

                  <a href={`tel:${phone}`}>📱 {phone}</a>
                </div>
                {website_link && (
                  <div className="flex gap-2 justify-center items-center transition-colors hover:text-blue-600">
                    {/* <FontAwesomeIcon icon="fas fa-globe" /> */}
                    <a href={`${website_link}`}>🌐 {website_link}</a>
                  </div>
                )}
                {contact_mail && (
                  <div className="flex gap-2 justify-center items-center transition-colors hover:text-blue-600">
                    {/* <FontAwesomeIcon icon="fas fa-envelope" /> */}
                    <a href={`mailto:${contact_mail}`}>📧 {contact_mail}</a>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-sm">
              {company_address.map((address, idx) => {
                if (idx === 0) return;
                if (idx === company_address.length - 1) return <span key={idx.toString()}>{address.value}.</span>;
                return <span key={idx.toString()}>{address.value}, </span>;
              })}
            </div>
          </div>
        </div>

        <div
          className="py-3 px-8 rounded-b-[16px] rounded-t-[6px]  min-h-[100px] text-center border hover:bg-[white!important] hover:text-gray-900"
          id="footer"
          style={{
            borderColor: styling.color,
            background: styling.cardBackground,
          }}
        >
          <div className=" font-bold text-xl pb-3">
            <span className="text-red-600">❤</span> Thanks You
          </div>
          We wanted to thank you for supporting our business <br />
          and look forward to working with you again.
        </div>
      </div>
    </div>
  );
}

export default InvoiceInFormalTemplate;
