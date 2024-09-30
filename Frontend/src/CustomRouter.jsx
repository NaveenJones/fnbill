import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home.page";
import CustomInvoicePage from "./pages/CustomInvoice/CustomInvoice.page";
import InvoicePage from "./pages/Invoice/Invoice.page";
// import LoginPage from "./pages/Login/Login.page"
import MainLayout from "./layouts/Main/MainLayout";
// import LoginLayout from "./layouts/Login/LoginLayout"

import SettingsPage from "./pages/Settings/Settings.page";

import CustomInvoiceHistoryPage from "./pages/CustomInvoice/CustomInvoiceHistory/CustomInvoiceHistory.page";
import CustomInvoiceGeneratorPage from "./pages/CustomInvoice/CustomInvoiceGenerator/CustomInvoiceGenerator.page";
import CustomInvoiceCreatePage from "./pages/CustomInvoice/CustomInvoiceCreate/CustomInvoiceCreate.page";
import CustomInvoiceUpdatePage from "./pages/CustomInvoice/CustomInvoiceUpdate/CustomInvoiceUpdate.page";
import CustomInvoicePaidReceiptPage from "./pages/CustomInvoice/CustomInvoicePaidReceipt/CustomInvoicePaidReceipt.page";
import CustomInvoicePaymentInformationPage from "./pages/CustomInvoice/CustomInvoicePaymentInformation/CustomInvoicePaymentInformation.page";

import CompanyInformationPage from "./pages/CompanyInformation/CompanyInformation.page";
import CompanyInformationCreatePage from "./pages/CompanyInformation/CompanyInformationCreate/CompanyInformationCreate.page";
import CompanyInformationUpdatePage from "./pages/CompanyInformation/CompanyInformationUpdate/CompanyInformationUpdate.page";

import AdvertisementInformationPage from "./pages/AdvertisementInformation/AdvertisementInformation.page";
import AdvertisementInformationCreatePage from "./pages/AdvertisementInformation/AdvertisementInformationCreate/AdvertisementInformationCreate.page";
import AdvertisementInformationUpdatePage from "./pages/AdvertisementInformation/AdvertisementInformationUpdate/AdvertisementInformationUpdate.page";
import CustomInvoiceInfomationPage from "./pages/CustomInvoice/CustomInvoiceInfomation/CustomInvoiceInfomation.page";
import ShareLayout from "./layouts/Share/ShareLayout";
import ShareCustomInvoiceGeneratorPage from "./pages/CustomInvoice/ShareCustomInvoiceGenerator/ShareCustomInvoiceGenerator.page";

function CustomRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="company-information">
            <Route index element={<CompanyInformationPage />} />
            <Route path="create" element={<CompanyInformationCreatePage />} />
            <Route path="update/:id" element={<CompanyInformationUpdatePage />} />
          </Route>
          <Route path="advertisement-information">
            <Route index element={<AdvertisementInformationPage />} />
            <Route path="create" element={<AdvertisementInformationCreatePage />} />
            <Route path="update/:id" element={<AdvertisementInformationUpdatePage />} />
          </Route>
          <Route path="custom-invoice">
            <Route index element={<CustomInvoicePage />} />
            <Route path="history" element={<CustomInvoiceHistoryPage />} />
            <Route path="information/:id" element={<CustomInvoiceInfomationPage />} />

            <Route path="create" element={<CustomInvoiceCreatePage />} />
            <Route path="update/:id" element={<CustomInvoiceUpdatePage />} />

            <Route path="generate/:id" element={<CustomInvoiceGeneratorPage />} />

            <Route path="payment-information/:id" element={<CustomInvoicePaymentInformationPage />} />
            <Route path="paid-reciept/:id" element={<CustomInvoicePaidReceiptPage />} />
          </Route>
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/share" element={<ShareLayout />}>
          <Route path=":id" element={<ShareCustomInvoiceGeneratorPage />} />
        </Route>

        {/* <Route path="/login" element={<LoginLayout />} >
                    <Route index element={<LoginPage />} />
                </Route> */}
      </Routes>
    </>
  );
}

export default CustomRouter;
