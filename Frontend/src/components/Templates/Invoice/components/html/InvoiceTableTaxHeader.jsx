import React from "react";

const InvoiceTableTaxHeader = () => (
  <div className="flex w-full flex-row border-b border-[var(--information-color)] rounded-lg bg-[var(--information-color)] items-center h-[25px] text-center font-bold flex-grow pl-1">
    <div className="w-1/2 border-r border-[var(--information-color)]">Tax Name</div>
    <div className="w-3/12 border-r border-[var(--information-color)]">Percentage (%)</div>
    <div className="w-1/5">Amount (INR)</div>
  </div>
);

export default InvoiceTableTaxHeader;
