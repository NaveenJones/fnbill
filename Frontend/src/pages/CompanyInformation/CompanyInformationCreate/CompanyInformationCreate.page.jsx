import { useEffect, useMemo, useState } from "react";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";

import { useNavigate, useParams } from "react-router-dom";
import CompanyInformationForm from "../../../forms/Invoice/CompanyInformation/CompanyInformation.form";

function CompanyInformationCreatePage() {
  const { id } = useParams();
  return (
    <div className="flex justify-center items-center w-full">
      <CompanyInformationForm operation={"create"} />
    </div>
  );
}

export default CompanyInformationCreatePage;
