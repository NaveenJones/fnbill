import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceFormalTemplate from "../../../components/Templates/Invoice/InvoiceFormal.template";
import { getCustomInvoicesAPI, updateCustomInvoiceStateAPI } from "../../../app/api";
import toast from "react-hot-toast";
import InvoiceInFormalTemplate from "../../../components/Templates/Invoice/InvoiceInFormal.template";
import html2canvas from "html2canvas";
import ConfirmDialog from "../../../features/Dialog/Confirm.dialog";
import BackgroundPattern1 from "../../../assets/invoice_pattern/pattern-1.jpg";
import BackgroundPattern2 from "../../../assets/invoice_pattern/pattern-2.jpg";
import BackgroundPattern3 from "../../../assets/invoice_pattern/pattern-3.jpg";
import BackgroundPattern4 from "../../../assets/invoice_pattern/pattern-4.jpg";
import BackgroundPattern5 from "../../../assets/invoice_pattern/pattern-5.jpg";
import PageLoader from "../../../components/Loader/Page.loader";

function CustomInvoiceGeneratorPage() {
  const { id } = useParams();
  const { getAllInvoices } = useCustomInvoicesState((state) => state);

  const [invoiceType, setInvoiceType] = useState("html");
  const [customInvoice, setCustomInvoice] = useState(null);
  // const [color, setColor] = useState("rgb(86 30 203)");

  const [dialog, setDialog] = useState({
    open: false,
    title: "Invoice Actions",
    message: "Are you sure you want to generate the invoice?",
    note: "Please note that once the invoice is generated, you will no longer have edit access to this document.",
    state: "success",
    icon: "fa-triangle-exclamation",
    onClose: () => {
      setDialog((state) => ({ ...state, open: false }));
    },
    callbackOnSuccess: () => {
      onGenerateReceipt();
    },
    callbackOnFailed: () => {},
  });
  const [informalStyling, setInformalStyling] = useState({
    background: `url(${BackgroundPattern4})`,
    color: "#000",
    cardBackground: "#fff",
  });
  const colorList = ["#000", "#fff", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF"];
  const patternURLList = [`url(${BackgroundPattern1})`, `url(${BackgroundPattern2})`, `url(${BackgroundPattern3})`, `url(${BackgroundPattern4})`, `url(${BackgroundPattern5})`];

  useEffect(() => {
    const init = async () => {
      const response = await getCustomInvoicesAPI(id);
      if (response.code !== 1200) return toast.error(`Unable to fetch data: ${response.message}`);
      const body = response.content;
      setCustomInvoice({ ...body.invoice_data });
    };
    init();
  }, []);

  function simulateDownloadImageClick(uri, filename) {
    var link = document.createElement("a");
    if (typeof link.download !== "string") {
      window.open(uri);
    } else {
      link.href = uri;
      link.download = filename;
      accountForFirefox(clickLink, link);
    }
  }

  function clickLink(link) {
    link.click();
  }

  function accountForFirefox(click) {
    let link = arguments[1];
    document.body.appendChild(link);
    click(link);
    document.body.removeChild(link);
  }

  const onGenerateReceipt = async () => {
    const update_response = await updateCustomInvoiceStateAPI(id, 1);
    if (update_response.code === 1200) {
      toast.success("Invoice Generated");

      await getAllInvoices();
      return setInvoiceType("pdf");
    }
    return toast.error(`Unable to update state: ${update_response.message}`);
  };

  if (!customInvoice) return <PageLoader title="Loading Invoice" />;

  return (
    <>
      <div className="w-full overflow-y-auto">
        <div>
          {invoiceType === "pdf" ? (
            <button className="form-button hover:underline" onClick={() => setInvoiceType("html")}>
              Light Invoice
            </button>
          ) : (
            <button className="form-button hover:underline" onClick={() => setDialog((state) => ({ ...state, open: true }))}>
              Business Invoice
            </button>
          )}

          {invoiceType === "pdf" ? (
            <div className="flex flex-col items-center ">
              {customInvoice ? (
                <PDFViewer className="w-full h-[900px]">
                  <InvoiceFormalTemplate invoice={customInvoice} />
                </PDFViewer>
              ) : (
                "Loading..."
              )}
            </div>
          ) : (
            <div className="overflow-y-scroll flex flex-col items-center bg-[#2a2a2e]">
              <div className="bg-[#38383d] w-full flex flex-wrap md:flex-nowrap justify-end items-center border-b border-[#0c0c0d]">
                <div className="group">
                  <button className=" m-[1px] px-2 text-[#d1d1d2]  text-center hover:bg-[#666667] focus-within:bg-[#666667]">Background </button>
                  <span className="absolute right-20 hidden group-focus-within:grid group-hover:grid grid-cols-3	gap-3 p-2  bg-[#2a2a2e] border rounded">
                    {colorList.map((value, idx) => (
                      <button
                        key={`card_bgcolor_${idx}`}
                        className="m-[1px] px-2 h-[25px] w-[25px] rounded"
                        style={{ background: value }}
                        onClick={() => setInformalStyling((state) => ({ ...state, background: value }))}
                      ></button>
                    ))}
                    {patternURLList.map((value, idx) => (
                      <button
                        key={`card_bg_${idx}`}
                        className="m-[1px] px-2 h-[25px] w-[25px] rounded"
                        style={{ background: value }}
                        onClick={() => setInformalStyling((state) => ({ ...state, background: value }))}
                      ></button>
                    ))}
                    <input type="color" className="  h-[25px] w-[25px] rounded" onChange={(e) => setInformalStyling((state) => ({ ...state, background: e.target.value }))} />
                  </span>
                </div>
                <div className="group">
                  <button className="group m-[1px] px-2 text-[#d1d1d2]  text-center hover:bg-[#666667] focus-within:bg-[#666667]">Text</button>
                  <span className="absolute right-20 hidden group-focus-within:grid group-hover:grid grid-cols-3	gap-3 p-2  bg-[#2a2a2e] border rounded">
                    {colorList.map((value, idx) => (
                      <button
                        key={`text_color_${idx}`}
                        className="m-[1px] px-2 h-[25px] w-[25px] rounded"
                        style={{ background: value }}
                        onClick={() => setInformalStyling((state) => ({ ...state, color: value }))}
                      ></button>
                    ))}
                    <input type="color" className="  h-[25px] w-[25px] rounded" onChange={(e) => setInformalStyling((state) => ({ ...state, color: e.target.value }))} />
                  </span>
                </div>
                <div className="group">
                  <button className="group m-[1px] px-2 text-[#d1d1d2]  text-center hover:bg-[#666667] focus-within:bg-[#666667]">Card</button>
                  <span className="absolute right-20 hidden group-focus-within:grid group-hover:grid grid-cols-3	gap-3 p-2  bg-[#2a2a2e] border rounded">
                    {colorList.map((value, idx) => (
                      <button
                        key={`card_bgcolor_${idx}`}
                        className="m-[1px] px-2 h-[25px] w-[25px] rounded"
                        style={{ background: value }}
                        onClick={() => setInformalStyling((state) => ({ ...state, cardBackground: value }))}
                      ></button>
                    ))}
                    {patternURLList.map((value, idx) => (
                      <button
                        key={`card_bg_${idx}`}
                        className="m-[1px] px-2 h-[25px] w-[25px] rounded"
                        style={{ background: value }}
                        onClick={() => setInformalStyling((state) => ({ ...state, cardBackground: value }))}
                      ></button>
                    ))}
                    <input type="color" className=" h-[25px] w-[25px] rounded" onChange={(e) => setInformalStyling((state) => ({ ...state, cardBackground: e.target.value }))} />
                  </span>
                </div>
                <button
                  title="Download Receipt"
                  className="m-[1px] px-2  text-[#d1d1d2]  hover:bg-[#666667] h-[25px] rounded"
                  onClick={() => {
                    html2canvas(document.querySelector("#custom-invoice-html")).then((canvas) => {
                      simulateDownloadImageClick(canvas.toDataURL(), "invoice.png");
                    });
                  }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-download" />
                </button>
              </div>
              <div className="py-10">
                <InvoiceInFormalTemplate id="custom-invoice-html" invoice={customInvoice} styling={informalStyling} />
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog {...dialog} />
    </>
  );
}

export default CustomInvoiceGeneratorPage;

{
  /* <button
className="form-button hover:underline"
onClick={() => {
  html2canvas(
    document.querySelector("#custom-invoice-html")
  ).then((canvas) => {
    const img = canvas.toDataURL();
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: [510, 1216],
    });

    pdf.setProperties({
      title: "Invoice",
      subject: "Invoice Subject",
    });

    pdf.addImage(img, "JPEG", 2, 2);
    pdf.save("invoice.pdf");
  });
}}
>
DownloadPDF
</button> */
}
