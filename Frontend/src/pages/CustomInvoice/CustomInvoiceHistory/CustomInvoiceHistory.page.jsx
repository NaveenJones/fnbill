import { useEffect, useMemo, useState } from "react";
import { useCustomInvoicesState } from "../../../app/stores/custom_invoices_store";
import { DataTable } from "../../../components/Table/DataTable.element";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import CustomInvoiceNewModal from "../../../features/Modal/CustomInvoiceNew/CustomInvoiceNew.modal";
import { invoice_styles } from "../../../common/styles";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { deleteCustomInvoiceAPI } from "../../../app/api";
import {
  custom_invoice_payment_terms,
  custom_invoice_payment_terms_options,
  custom_invoice_state,
  custom_invoice_state_options,
} from "../../../forms/Invoice/CustomInvoice/CustomInvoice.do";

function CustomInvoiceHistoryPage() {
  const navigate = useNavigate();

  const {
    custom_invoices: { records: custom_invoices_records, selected_custom_invoice_idx },
    setCustomInvoice,
    getAllInvoices,
  } = useCustomInvoicesState((state) => state);
  const [invoices, setInvoices] = useState([]);

  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    id: null,
  });
  const invoice_context_menu = [
    {
      key: "update",
      title: "Update",
      icon: "fa-solid fa-square-pen",
      action: () => navigate(`/custom-invoice/update/${custom_invoices_records[selected_custom_invoice_idx].id}`),
    },
    {
      key: "view",
      title: "Invoice Information",
      icon: "fa-solid fa-file-pdf",
      action: () => navigate(`/custom-invoice/information/${custom_invoices_records[selected_custom_invoice_idx].id}`),
    },
    {
      key: "generate-paid-reciept",
      title: "Paid Receipt",
      icon: "fa-solid fa-file-pdf",
      action: () => navigate(`/custom-invoice/paid-reciept/${custom_invoices_records[selected_custom_invoice_idx].id}`),
    },
    {
      key: "generate",
      title: "Generate Invoice",
      icon: "fa-solid fa-file-pdf",
      action: () => navigate(`/custom-invoice/generate/${custom_invoices_records[selected_custom_invoice_idx].id}`),
    },
    {
      key: "delete",
      title: "Delete",
      icon: "fa-solid fa-trash",
      action: onInvoiceDelete,
    },
  ];

  const custom_invoice_history_columns = useMemo(
    () => [
      {
        header: "Invoice",
        footer: (props) => props.column.id,

        columns: [
          {
            accessorFn: (row) => row.state,
            id: "state",
            cell: (info) => <div className="break-words text-center">{custom_invoice_state[info.getValue()].title}</div>,
            header: () => <span>Status</span>,
            column_properties: { type: "select", options: custom_invoice_state_options },
            footer: (props) => props.column.state,
          },
          {
            accessorFn: (row) => row.invoice_id,
            id: "invoice_id",
            cell: (info) => <div className=" break-words text-center">{info.getValue()}</div>,
            header: () => <span>Invoice ID</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.dop,
            id: "dop",
            cell: (info) => <div className="text-center">{info.getValue()}</div>,
            header: () => <span>Date of Purchase</span>,

            footer: (props) => props.column.id,
            filterFn: (row, columnId, filterValue) => {
              const date_string = moment.unix(row.original[columnId]).format("MMMM DD, YYYY").toLowerCase();
              const filter_string = filterValue.toLowerCase();
              return date_string.includes(filter_string);
            },
          },
          {
            accessorFn: (row) => row.invoice_data.payment_terms,
            id: "payment_terms",
            cell: (info) => (
              <div className="flex gap-2 break-words text-center">
                {info.getValue().map((payment_term, idx) => {
                  return <span key={`payment_term_${payment_term}${idx}`}>{custom_invoice_payment_terms[payment_term].title}</span>;
                })}
              </div>
            ),
            column_properties: { type: "select", options: custom_invoice_payment_terms_options },

            header: () => <span>Payment Terms</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Billing Information",
        footer: (props) => props.column.id,

        columns: [
          {
            accessorFn: (row) => row.invoice_data.billing_address[0].value,
            id: "b_customer_name",
            cell: (info) => info.getValue(),
            header: () => <span>Customer Name</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.billing_address[1].value,
            id: "b_street_address",
            cell: (info) => info.getValue(),
            header: () => <span>Street Address</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.billing_address[2].value,
            id: "b_city",
            cell: (info) => info.getValue(),
            header: () => <span>City</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.billing_address[3].value,
            id: "b_state",
            cell: (info) => info.getValue(),
            header: () => <span>State</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.billing_address[4].value,
            id: "b_zip",
            cell: (info) => info.getValue(),
            header: () => <span>Zip</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Shipping Information",
        footer: (props) => props.column.id,

        columns: [
          {
            accessorFn: (row) => row.invoice_data.shipping_address[0].value,
            id: "s_customer_name",
            cell: (info) => info.getValue(),
            header: () => <span>Customer Name</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.shipping_address[1].value,
            id: "s_street_address",
            cell: (info) => info.getValue(),
            header: () => <span>Street Address</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.shipping_address[2].value,
            id: "s_city",
            cell: (info) => info.getValue(),
            header: () => <span>City</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.shipping_address[3].value,
            id: "s_state",
            cell: (info) => info.getValue(),
            header: () => <span>State</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.shipping_address[4].value,
            id: "s_zip",
            cell: (info) => info.getValue(),
            header: () => <span>Zip</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Company Information",
        footer: (props) => props.column.id,

        columns: [
          {
            accessorFn: (row) => row.invoice_data.company_name,
            id: "company_name",
            cell: (info) => info.getValue(),
            header: () => <span>Company Name</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.phone,
            id: "phone",
            cell: (info) => info.getValue(),
            header: () => <span>Phone</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.website_link,
            id: "website_link",
            cell: (info) => info.getValue(),
            header: () => <span>Weblink</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.contact_mail,
            id: "contact_mail",
            cell: (info) => info.getValue(),
            header: () => <span>Contact Mail</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.company_address[1].value,
            id: "c_street_address",
            cell: (info) => info.getValue(),
            header: () => <span>Street Address</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.company_address[2].value,
            id: "c_city",
            cell: (info) => info.getValue(),
            header: () => <span>City</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.company_address[3].value,
            id: "c_state",
            cell: (info) => info.getValue(),
            header: () => <span>State</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.invoice_data.company_address[4].value,
            id: "c_zip",
            cell: (info) => info.getValue(),
            header: () => <span>Zip</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    setInvoices(custom_invoices_records);
  }, [custom_invoices_records]);

  async function onInvoiceDelete() {
    const id = custom_invoices_records[selected_custom_invoice_idx]?.id;
    if (!id) return toast.error("Failed to delete Invoice");
    const response = await deleteCustomInvoiceAPI(id);
    if (response.code === 1204) {
      await getAllInvoices();
      toast.success("Invoice Deleted.");
    }
  }

  const onInvoiceShare = async () => {
    var baseUrl = location.protocol + "//" + location.host + "/";
    navigator.clipboard.writeText();
    toast.success(`Share Invoice ${selected_custom_invoice_idx} `);
  };

  return (
    <>
      <div className="w-full mb-16">
        <input type="text" />
        <DataTable
          id={"invoice-table"}
          data={invoices}
          onRowClick={setCustomInvoice}
          columns={custom_invoice_history_columns}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
        />
      </div>

      {selected_custom_invoice_idx !== null ? (
        <div
          className="fixed bottom-0 left-0 w-full transition-all duration-300 bg-[var(--app-container)]  p-5 flex justify-between items-center gap-20"
          style={{ opacity: contextMenu.isOpen ? "100%" : "0%" }}
        >
          <div className="font-bold text-xl">Invoice ID: {custom_invoices_records[selected_custom_invoice_idx]?.invoice_id}</div>

          <div className="flex gap-4">
            {invoice_context_menu.map((item, index) => {
              const { key, title, icon, action } = item;
              if (key === "update" && custom_invoices_records[selected_custom_invoice_idx]?.state !== 0) return;
              if (key === "generate-paid-reciept" && custom_invoices_records[selected_custom_invoice_idx]?.state !== 2) return;

              return (
                <button key={`${key}_${index}`} onClick={() => action()} className={`context-button ${key}`}>
                  <FontAwesomeIcon icon={icon} />
                  {title}
                </button>
              );
            })}
            <CopyToClipboard
              className={`context-button share`}
              text={`${location.protocol}//${location.host}/share/${custom_invoices_records[selected_custom_invoice_idx].id}`}
            >
              <button>Copy Share Link</button>
            </CopyToClipboard>
            <button
              className={`context-button share`}
              onClick={() => {
                const share_data = {
                  title: "MDN",
                  text: "Learn web development on MDN!",
                  url: `${location.protocol}//${location.host}/share/${custom_invoices_records[selected_custom_invoice_idx].id}`,
                };
                if (navigator.share && navigator.canShare(share_data)) {
                  navigator.share(share_data);
                } else {
                  toast.error("Unable to share link");
                }
              }}
            >
              Share
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CustomInvoiceHistoryPage;
