export const AdvertisementInformationFormEmptyState = {
  name: "",
  ad_file: "",
};

// Dialog Options

export const DialogInitState = {
  open: false,
  title: "Invoice Actions",
  message: "Are you sure?",
  state: "success",
  icon: "fa-triangle-exclamation",
  callbackOnSuccess: () => {},
  callbackOnFailed: () => {},
};

export const AddAnotherDialog = {
  open: true,
  title: "Add Another Invoice",
  message: "Do you want to add another Advertisement?",
  state: "success",
  icon: "fa-triangle-exclamation",
};
