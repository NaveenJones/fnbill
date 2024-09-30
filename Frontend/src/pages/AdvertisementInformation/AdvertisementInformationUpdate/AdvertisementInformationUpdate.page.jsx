import AdvertisementInformationForm from "../../../forms/Invoice/AdvertisementInformation/AdvertisementInformation.form";

function AdvertisementInformationUpdatePage() {
  return (
    <div className="flex justify-center items-center w-full">
      <AdvertisementInformationForm operation={"edit"} />
    </div>
  );
}

export default AdvertisementInformationUpdatePage;
