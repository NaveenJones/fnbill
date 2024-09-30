import React from "react";

const InvoiceTableServiceHeader = () => (
  <div className="flex flex-row justify-between border-b rounded-lg p-2 border-[var(--information-color)] bg-[var(--information-color)] items-center text-center font-bold flex-grow pl-1 w-full">
    <div className="w-3/12 border-r border-[var(--information-color)]">Services</div>
    <div className="w-2/12 border-r border-[var(--information-color)]">HSN Code</div>
    <div className="w-1/12 border-r border-[var(--information-color)]">Qty</div>
    <div className="w-2/12 border-r border-[var(--information-color)]">Price (INR)</div>
    <div className="w-2/12">Amount (INR)</div>
  </div>
);

export default InvoiceTableServiceHeader;
