import AdvertisementInformationForm from "../../../forms/Invoice/AdvertisementInformation/AdvertisementInformation.form";

function AdvertisementInformationCreatePage() {
  return (
    <div className="flex justify-center items-center w-full">
      <AdvertisementInformationForm operation={"create"} />
    </div>
  );
}

export default AdvertisementInformationCreatePage;
