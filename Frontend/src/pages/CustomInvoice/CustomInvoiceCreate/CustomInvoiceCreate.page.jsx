import { useEffect, useMemo, useState } from "react";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";

import { useNavigate } from "react-router-dom";
import CustomInvoiceForm from "../../../forms/Invoice/CustomInvoice/CustomInvoice.form";

function CustomInvoiceCreatePage() {
  return (
    <div className="flex justify-center items-center w-full">
      <CustomInvoiceForm operation={"create"} />
    </div>
  );
}

export default CustomInvoiceCreatePage;
