import React from "react";
import { cheque_do, bank_account_do } from "../../../../../forms/Invoice/CustomInvoice/CustomInvoice.do";
import ReciptPNG from "../../../../../assets/recipt/recipt-paid-opacity.png";
import moment from "moment";

const InvoiceTransaction = ({ payment_details }) => {
  const terms_and_condition = {
    bank_account: {
      icon: "fas fa-building-columns",
      text: `All payments must be made via bank transfer to the \naccount details provided on the invoice.`,
    },
    cheque: {
      icon: "fas fa-money-check",
      text: `Cheques must be  dated and signed by an \nauthorized signatory of the payer.`,
    },
    cash: {
      icon: "fas fa-money-bill-1",
      text: `Payments must be made in full at the \ntime of delivery or service completion.`,
    },
  };

  return (
    <div className="py-3  rounded-[6px] bg-white min-h-[100px]" id="payment">
      <div className="mt-3 mb-2 text-center p-2  font-bold bg-[var(--information-color)] rounded-lg ">Transaction Information</div>
      {payment_details
        ? payment_details.map((transaction, idx) => {
            const { payment_terms, bank_account, cheque, paid_by, paid_on } = transaction;
            return (
              <div key={`transaction-${idx}`}>
                <div className="flex  justify-between gap-2 w-full">
                  <div className="flex gap-1 justify-between w-2/5">
                    <div className="border-b  border-[var(--information-color)]  p-2 text-center w-full flex flex-col justify-center items-center">
                      <div className="w-full">{paid_by}</div>
                      <div className="text-[11px] w-full">{moment(paid_on).local().format("ddd, DD-MM-yyyy h:mm A")}</div>
                    </div>
                  </div>
                  {payment_terms === "bank_account" && (
                    <div className="border-b  border-[var(--information-color)]  p-2 text-center w-full flex flex-col justify-center items-center ">
                      {bank_account.map((info, idx) => (
                        <div className="flex justify-between w-full gap-2" key={idx.toString()}>
                          <div className="w-1/2">{bank_account_do[idx].title}</div>
                          <div className="w-1/2">{info.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {payment_terms === "cheque" && (
                    <div className="border-b  border-[var(--information-color)]  p-2 text-center w-full flex flex-col  justify-center items-center ">
                      {cheque.map((info, idx) => (
                        <div className="flex w-full justify-between gap-2" key={idx.toString()}>
                          <div className="w-1/2">{cheque_do[idx].title}</div>
                          <div className="w-1/2">{info.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {payment_terms === "cash" && (
                    <div className="border-b  border-[var(--information-color)]  p-2 text-center w-full flex flex-col justify-center items-center">
                      <div className="flex w-full gap-2" key={idx.toString()}>
                        <div className="w-full">Paid in Cash</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default InvoiceTransaction;
