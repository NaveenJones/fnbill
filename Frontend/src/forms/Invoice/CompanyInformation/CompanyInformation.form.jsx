import { set, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Link, json, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { select_states } from "../../../common/variables";
import ConfirmDialog from "../../../features/Dialog/Confirm.dialog";
import { round_decimal, uuidv4 } from "../../../common/function";
import FileUpload from "../../../features/FileUpload/FileUpload";

import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { createCompanyAPI, updateCompanyAPI } from "../../../app/api";
import {
  address_do,
  DialogInitState,
  AddAnotherDialog,
  CompanyInformationFormEmptyState,
  cheque_do,
  bank_account_do,
  AddressEmptyState,
  RemoveAddressDialog,
} from "./CompanyInformation.do";
import { ErrorMessage } from "@hookform/error-message";

function CompanyInformationForm({ operation }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    custom_invoices: { company_info },
    getAllPreset,
  } = useCustomInvoicesState((state) => state);

  const current_company = company_info.find((company) => company.id === id);

  const [isLoading, setIsLoading] = useState(false);

  const [dialog, setDialog] = useState(DialogInitState);

  const {
    control,
    register,
    watch,
    trigger,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: CompanyInformationFormEmptyState,
  });

  const { fields: company_address_list_fields } = useFieldArray({
    control,
    name: "company_address",
  });
  const { fields: bank_account_fields } = useFieldArray({
    control,
    name: "bank_account",
  });

  const { fields: cheque_fields } = useFieldArray({
    control,
    name: "cheque",
  });

  const {
    fields: address_list_fields,
    append: address_list_append,
    remove: address_list_remove,
  } = useFieldArray({
    control,
    name: "address_list",
  });

  const address_list = watch("address_list", address_list_fields);

  const [logo_file, payment_terms, upi_file] = watch(["logo_file", "payment_terms", "upi_file"], false);

  useEffect(() => {
    if (operation === "create") {
      reset(CompanyInformationFormEmptyState);
    }
    if (operation === "edit" && current_company) {
      reset(current_company.info);
    }
    return () => {
      reset(CompanyInformationFormEmptyState);
    };
  }, [current_company]);

  const onSubmit = async (data, event) => {
    setIsLoading(true);

    if (operation === "create") {
      const body = { content: { name: data.company_name, info: data } };
      const response = await createCompanyAPI(body);
      if (response.code !== 1201) {
        setIsLoading(false);
        return toast.error("Company Information creation failed");
      }
      toast.success("Company Information created successfully");

      await getAllPreset();
      setIsLoading(false);

      setDialog({
        ...AddAnotherDialog,
        onClose: () => setDialog((state) => ({ ...state, open: false })),
        callbackOnSuccess: onCreateAndAddAnotherSubmit,
        callbackOnFailed: () => navigate("/company-information/"),
      });
    } else if (operation === "edit") {
      const body = {
        content: { id, info: data, name: data.company_name },
      };
      const response = await updateCompanyAPI(id, body);
      if (response.code !== 1200) {
        setIsLoading(false);
        return toast.error("Company Information updation failed");
      }
      await getAllPreset();
      toast.success("Company Information updated successfully");
      setIsLoading(false);
      navigate("/company-information");
    }
  };

  const onCreateAndAddAnotherSubmit = () => {
    // reset(CompanyInformationFormEmptyState);
    setDialog((state) => ({ ...state, open: false }));
  };
  const onAddressAppend = () => {
    for (let idx = 0; idx < address_list.length; idx++) {
      const address_values = address_list[idx];
      if (!address_values[1].value || !address_values[2].value || !address_values[3].value || !address_values[4].value)
        return toast.error(`Please fill all the fields before adding a new Address`);
    }
    address_list_append([AddressEmptyState]);
  };
  const onAddressRemove = (id) => {
    setDialog({
      ...RemoveAddressDialog,
      onClose: () => setDialog((state) => ({ ...state, open: false })),
      callbackOnSuccess: () => address_list_remove(id),
      callbackOnFailed: () => {
        toast.error("Invoice Action Cancelled");
      },
    });
  };
  return (
    <>
      <form className="page-container" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="page page-s">
          <div className="form-group justify-end">
            <button className="form-button  " type="button" onClick={() => reset(CompanyInformationFormEmptyState)}>
              <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
            </button>

            <button
              className="form-button transition-all duration-300"
              type="submit"
              id="create"
              disabled={isLoading}
              style={{ width: isLoading ? "50px" : "100px" }}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin mr-1" />
                </>
              ) : (
                <>{operation === "edit" ? "Save Changes" : "Save"}</>
              )}
            </button>
          </div>
        </div>
        <div className="page page-1 py-10">
          <div className="form-group">
            <div className="text-center flex flex-col justify-center items-end ">
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
              <input
                className="form-input"
                type="text"
                placeholder="Website Link"
                {...register("website_link", {
                  required: "Website is required",
                })}
              />
              <ErrorMessage errors={errors} name={`website_link`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="text-center">
              <input
                className="form-input"
                type="text"
                placeholder="Contact Mail"
                {...register("contact_mail", {
                  required: "Company Mail is required",
                })}
              />
              <ErrorMessage errors={errors} name={`contact_mail`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>
            <div className="text-center">
              <input
                className="form-input"
                type="text"
                placeholder="Seller's GST"
                {...register("sellers_gst", {
                  required: "Seller's GST is required",
                })}
              />
              <ErrorMessage errors={errors} name={`sellers_gst`} render={({ message }) => <p className="text-red-500">{message}</p>} />
            </div>

            <input hidden type="text" placeholder="Upload Company Logo" {...register("logo_file", {})} />
            <button type="button" className="form-button" onClick={() => document.getElementById("logo_file").click()}>
              <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Upload Company Logo
            </button>
            <ErrorMessage errors={errors} name={`logo_file`} render={({ message }) => <p className="text-red-500">{message}</p>} />

            <FileUpload form_key={"logo_file"} setValue={setValue} image={logo_file} id="logo_file" />
          </div>

          <span className="form-sub-heading font-medium"> Address Book</span>
          <span className=" font-medium"> Main Address</span>

          <div className="form-group gap-0">
            {company_address_list_fields.map((field, index) => {
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
          <div>
            <button className="form-button w-64 flex justify-around items-center" type="button" onClick={onAddressAppend}>
              <FontAwesomeIcon icon="fa-solid fa-plus" /> Add Branch Address
            </button>
          </div>
          <div className="form-grouped-container">
            {address_list_fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center  ">
                  <div className="form-grouped" key={field.id}>
                    {address_do.map((field, field_index) => {
                      if (address_do[field_index].key === "customer_name") return;
                      if (address_do[field_index].key === "state")
                        return (
                          <div key={field.key} className="flex items-center">
                            <select className="form-select" {...register(`address_list.${index}.${field_index}.value`)}>
                              <option value="">State</option>
                              {select_states.map((state, index) => {
                                return (
                                  <option key={`${field.key}_state_${index}_company_address`} value={state.code}>
                                    {state.name}
                                  </option>
                                );
                              })}
                            </select>
                            <ErrorMessage
                              errors={errors}
                              name={`company_address.${index}.value`}
                              render={({ message }) => <p className="text-red-500">{message}</p>}
                            />
                          </div>
                        );

                      return (
                        <input
                          key={`${field.key}_${index}_name`}
                          className="form-input"
                          {...register(`address_list.${index}.${field_index}.value`)}
                          placeholder={`${field.title}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex  ">
                    <button type="button" className="form-delete-button" onClick={() => onAddressRemove(index)}>
                      <FontAwesomeIcon icon="fa-solid fa-trash" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <span className="form-sub-heading font-medium">Mode/Terms of Payment</span>
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
                  <div className="form-group  items-center">
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
                  <div className="form-group flex- w-48 items-center">
                    <button type="button" className="form-button" onClick={() => document.getElementById("upi_file").click()}>
                      <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Upload UPI
                    </button>
                    <input
                      hidden
                      className="form-input "
                      type="text"
                      placeholder="Upload UPI QR"
                      {...register("upi_file", {})}
                      onClick={() => document.getElementById("upi_file").click()}
                    />
                    <FileUpload form_key={"upi_file"} setValue={setValue} image={upi_file} id={"upi_file"} />
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
      </form>

      <ConfirmDialog {...dialog} />
    </>
  );
}

export default CompanyInformationForm;
