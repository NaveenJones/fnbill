import React from "react";

const InvoiceInformation = ({ invoice }) => {
  const {
    invoice_id,
    dop,
    delivery_note,
    delivery_note_date,
    supplier_references,
    other_references,
    buyers_order_no,
    despatch_doc_no,
    despatched_through,
    destination,
    terms_of_delivery,
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
    <div>
      <div className="mt-3 border border-white bg-[var(--information-color)] font-bold align-middle mb-2 text-center p-2 rounded-lg ">Invoice Information</div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-col gap-2">
          {other_invoice_info_keys.slice(0, half_length).map((key, idx) => {
            if (!other_invoice_info[key]) return;
            return (
              <div className="flex flex-row gap-2" key={`invoice_row_1_${key}_{idx}`}>
                <div className="capitalize font-bold w-1/2 p-1 align-sub p-1.25">{key.replaceAll("_", " ")}</div>
                <div className="w-1/2 rounded-lg text-center p-1  bg-[var(--information-color)] align-sub p-1.25">{other_invoice_info[key]}</div>
              </div>
            );
          })}
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          {other_invoice_info_keys.slice(half_length, other_invoice_info_keys.length).map((key, idx) => {
            if (!other_invoice_info[key]) return;
            return (
              <div className="flex flex-row gap-2" key={`invoice_row_2_${key}_{idx}`}>
                <div className="capitalize font-bold w-1/2 p-1 align-sub p-1.25">{key.replaceAll("_", " ")}</div>
                <div className="w-1/2  rounded-lg text-center p-1 bg-[var(--information-color)] align-sub p-1.25">{other_invoice_info[key]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvoiceInformation;
