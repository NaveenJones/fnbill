import { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";

import PageLoader from "../../../components/Loader/Page.loader";
import moment from "moment-timezone";
import { bank_account_do, cheque_do } from "../../../forms/Invoice/CustomInvoice/CustomInvoice.do";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { reverseArray } from "../../../common/function";

function CustomInvoicePaymentInformationPage() {
  const { id } = useParams();
  const {
    custom_invoices: { records },
  } = useCustomInvoicesState((state) => state);

  const customInvoice = useMemo(() => {
    if (!records || !id) return null;
    return records.find((record) => record.id === id);
  }, [id, records]);

  if (!customInvoice) return <PageLoader title="Loading Invoice" />;

  const { total_amount, payment_details } = customInvoice;

  if (!payment_details)
    return (
      <div className="w-full  text-lg p-5">
        <span className="font-medium">Payments Pending:</span> Await processing; no transactions initiated.
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center  items-center">
      {reverseArray(payment_details).map((payment, idx) => {
        const { due_amount, amount, paid_by, paid_on, payment_terms, bank_account, cheque } = payment;
        return (
          <Fragment key={`Payment_${idx}_${due_amount}_${amount}`}>
            <div className=" px-5 py-3  border hover:border-[var(--link-color-hover)] ">
              <div className=" sm:w-[400px] ">
                <div className="flex flex-col content-center text-lg  my-3">
                  <p className="text-right font-semibold text-lg pb-1">Paid on {moment(paid_on).local().format("ddd, DD-MM-yyyy h:mm A")}</p>

                  <div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold"> Paid By</span> <span>{paid_by}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold"> Amount Paid</span> <span>{amount}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold"> Remaining Due</span> <span>{due_amount}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold"> Total Amount</span> <span>{total_amount}</span>
                    </div>
                  </div>
                  <div className="group">
                    <button className="flex justify-between gap-2 w-full border p-2 rounded hover:bg-[var(--link-color-hover)] hover:text-white focus-within:text-white focus-within:bg-[var(--link-color-hover)]">
                      <span className="font-semibold">Payment Terms</span> <span className="capitalize">{payment_terms.replace("_", " ")}</span>
                    </button>
                    {payment_terms !== "cash" ? (
                      <div className="fixed bottom-10 right-10   justify-end  items-end hidden group-focus-within:flex group-active:flex group-hover:flex  hover:border-[var(--link-color-hover)]">
                        <div className="bg-white border border-[var(--link-color-hover)] rounded-3xl  p-3 ">
                          {payment_terms === "bank_account" &&
                            bank_account.map((info, idx) => {
                              return (
                                <div className="flex justify-between gap-2" key={idx.toString()}>
                                  <span className="font-semibold">{bank_account_do[idx].title}</span> <span>{info.value}</span>
                                </div>
                              );
                            })}
                          {payment_terms === "cheque" &&
                            cheque.map((info, idx) => {
                              return (
                                <div className="flex justify-between gap-2" key={idx.toString()}>
                                  <span className="font-semibold">{cheque_do[idx].title}</span> <span>{info.value}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <FontAwesomeIcon
              className="rotate-90 md:rotate-0"
              icon={faArrowLeft}
              style={{ visibility: idx === payment_details.length - 1 ? "hidden" : "visible" }}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default CustomInvoicePaymentInformationPage;
