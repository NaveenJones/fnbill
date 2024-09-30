import React, { Fragment } from "react";
import { cheque_do, bank_account_do } from "../../../../../forms/Invoice/CustomInvoice/CustomInvoice.do";

const InvoicePayment = ({ invoice }) => {
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
  const { payment_terms, bank_account, cheque } = invoice;
  return (
    <div className="py-3  rounded-[6px] bg-white min-h-[100px]" id="payment">
      <div className="mt-3 mb-2 text-center p-2 font-bold bg-[var(--information-color)] rounded-lg ">Payment Information</div>
      <div className="flex flex-row justify-between gap-1.25">
        <div className="flex flex-col justify-between w-3/5">
          <div className="text-center p-1 font-bold bg-[var(--information-color)] rounded-lg">Terms And Conditions</div>
          {payment_terms.map((payment_term, idx) => {
            return (
              <div key={`payment-terms_and_condition-${idx}`} className="text-center pb-2.5">
                {terms_and_condition[payment_term].text}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-between gap-2 p-2 w-2/5">
          <div className="flex flex-col justify-between w-full">
            {payment_terms.includes("bank_account") ? (
              bank_account.map((info, idx) => {
                return (
                  <div className="flex flex-row justify-between gap-1.25 w-full" key={idx.toString()}>
                    <div className="">{bank_account_do[idx].title}</div>
                    <div className="">{info.value}</div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-between w-full">
            {payment_terms.includes("cheque") ? (
              cheque.map((info, idx) => {
                return (
                  <div className="flex flex-row justify-between gap-1.25 w-full" key={idx.toString()}>
                    <div className="">{cheque_do[idx].title}</div>
                    <div className="">{info.value}</div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-between w-full">
            {payment_terms.includes("cash") ? (
              <div className="flex flex-row justify-between gap-1.25 w-full">
                <div className="">Pay by Cash</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePayment;
