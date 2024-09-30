import React from "react";

const InvoiceTableRowFooter = ({ total, is_round_off, round_off }) => {
  return (
    <div className="flex flex-row flex-wrap mt-2 w-full gap-2">
      {is_round_off && (
        <div className="flex w-full flex-row border-b rounded-lg border-[var(--information-color)] bg-[var(--information-color)] items-center h-[25px] text-center font-bold flex-grow pl-1">
          <div className="w-4/5 text-right border-r  pr-2">Round Off (INR)</div>
          <div className="w-1/5 text-right pr-2">{Number.parseFloat(round_off).toFixed(2)}</div>
        </div>
      )}

      <div className="flex w-full flex-row border-b rounded-lg border-[var(--information-color)] bg-[var(--information-color)] items-center h-[25px] text-center font-bold flex-grow pl-1">
        <div className="w-4/5 text-right border-r  pr-2">Total (INR)</div>
        <div className="w-1/5 text-right pr-2">
          {is_round_off ? (Number.parseFloat(total) - Number.parseFloat(round_off)).toFixed(2) : Number.parseFloat(total).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default InvoiceTableRowFooter;
