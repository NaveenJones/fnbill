import { useEffect, useMemo, useState } from "react";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";

import { useNavigate, useParams } from "react-router-dom";
import CustomInvoiceForm from "../../../forms/Invoice/CustomInvoice/CustomInvoice.form";

function CustomInvoiceUpdatePage() {
  const { id } = useParams();
  return (
    <div className="flex justify-center items-center w-full">
      <CustomInvoiceForm operation={"edit"} />
    </div>
  );
}

export default CustomInvoiceUpdatePage;
