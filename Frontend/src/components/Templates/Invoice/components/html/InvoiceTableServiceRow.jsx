import { width } from "@fortawesome/free-solid-svg-icons/faTrash";
import React, { Fragment } from "react";

const InvoiceTableServiceRow = ({ services }) => {
  return (
    <>
      {services.map((service, idx) => (
        <div
          className="flex flex-row justify-between border-b border-[var(--information-color)] items-center font-bold pl-1 h-[35px] w-full"
          key={idx.toString()}
        >
          <div className="w-3/12 border-r border-[var(--information-color)] text-left pr-2">
            {service.name}
            <div className="text-[8px]">{service.description}</div>
          </div>
          <div className="w-2/12 border-r border-[var(--information-color)] text-right pr-2">{service.hsn_code}</div>
          <div className="w-1/12 border-r border-[var(--information-color)] text-right pr-2">{service.quantity}</div>
          <div className="w-2/12 border-r border-[var(--information-color)] text-right pr-2">{service.price}</div>
          <div className="w-2/12 text-right pr-2">{service.total}</div>
        </div>
      ))}
    </>
  );
};

export default InvoiceTableServiceRow;
