import { set, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Link, json, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { select_states } from "../../../common/variables";
import ConfirmDialog from "../../../features/Dialog/Confirm.dialog";
import { round_decimal, uuidv4 } from "../../../common/function";
import FileUpload from "../../../features/FileUpload/FileUpload";

import "./CustomInvoice.form.css";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { createCustomInvoiceAPI, updateCustomInvoiceAPI } from "../../../app/api";
import {
  invoices_form_page,
  TaxEmptyState,
  ServiceEmptyState,
  InvoiceFormEmptyState,
  ExampleInvoiceState,
  address_do,
  cheque_do,
  bank_account_do,
  DialogInitState,
  AddAnotherInvoiceDialog,
  RemoveServiceDialog,
  RemoveTaxDialog,
} from "./CustomInvoice.do";
import { ErrorMessage } from "@hookform/error-message";

function CustomInvoiceForm({ operation }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    custom_invoices: { records, company_info, ad_info },
    getAllInvoices,
    getAllPreset,
    clearCustomInvoice,
  } = useCustomInvoicesState((state) => state);

  const [invoicePage, setInvoicePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [dialog, setDialog] = useState(DialogInitState);

  const {
    control,
    register,
    watch,
    trigger,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
    clearErrors,
    reset,
    formState: { errors, validatingFields },
  } = useForm({
    defaultValues: InvoiceFormEmptyState,
  });

  const {
    fields: billing_address_fields,
    append: billing_address_append,
    prepend: billing_address_prepend,
    remove: billing_address_remove,
    swap: billing_address_swap,
    move: billing_address_move,
    insert: billing_address_insert,
  } = useFieldArray({
    control,
    name: "billing_address",
  });

  const {
    fields: shipping_address_fields,
    append: shipping_address_append,
    prepend: shipping_address_prepend,
    remove: shipping_address_remove,
    swap: shipping_address_swap,
    move: shipping_address_move,
    insert: shipping_address_insert,
  } = useFieldArray({
    control,
    name: "shipping_address",
  });

  const {
    fields: company_address_fields,
    append: company_address_append,
    prepend: company_address_prepend,
    remove: company_address_remove,
    swap: company_address_swap,
    move: company_address_move,
    insert: company_address_insert,
  } = useFieldArray({
    control,
    name: "company_address",
  });

  const {
    fields: services_fields,
    append: services_append,
    prepend: services_prepend,
    remove: services_remove,
    swap: services_swap,
    move: services_move,
    insert: services_insert,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: taxes_fields,
    append: taxes_append,
    prepend: taxes_prepend,
    remove: taxes_remove,
    swap: taxes_swap,
    move: taxes_move,
    insert: taxes_insert,
  } = useFieldArray({
    control,
    name: "taxes",
  });

  const {
    fields: bank_account_fields,
    append: bank_account_append,
    prepend: bank_account_prepend,
    remove: bank_account_remove,
    swap: bank_account_swap,
    move: bank_account_move,
    insert: bank_account_insert,
  } = useFieldArray({
    control,
    name: "bank_account",
  });

  const {
    fields: cheque_fields,
    append: cheque_append,
    prepend: cheque_prepend,
    remove: cheque_remove,
    swap: cheque_swap,
    move: cheque_move,
    insert: cheque_insert,
  } = useFieldArray({
    control,
    name: "cheque",
  });

  const services = watch("services", services_fields);
  const taxes = watch("taxes", taxes_fields);
  const [invoice_id, is_round_off, dop, payment_terms, logo_file, upi_file, ad_file, total_amount, round_off] = watch(
    ["invoice_id", "is_round_off", "dop", "payment_terms", "logo_file", "upi_file", "ad_file", "total_amount", "round_off"],
    false
  );
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompanyAddressList, setSelectedCompanyAddressList] = useState([]);
  const [filteredAdvertisement, setFilteredAdvertisement] = useState([]);
  useEffect(() => {
    setFilteredCompanies(company_info ? company_info : []);
    setFilteredAdvertisement(ad_info ? ad_info : []);
    if (operation === "create") {
      reset(InvoiceFormEmptyState);
      let now = new Date();
      let formattedDateTime = now.toISOString().substring(0, 10);
      setValue("dop", formattedDateTime);
      generateInvoiceID();
    }
    if (operation === "edit" && id != null) {
      const current_record = records.find((record) => record.id === id);
      if (!current_record) return;
      const { invoice_data, invoice_id } = current_record;
      reset({ ...invoice_data, invoice_id });
      const current_company = company_info.find((company) => company.name === invoice_data.company_name);
      if (!current_company) return;
      setSelectedCompanyAddressList([current_company.info.company_address, ...current_company.info.address_list]);
    }

    return () => {
      reset(InvoiceFormEmptyState);
    };
  }, [company_info, records]);

  const generateInvoiceID = () => {
    const sortedInvoiceIds = records
      .map((invoice) => invoice.invoice_id)
      .sort((a, b) => a - b)
      .filter((item) => /^\d+$/.test(item));

    if (!sortedInvoiceIds.length > 0) return setValue("invoice_id", `0001`);
    const invoice_id = (parseInt(sortedInvoiceIds[sortedInvoiceIds.length - 1]) + 1).toString().padStart(4, "0");
    setValue("invoice_id", `${invoice_id}`);
  };
  const randomInvoiceID = () => {
    const invoice_id = Math.round(Math.random() * 9000000 + 1000000);
    setValue("invoice_id", `${invoice_id}`);
  };
  const onSubmit = async (data, event, type = "submit") => {
    setIsLoading(true);

    if (operation === "create") {
      const body = { content: data, invoice_id: data.invoice_id };
      const response = await createCustomInvoiceAPI(body);
      if (response.code === 1201) {
        const id = response.content;
        await getAllInvoices();
        await getAllPreset();
        toast.success("Invoice created successfully");
        setIsLoading(false);
        if (type === "save") return navigate(`/custom-invoice/`);
        setDialog({
          ...AddAnotherInvoiceDialog,
          onClose: () => setDialog((state) => ({ ...state, open: false })),
          callbackOnSuccess: onCreateAndAddAnotherSubmit,
          callbackOnFailed: () => navigate(`/custom-invoice/generate/${id}`),
          otherActions: [{ actionText: "Back to History", onActionClick: () => navigate("/custom-invoice/history") }],
        });
      }
    } else if (operation === "edit" && id !== null) {
      const body = {
        content: data,
        invoice_id: data.invoice_id,
        id,
      };
      const response = await updateCustomInvoiceAPI(id, body);
      if (response.code === 1200) {
        await getAllInvoices();
        await getAllPreset();
        toast.success("Invoice updated successfully");
        setIsLoading(false);
        navigate("/custom-invoice/history");
      }
    }
  };

  const onCreateAndAddAnotherSubmit = () => {
    reset(InvoiceFormEmptyState);
    generateInvoiceID();
    setDialog((state) => ({ ...state, open: false }));
    setInvoicePage(1);
  };

  const onNextPage = async () => {
    if (invoicePage == 1) await trigger(["company_address", "company_name", "phone"]);
    if (invoicePage == 2) await trigger(["billing_address", "shipping_address"]);
    if (invoicePage == 3) await trigger(["services", "taxes"]);

    if (Object.keys(errors).length > 0) return toast.error("Complete all the required fields before moving to next page");
    setInvoicePage((state) => {
      if (state < 5) {
        return state + 1;
      }
      return state;
    });
  };

  const onPreviousPage = () => {
    setInvoicePage((state) => {
      if (state > 1) {
        return state - 1;
      }
      return state;
    });
  };

  const onServicesAppend = () => {
    for (let idx = 0; idx < services.length; idx++) {
      const tax_values = services[idx];
      if (!tax_values.name || !tax_values.hsn_code || !tax_values.quantity || !tax_values.price) {
        return toast.error(`Please fill all the fields before adding a new tax`);
      }
    }
    services_append(ServiceEmptyState);
  };

  const onServicesRemove = (id) => {
    setDialog({
      ...RemoveServiceDialog,
      onClose: () => setDialog((state) => ({ ...state, open: false })),
      callbackOnSuccess: () => services_remove(id),
      callbackOnFailed: () => {
        toast.error("Invoice Action Cancelled");
      },
    });
  };

  const onTaxesAppend = () => {
    for (let idx = 0; idx < taxes.length; idx++) {
      const tax_values = taxes[idx];
      if (!tax_values.name || !tax_values.percentage) {
        return toast.error(`Please fill all the fields before adding a new tax`);
      }
    }
    taxes_append(TaxEmptyState);
  };

  const onTaxesRemove = (id) => {
    setDialog({
      ...RemoveTaxDialog,
      onClose: () => setDialog((state) => ({ ...state, open: false })),
      callbackOnSuccess: () => taxes_remove(id),
      callbackOnFailed: () => {
        toast.error("Invoice Action Cancelled");
      },
    });
  };

  const onServicesTotal = (value, index, id) => {
    const quantity = parseFloat(id == "quantity" ? value : services[index].quantity);
    const price = parseFloat(id == "price" ? value : services[index].price);
    const service_total = quantity * price;
    setValue(`services.${index}.total`, round_decimal(service_total));

    const total_of_services = services.reduce((acc, service) => acc + parseFloat(service.total), 0);
    let overall_total = total_of_services;
    for (let idx = 0; idx < taxes.length; idx++) {
      const tax = taxes[idx];
      const percentage = parseFloat(tax.percentage);
      const tax_total = (total_of_services * percentage) / 100;
      overall_total += tax_total;
      setValue(`taxes.${idx}.total`, round_decimal(tax_total));
    }

    const total_amount = round_decimal(overall_total);
    setValue("total_amount", total_amount);

    setValue("round_off", (total_amount - Math.round(total_amount)).toFixed(2));
  };

  const onTaxTotal = (percentage, index) => {
    const total_of_services = services.reduce((acc, service) => acc + parseFloat(service.total), 0);
    setValue(`taxes.${index}.total`, (total_of_services * percentage) / 100);

    let overall_total = total_of_services;
    for (let idx = 0; idx < taxes.length; idx++) {
      const tax = taxes[idx];
      let tax_total = 0;
      if (idx === index) tax_total = (total_of_services * percentage) / 100;
      else tax_total = (total_of_services * parseFloat(tax.percentage)) / 100;

      overall_total += tax_total;
    }

    const total_amount = round_decimal(overall_total);
    setValue("total_amount", total_amount);
    setValue("round_off", parseFloat(`0.${total_amount.toString().split(".")[1]}`));
  };

  const onOverallTotal = () => {
    const total_of_services = services.reduce((acc, service) => acc + parseFloat(service.total), 0);
    let overall_total = 0;
    overall_total += total_of_services;
    // taxes
    for (let idx = 0; idx < taxes.length; idx++) {
      const tax = taxes[idx];
      overall_total += parseFloat(tax.total);
    }

    // overall total
    const total_amount = round_decimal(overall_total);
    setValue("total_amount", total_amount);
    setValue("round_off", parseFloat(`0.${overall_total.toString().split(".")[1]}`));
  };

  const onCompanySelect = (e) => {
    const id = e.target.value;
    const company = company_info.find((item) => item.id === id);
    if (!company) return;

    const { info: selected_company } = company;
    setValue("company_name", selected_company.company_name);
    setValue("logo_file", selected_company.logo_file);
    setValue("sellers_gst", selected_company.sellers_gst);
    setValue("contact_mail", selected_company.contact_mail);
    setValue("website_link", selected_company.website_link);
    setValue("website_link", selected_company.website_link);
    setValue("phone", selected_company.phone);
    setValue("company_address", selected_company.company_address);
    setValue("company_address", selected_company.company_address);
    setValue("payment_terms", selected_company.payment_terms);
    setValue("bank_account", selected_company.bank_account);
    setValue("cheque", selected_company.cheque);
    setValue("upi_file", selected_company.upi_file);
    setSelectedCompanyAddressList([selected_company.company_address, ...selected_company.address_list]);
    // setFilteredCompanies([]);
  };
  const onCompanyAddressSelect = (address) => {
    setValue("company_address", address);
  };

  const onAdvertisementSelect = (e) => {
    const id = e.target.value;
    const selected_advertisement = ad_info.find((item) => item.id === id);
    if (!selected_advertisement) {
      setValue("ad_name", "");
      setValue("ad_file", "");
      return;
    }

    setValue("ad_name", selected_advertisement.name);
    setValue("ad_file", selected_advertisement.ad_file);
  };

  return (
    <>
      <form className="page-container" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="page page-s">
          <div className="form-heading">{invoices_form_page[invoicePage].title}</div>

          <div className="form-group justify-between ">
            <div className="flex flex-wrap justify-center  gap-0">
              <button className="form-button rounded-e-none" type="button" onClick={() => randomInvoiceID()}>
                Invoice ID
              </button>
              <input className="form-input" type="text" placeholder="Invoice ID" {...register("invoice_id", { required: "Invoice ID is required" })} />

              {/* <button
                className="form-button rounded-e-none"
                type="button"
                onClick={() => {
                  let now = new Date();
                  let formattedDateTime = now.toISOString().substring(0, 10);
                  setValue("dop", formattedDateTime);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
              </button> */}

              <input className="form-input rounded-e-lg" type="date" readOnly placeholder="DOP" {...register("dop", {})} />
            </div>
            <div className="flex  justify-end  items-center gap-2">
              <button className="form-button  " type="button" onClick={() => reset(InvoiceFormEmptyState)}>
                <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
              </button>
              {invoicePage !== 5 ? (
                <button
                  className="form-button transition-all duration-300 bg-[#219C90!important] hover:text-[#219C90!important] hover:border-[#219C90!important] hover:bg-[#fff!important] "
                  type="button"
                  onClick={(e) => onSubmit(getValues(), e, "save")}
                  id="create"
                  disabled={isLoading}
                  style={{ width: isLoading ? "50px" : "200px" }}
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin mr-1" />
                    </>
                  ) : (
                    <>Save and Close</>
                  )}
                </button>
              ) : (
                <button
                  className="form-button transition-all duration-300 bg-[#219C90!important] hover:text-[#219C90!important] hover:border-[#219C90!important] hover:bg-[#fff!important] "
                  type="submit"
                  id="create"
                  disabled={isLoading}
                  style={{ width: isLoading ? "50px" : "200px" }}
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin mr-1" />
                    </>
                  ) : (
                    <>{operation === "edit" ? "Save Changes" : "Create Invoice Now"}</>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <span className="text-lg text-end font-bold flex flex-col">
              <span>Date of Purchase</span> {dop}
            </span>
          </div>
        </div>
        <div className="page page-nav p-0">
          <div className="form-group flex justify-center sm:justify-between items-center w-full">
            <button type="button" className="form-button w-64" onClick={onPreviousPage} disabled={!invoices_form_page[invoicePage - 1]}>
              {invoices_form_page[invoicePage - 1] ? (
                <span className="flex gap-2 items-center justify-start px-4">
                  <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> {invoices_form_page[invoicePage - 1].title}
                </span>
              ) : (
                <></>
              )}
            </button>
            <button type="button" className="form-button w-64 " onClick={onNextPage} disabled={!invoices_form_page[invoicePage + 1]}>
              {invoices_form_page[invoicePage + 1] ? (
                <span className="flex gap-2 items-center justify-end  px-4">
                  {invoices_form_page[invoicePage + 1].title} <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </span>
              ) : (
                <></>
              )}
            </button>
          </div>
        </div>
        <div className="page page-1" id="page-1" style={{ display: invoicePage === 1 ? "flex" : "none" }}>
          <span className="form-sub-heading"> Invoice Information</span>

          <div className="form-group">
            <div className="text-center  justify-center items-end ">
              <select className="form-select" onClick={onCompanySelect}>
                <option className="w-full px-5 py-2 border hover:bg-gray-100">Select Company</option>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company, idx) => {
                    return (
                      <option className="w-full px-5 py-2 border hover:bg-gray-100" key={`company_${idx}`} value={company.id}>
                        {company.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div className="text-center  justify-center items-end ">
              <input
                className="form-input"
                type="text"
                placeholder="Company Name"
                {...register("company_name", {
                  required: "Company Name is required",
                })}
              />
              <div className="w-full flex justify-center">
                <ErrorMessage errors={errors} name={`company_name`} render={({ message }) => <p className="text-red-500">{message}</p>} />
              </div>
            </div>
            <div className="text-center">
              <input
                className="form-input"
                type="text"
                placeholder="Company Phone"
                {...register("phone", {
                  required: "Company Phone is required",
                })}
              />
              <ErrorMessage errors={errors} name={`phone`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="text-center">
              <input className="form-input" type="text" placeholder="Website Link" {...register("website_link", {})} />
              <ErrorMessage errors={errors} name={`website_link`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="text-center">
              <input className="form-input" type="text" placeholder="Contact Mail" {...register("contact_mail", {})} />
              <ErrorMessage errors={errors} name={`contact_mail`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="text-center">
              <input className="form-input" type="text" placeholder="Seller's GST" {...register("sellers_gst", {})} />
              <ErrorMessage errors={errors} name={`sellers_gst`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="flex flex-col">
              <input hidden type="text" placeholder="Upload Company Logo" {...register("logo_file", {})} />
              <button type="button" className="form-button" onClick={() => document.getElementById("logo_file").click()}>
                <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Add Company Logo
              </button>
              <ErrorMessage errors={errors} name={`logo_file`} render={({ message }) => <p className="text-red-500">{message}</p>} />

              <FileUpload form_key={"logo_file"} setValue={setValue} image={logo_file} id="logo_file" />
            </div>
          </div>
          <span className="form-sub-heading"> Company Address</span>
          <div className="w-full flex justify-start gap-2">
            {selectedCompanyAddressList.map((address, index) => {
              return (
                <button
                  type="button"
                  key={`address_list_${index}`}
                  className="py-2 px-4 border bg-white hover:border-[var(--link-color-hover)]"
                  onClick={() => onCompanyAddressSelect(address)}
                >
                  {address[1].value}, {address[2].value}, {address[3].value},{address[4].value}
                </button>
              );
            })}
          </div>
          <div className="form-group">
            {company_address_fields.map((field, index) => {
              if (address_do[index].key === "customer_name") return;
              if (address_do[index].key === "state")
                return (
                  <div key={field.id}>
                    <select
                      className="form-select"
                      {...register(`company_address.${index}.value`, {
                        required: `${address_do[index].title} is required`,
                      })}
                    >
                      <option value="">State</option>
                      {select_states.map((state, index) => {
                        return (
                          <option key={`${field.id}_state_${index}_company_address`} value={state.code}>
                            {state.name}
                          </option>
                        );
                      })}
                    </select>
                    <ErrorMessage errors={errors} name={`company_address.${index}.value`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                  </div>
                );

              return (
                <div key={field.id} className="text-center">
                  <input
                    className="form-input"
                    type="text"
                    placeholder={address_do[index].title}
                    {...register(`company_address.${index}.value`, {
                      required: `${address_do[index].title} is required`,
                    })}
                  />
                  <ErrorMessage errors={errors} name={`company_address.${index}.value`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <div className="w-full">
              <div className="form-sub-heading">Other Invoice Information</div>
            </div>

            <input className="form-input" type="text" placeholder="Delivery_Note" {...register("delivery_note", {})} />
            <input className="form-input" type="text" placeholder="Delivery_Note_Date" {...register("delivery_note_date")} />
            <input className="form-input" type="text" placeholder="Supplier_References" {...register("supplier_references", {})} />
            <input className="form-input" type="text" placeholder="Other_References" {...register("other_references", {})} />
            <input className="form-input" type="text" placeholder="Buyers_Order_No" {...register("buyers_order_no", {})} />
            <input className="form-input" type="text" placeholder="Despatch_Doc_No" {...register("despatch_doc_no", {})} />
            <input className="form-input" type="text" placeholder="Despatched_Through" {...register("despatched_through", {})} />
            <input className="form-input" type="text" placeholder="Destination" {...register("destination", {})} />
            <input className="form-input" type="text" placeholder="Terms_Of_Delivery" {...register("terms_of_delivery", {})} />
          </div>
        </div>

        <div className="page page-2" id="page-2" style={{ display: invoicePage === 2 ? "flex" : "none" }}>
          <span className="form-sub-heading">Billing Address</span>
          <div className="form-group">
            {billing_address_fields.map((field, index) => {
              if (address_do[index].key === "state")
                return (
                  <div key={field.id}>
                    <select
                      className="form-select"
                      key={field.id}
                      {...register(`billing_address.${index}.value`, {
                        required: `${address_do[index].title} is required`,
                      })}
                    >
                      <option value="">State</option>
                      {select_states.map((state, index) => {
                        return (
                          <option key={`${field.id}_${index}_billing_address`} value={state.code}>
                            {state.name}
                          </option>
                        );
                      })}
                    </select>
                    <ErrorMessage errors={errors} name={`billing_address.${index}.value`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                  </div>
                );
              return (
                <div key={field.id}>
                  <input
                    className="form-input"
                    type="text"
                    placeholder={address_do[index].title}
                    {...register(`billing_address.${index}.value`, {
                      required: `${address_do[index].title} is required`,
                    })}
                  />
                  <ErrorMessage errors={errors} name={`billing_address.${index}.value`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                </div>
              );
            })}
          </div>
          <div className="form-group flex-col gap-0 ">
            <input className="form-input" type="text" placeholder="Buyer's GST" {...register("buyers_gst", {})} />
          </div>

          <span className="form-sub-heading"> Shipping Address</span>
          <div className="form-group">
            <button
              className="form-button"
              type="button"
              onClick={() => {
                setValue("shipping_address", getValues("billing_address"));
              }}
            >
              Same as Billing Address
            </button>
          </div>
          <div className="form-group">
            {shipping_address_fields.map((field, index) => {
              if (address_do[index].key === "state")
                return (
                  <div key={field.id}>
                    <select
                      className="form-select"
                      key={field.id}
                      {...register(`shipping_address.${index}.value`, {
                        required: `${address_do[index].title} is required`,
                      })}
                    >
                      <option value="">State</option>
                      {select_states.map((state, index) => {
                        return (
                          <option key={`${field.id}_state_${index}_shipping_address`} value={state.code}>
                            {state.name}
                          </option>
                        );
                      })}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name={`shipping_address.${index}.value`}
                      render={({ message }) => <p className="text-red-500">{message}</p>}
                    />
                  </div>
                );
              return (
                <div key={field.id}>
                  <input
                    key={field.id}
                    className="form-input"
                    type="text"
                    placeholder={address_do[index].title}
                    {...register(`shipping_address.${index}.value`, {
                      required: `${address_do[index].title} is required`,
                    })}
                  />
                  <ErrorMessage errors={errors} name={`shipping_address.${index}.value`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="page page-3" id="page-3" style={{ display: invoicePage === 3 ? "flex" : "none" }}>
          <span className="form-sub-heading font-semibold">Services</span>
          <div>
            <button className="form-button w-44 flex justify-around items-center" type="button" onClick={onServicesAppend}>
              <FontAwesomeIcon icon="fa-solid fa-plus" /> New Service
            </button>
          </div>

          <div className="form-grouped-container">
            {services_fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center">
                  <div className="h-[100%]">
                    <button type="button" className="form-delete-button" onClick={() => onServicesRemove(index)}>
                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                    </button>
                  </div>
                  <div className="form-grouped">
                    <div>
                      <input
                        key={`${field.id}_${index}_name`}
                        className="form-grouped-input "
                        {...register(`services.${index}.name`, { required: "Name is required" })}
                        placeholder="Name"
                      />
                      <ErrorMessage errors={errors} name={`services.${index}.name`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                    </div>
                    <input
                      key={`${field.id}_${index}_description`}
                      className="form-grouped-input"
                      {...register(`services.${index}.description`)}
                      placeholder="Description"
                    />
                    <input
                      key={`${field.id}_${index}_hsn_code`}
                      className="form-grouped-input"
                      {...register(`services.${index}.hsn_code`)}
                      placeholder="HSN Code"
                    />
                    <div>
                      <input
                        key={`${field.id}_${index}_quantity`}
                        className="form-grouped-input"
                        {...register(`services.${index}.quantity`, { required: "Quantity is required" })}
                        placeholder="Quantity"
                        onChange={(e) => onServicesTotal(e.target.value, index, "quantity")}
                      />
                      <ErrorMessage errors={errors} name={`services.${index}.quantity`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                    </div>{" "}
                    <div>
                      <input
                        key={`${field.id}_${index}_price`}
                        className="form-grouped-input"
                        {...register(`services.${index}.price`, { required: "Price is required" })}
                        placeholder="Price"
                        onChange={(e) => onServicesTotal(e.target.value, index, "price")}
                      />
                      <ErrorMessage errors={errors} name={`services.${index}.price`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                    </div>
                    <input
                      key={`${field.id}_${index}_total`}
                      className="form-grouped-input"
                      {...register(`services.${index}.total`)}
                      placeholder="Total"
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <span className="form-sub-heading font-semibold">Taxes</span>
          <div>
            <button className="form-button w-44 flex justify-around items-center" type="button" onClick={onTaxesAppend}>
              <FontAwesomeIcon icon="fa-solid fa-plus" /> New Taxes
            </button>
          </div>
          <div className="form-grouped-container">
            {taxes_fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center">
                  <div className="h-[100%] ">
                    <button type="button" className="form-delete-button" onClick={() => onTaxesRemove(index)}>
                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                    </button>
                  </div>
                  <div className="form-grouped" key={field.id}>
                    <div>
                      <input
                        key={`${field.id}_${index}_name`}
                        className="form-grouped-input "
                        {...register(`taxes.${index}.name`, { required: "Name is required" })}
                        placeholder="Name"
                      />
                      <ErrorMessage errors={errors} name={`taxes.${index}.name`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                    </div>
                    <div>
                      <input
                        key={`${field.id}_${index}_percentage`}
                        className="form-grouped-input"
                        {...register(`taxes.${index}.percentage`, { required: "Percentage is required" })}
                        placeholder="Percentage"
                        onChange={(e) => onTaxTotal(e.target.value, index)}
                      />
                      <ErrorMessage errors={errors} name={`taxes.${index}.percentage`} render={({ message }) => <p className="text-red-500">{message}</p>} />
                    </div>

                    <input
                      key={`${field.id}_${index}_total`}
                      className="form-grouped-input"
                      {...register(`taxes.${index}.total`)}
                      placeholder="Total"
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="form-group justify-end">
            <input className="form-input" type="checkbox" hidden placeholder="Round Off" {...register("is_round_off", {})} />

            <div
              className="flex  items-center gap-3"
              onClick={() => {
                setValue("is_round_off", !is_round_off);
              }}
            >
              Round Off
              <FontAwesomeIcon
                className={`border bg-white rounded-lg  hover:border-[var(--link-color)] p-2 w-6 h-5 hover:bg-slate-100 ${
                  is_round_off ? "text-green-600" : "text-red-600"
                }`}
                size="xl"
                icon={is_round_off ? "fa-solid fa-check" : "fa-solid fa-xmark"}
              />
              <input className={`form-input outline-none `} hidden type="text" placeholder="Round Off Amount" {...register("round_off", {})} />
              {/* </div>
            <div className="flex  items-center gap-3 " onClick={onOverallTotal}> */}
              <span>Total Amount</span>
              <input hidden className="form-input" placeholder="Total Amount" {...register("total_amount", {})} readOnly />
              <div className="form-input w-56 flex justify-center items-center">{is_round_off ? total_amount - round_off : total_amount}</div>
            </div>
          </div>
        </div>

        <div className="page page-4" id="page-4" style={{ display: invoicePage === 4 ? "flex" : "none" }}>
          <span className="form-sub-heading"> Mode/Terms of Payment</span>

          <div className="form-group flex-col">
            <div className="flex justify-start w-full items-center gap-5">
              <input className="form-input" type="checkbox" id="bank_account" value="bank_account" {...register("payment_terms")} />
              <label htmlFor="bank_account">Bank Account</label>
              <input className="form-input" type="checkbox" id="cheque" value="cheque" {...register("payment_terms")} />
              <label htmlFor="cheque">Cheque</label>

              <input className="form-input" type="checkbox" id="cash" value="cash" {...register("payment_terms")} />
              <label htmlFor="cash">Cash</label>
            </div>

            {payment_terms && (
              <>
                <div
                  className="form-group flex-col "
                  style={{
                    display: payment_terms.includes("bank_account") ? "flex" : "none",
                  }}
                >
                  <div className="font-semibold">Bank Account</div>
                  <div className="form-group  ">
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

                    <div className="flex flex-col">
                      <input
                        hidden
                        type="text"
                        placeholder="Upload UPI QR"
                        {...register("upi_file", {})}
                        onClick={() => document.getElementById("upi_file").click()}
                      />
                      <button type="button" className="form-button" onClick={() => document.getElementById("upi_file").click()}>
                        <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Upload UPI Image
                      </button>
                      <div>
                        <FileUpload form_key={"upi_file"} setValue={setValue} image={upi_file} id={"upi_file"} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group flex-col " style={{ display: payment_terms.includes("cheque") ? "flex" : "none" }}>
                  <div className="font-semibold">Cheque</div>
                  <div className="form-group  items-center">
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
              </>
            )}
          </div>
        </div>

        <div className="page page-5" id="page-5" style={{ display: invoicePage === 5 ? "flex" : "none" }}>
          <span className="form-sub-heading"> Advertisement</span>
          <div className="form-group ">
            <select className="form-input " onChange={onAdvertisementSelect}>
              <option> Select an Advertisement</option>
              {filteredAdvertisement.length > 0 &&
                filteredAdvertisement.map((ad, idx) => {
                  return (
                    <option key={`ad_${idx}`} value={ad.id}>
                      {ad.name}
                    </option>
                  );
                })}
            </select>
            <input className="form-input " type="text" placeholder="Advertisement Title" {...register("ad_name", {})} />
            <div className="flex flex-col">
              <input hidden type="text" placeholder="Upload Advertisement" {...register("ad_file", {})} />
              <button type="button" className="form-button" onClick={() => document.getElementById("ad_file").click()}>
                <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Upload Adverstisement
              </button>

              <div className="">
                <FileUpload form_key={"ad_file"} setValue={setValue} image={ad_file} id={"ad_file"} />
              </div>
            </div>
          </div>
        </div>
      </form>

      <ConfirmDialog {...dialog} />
    </>
  );
}

export default CustomInvoiceForm;
//  // <div className="relative w-48  bg-white ">
//                 // {filteredAdvertisement.map((ad, idx) => {
//                 //   return (
//                 //     <button type="button" className="w-full px-5 py-2 hover:bg-gray-100" key={`ad_${idx}`} onClick={() => onAdvertisementSelect(ad)}>
//                 //       {ad.name}
//                 //     </button>
//                 //   );
//                 // })}
//                 // </div>
//                 <></>
