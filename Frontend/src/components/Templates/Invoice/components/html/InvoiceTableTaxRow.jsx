import { width } from "@fortawesome/free-solid-svg-icons/faTrash";
import React, { Fragment } from "react";

const InvoiceTableTaxRow = ({ taxes }) => {
  return taxes.map((tax, idx) => {
    if (tax.name === "" || tax.percentage === "" || tax.total === "") return;
    return (
      <div className="flex w-full flex-row border-b border-[var(--information-color)] items-center font-bold pl-1 h-[25px]" key={idx.toString()}>
        <div className="w-1/2 border-r border-[var(--information-color)] text-left pr-2">{tax.name}</div>
        <div className="w-3/12 border-r border-[var(--information-color)] text-right pr-2">{tax.percentage}%</div>
        <div className="w-1/5 text-right pr-2">{tax.total}</div>
      </div>
    );
  });
};

export default InvoiceTableTaxRow;
