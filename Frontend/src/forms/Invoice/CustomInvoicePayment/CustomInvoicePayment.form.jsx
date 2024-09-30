import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { bank_account_do, cheque_do, InvoicePaymentFormEmptyState } from "./CustomInvoicePayment.do";
import { updateCustomInvoicePaymentAPI } from "../../../app/api";
import moment from "moment";

const CustomInvoicePaymentForm = ({ payment, onModelClose }) => {
  const { total_amount, due_amount, id } = payment;

  const { getAllInvoices } = useCustomInvoicesState((state) => state);

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: InvoicePaymentFormEmptyState,
  });

  const { fields: bank_account_fields } = useFieldArray({
    control,
    name: "bank_account",
  });

  const { fields: cheque_fields } = useFieldArray({
    control,
    name: "cheque",
  });
  const payment_terms = watch("payment_terms");

  const onSubmit = async (data) => {
    const body = { content: { ...data, paid_on: moment(data.paid_on).format("YYYY-MM-DDTHH:mm:ss[Z]") } };
    const response = await updateCustomInvoicePaymentAPI(id, body);
    if (response.code !== 1200) return toast.error("The payment processing has encountered an error.");
    await getAllInvoices();
    toast.success("Payment has been successfully processed.");
    onModelClose();
  };

  const onFullPayment = () => setValue("amount", payment.due_amount);

  return (
    <div className="py-6 px-10 border border-blue-900 shadow rounded-xl bg-white w-full mx-32 ">
      <div className="flex justify-between gap-2 pb-5">
        <div className="text-xl font-bold w-full text-center">Payment</div>
        <button onClick={onModelClose}>
          <FontAwesomeIcon size="2x" icon={faClose} className="text-red-600 hover:rotate-180 transition-all duration-1000" />
        </button>
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Total Amount</span> ₹{total_amount}
        </div>
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Due Amount</span>₹{due_amount}
        </div>
      </div>

      <form className="py-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 flex flex-col gap-5  ">
          <div className="font-medium text-xl text-center">Payment Information</div>

          <input className="form-input" type="text" placeholder="Paid by" {...register("paid_by", { required: "Paid by is required" })} />
          <div className="flex gap-10">
            <input
              className="form-input w-full"
              type="text"
              placeholder="Amount"
              {...register("amount", { required: "Amount is required" })}
              onChange={(e) => {
                const value = e.target.value;
                if (value > due_amount) return setValue("amount", due_amount);
              }}
            />
            <button
              className="bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-700 transition-colors w-48"
              type="button"
              onClick={onFullPayment}
            >
              Full Payment
            </button>
          </div>
          <input className="form-input" type="datetime-local" placeholder="Paid On" {...register("paid_on", { required: "Paid On is required" })} />

          <div className="font-medium text-xl text-center"> Payment Terms </div>

          <div className="form-group flex-col">
            <select className="form-select" {...register("payment_terms")}>
              <option value="bank_account">BankTransfers</option>
              <option value="cheque">Cheque</option>
              <option value="cash">Cash</option>
            </select>

            <div
              className="form-group"
              style={{
                display: payment_terms === "bank_account" ? "flex" : "none",
              }}
            >
              {bank_account_fields.map((field, index) => {
                if (bank_account_do[index].key === "bank_account")
                  return (
                    <div key={field.id}>
                      <input className="form-input" type="date" placeholder={bank_account_do[index].title} {...register(`bank_account.${index}.value`)} />
                    </div>
                  );
                return (
                  <div key={field.id}>
                    <input className="form-input" type="text" placeholder={bank_account_do[index].title} {...register(`bank_account.${index}.value`)} />
                  </div>
                );
              })}
            </div>

            <div className="form-group" style={{ display: payment_terms === "cheque" ? "flex" : "none" }}>
              {cheque_fields.map((field, index) => {
                if (cheque_do[index].key === "cheque_date")
                  return (
                    <div key={field.id}>
                      <input className="form-input" type="date" placeholder={cheque_do[index].title} {...register(`cheque.${index}.value`)} />
                    </div>
                  );
                return (
                  <div key={field.id}>
                    <input className="form-input" type="text" placeholder={cheque_do[index].title} {...register(`cheque.${index}.value`)} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="errors">
          <ErrorMessage errors={errors} name="paid_by" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="amount" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="paid_on" render={({ message }) => <p className="text-red-500">{message}</p>} />
          <ErrorMessage errors={errors} name="payment_terms" render={({ message }) => <p className="text-red-500">{message}</p>} />
        </div>
        <div className="py-2 flex justify-start">
          <button className="pay-button" type="submit">
            Pay
            <FontAwesomeIcon className="svgIcon" icon="fa-solid fa-credit-card" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomInvoicePaymentForm;
