import React, { Fragment } from "react";

const InvoiceTableBlankSpace = ({ rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <div className="flex flex-row border-b border-[var(--information-color)] items-center h-6 font-bold text-white" key={`BR${i}`}>
      <div className="w-3/5 border-r border-[#90e5fc]">-</div>
      <div className="w-1/10 border-r border-[#90e5fc]">-</div>
      <div className="w-3/20 border-r border-[#90e5fc]">-</div>
      <div className="w-3/20">-</div>
    </div>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableBlankSpace;
