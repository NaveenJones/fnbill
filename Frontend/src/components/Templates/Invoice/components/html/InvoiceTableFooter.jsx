import React from "react";

const InvoiceTableFooter = ({ total }) => {
  return (
    <div className="flex flex-row border-b border-[var(--information-color)] bg-[var(--information-color)] items-center h-[25px] text-center font-bold flex-grow pl-1">
      <div className="w-4/5 text-right border-r border-[#90e5fc] pr-2">Terms and Conditions</div>
      <div className="w-1/5 text-right pr-2">All payments are to be made in full to the below account upon receipt of this invoice.</div>
    </div>
  );
};

export default InvoiceTableFooter;
