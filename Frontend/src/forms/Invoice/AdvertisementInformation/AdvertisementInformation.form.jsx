import { set, useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmDialog from "../../../features/Dialog/Confirm.dialog";
import FileUpload from "../../../features/FileUpload/FileUpload";

import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { createAdvertisementAPI, createCompanyAPI, updateAdvertisementAPI, updateCompanyAPI } from "../../../app/api";
import { DialogInitState, AddAnotherDialog, AdvertisementInformationFormEmptyState } from "./AdvertisementInformation.do";

function AdvertisementInformationForm({ operation }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    custom_invoices: { ad_info },
    getAllPreset,
  } = useCustomInvoicesState((state) => state);
  const current_ad = ad_info.find((ad) => ad.id === id);
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
    defaultValues: AdvertisementInformationFormEmptyState,
  });

  const [ad_file] = watch(["ad_file"], false);

  useEffect(() => {
    if (operation === "create") {
      reset(AdvertisementInformationFormEmptyState);
    }
    if (operation === "edit") {
      reset({ ad_file: current_ad.ad_file, ad_name: current_ad.name });
    }
    return () => {
      reset(AdvertisementInformationFormEmptyState);
    };
  }, []);

  const onSubmit = async (data, event) => {
    setIsLoading(true);

    if (operation === "create") {
      const body = { content: data };
      const response = await createAdvertisementAPI(body);
      if (response.code !== 1201) {
        setIsLoading(false);
        return toast.error("Advertisement Information creation failed");
      }
      toast.success("Advertisement Information created successfully");

      await getAllPreset();
      setIsLoading(false);

      setDialog({
        ...AddAnotherDialog,
        onClose: () => setDialog((state) => ({ ...state, open: false })),
        callbackOnSuccess: onCreateAndAddAnotherSubmit,
        callbackOnFailed: () => navigate("/advertisement-information/"),
      });
    } else if (operation === "edit") {
      const body = { content: data };
      const response = await updateAdvertisementAPI(id, body);
      if (response.code !== 1200) {
        setIsLoading(false);
        return toast.error("Advertisement Information updation failed");
      }
      await getAllPreset();
      toast.success("Advertisement Information updated successfully");
      setIsLoading(false);
      navigate("/advertisement-information");
    }
  };

  const onCreateAndAddAnotherSubmit = () => {
    reset(AdvertisementInformationFormEmptyState);
    setDialog((state) => ({ ...state, open: false }));
  };

  return (
    <>
      <form className="page-container" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="page page-s">
          <div className="form-group justify-end">
            <button className="form-button  " type="button" onClick={() => reset(AdvertisementInformationFormEmptyState)}>
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
        <div className="page page-1">
          <span className="form-sub-heading"> Advertisement</span>
          <div className="form-group ">
            <input className="form-input " type="text" placeholder="Advertisement Title" {...register("ad_name", { required: true })} />
            <button type="button" className="form-button" onClick={() => document.getElementById("ad_file").click()}>
              <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-3" /> Upload Advertisement
            </button>
            <input hidden type="text" placeholder="Upload Advertisement" {...register("ad_file", { required: true })} />
          </div>
          <FileUpload form_key={"ad_file"} setValue={setValue} image={ad_file} id={"ad_file"} />
        </div>
      </form>
      <ConfirmDialog {...dialog} />
    </>
  );
}

export default AdvertisementInformationForm;
