import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomInvoicesAPI } from "../../../app/api";
import toast from "react-hot-toast";
import PageLoader from "../../../components/Loader/Page.loader";
import InvoiceFormalHTMLTemplate from "../../../components/Templates/Invoice/InvoiceFormalHTML.template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomInvoiceInfomationPage() {
  const { id } = useParams();
  const [customInvoice, setCustomInvoice] = useState(null);

  useEffect(() => {
    const init = async () => {
      const response = await getCustomInvoicesAPI(id);
      if (response.code !== 1200) return toast.error(`Unable to fetch data: ${response.message}`);
      const body = response.content;
      setCustomInvoice({ ...body });
    };
    init();
  }, []);
  if (!customInvoice) return <PageLoader title="Loading Invoice" />;

  return (
    <div className="w-full overflow-y-auto flex flex-col justify-center gap-5">
      <div className="flex justify-between gap-2">
        <Link className="invoice-button w-72" to={`/custom-invoice/payment-information/${id}`}>
          <FontAwesomeIcon icon="fa fa-credit-card" />
          <span className="texts">
            <span className="text-1">Invoice</span>
            <span className="text-2">Payment Information</span>
          </span>
        </Link>
        <Link className="invoice-button w-72" to={`/custom-invoice/generate/${id}`}>
          <FontAwesomeIcon icon="fa fa-file-invoice" />
          <span className="texts">
            <span className="text-1">Invoice</span>
            <span className="text-2">Generate Invoice</span>
          </span>
        </Link>
      </div>
      <div className="flex justify-center">
        <InvoiceFormalHTMLTemplate invoice={customInvoice} />
      </div>
    </div>
  );
}

export default CustomInvoiceInfomationPage;
