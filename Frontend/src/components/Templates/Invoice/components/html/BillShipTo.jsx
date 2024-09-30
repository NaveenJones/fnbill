import React from "react";

const BillShipTo = ({ invoice }) => (
  <div className="flex flex-row justify-between gap-2">
    <div className="mt-2 w-full  ">
      <div className="mt-3 mr-0.5 p-1  rounded-lg w-full font-bold bg-[var(--information-color)] text-center">Bill To</div>
      <div className=" flex flex-row justify-between">
        <span>Customer Name: </span>
        {invoice.billing_address[0].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>Street Address: </span>
        {invoice.billing_address[1].value}
      </div>
      <div className=" flex flex-row justify-between ">
        <span>City:</span> {invoice.billing_address[2].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>State:</span> {invoice.billing_address[3].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>Zip code:</span> {invoice.billing_address[4].value}
      </div>
    </div>
    <div className="mt-2 w-full">
      <div className="mt-3 mr-0.5 p-1 rounded-lg w-full font-bold bg-[var(--information-color)] text-center">Bill To</div>
      <div className=" flex flex-row justify-between">
        <span>Customer Name: </span>
        {invoice.shipping_address[0].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>Street Address: </span>
        {invoice.shipping_address[1].value}
      </div>
      <div className=" flex flex-row justify-between ">
        <span>City:</span> {invoice.shipping_address[2].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>State:</span> {invoice.shipping_address[3].value}
      </div>
      <div className=" flex flex-row justify-between">
        <span>Zip code:</span> {invoice.shipping_address[4].value}
      </div>
    </div>
  </div>
);

export default BillShipTo;
