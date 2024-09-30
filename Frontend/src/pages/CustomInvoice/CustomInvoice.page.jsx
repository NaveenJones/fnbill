import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import CustomInvoiceNewModal from "../../features/Modal/CustomInvoiceNew/CustomInvoiceNew.modal";
import { invoice_styles } from "../../common/styles";
import "./CustomInvoice.page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
import moment from "moment";
import { ImageDownloadURL } from "../../env";
import CustomInvoicePaymentForm from "../../forms/Invoice/CustomInvoicePayment/CustomInvoicePayment.form";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

function CustomInvoicePage() {
  const breakpoints = {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    639: {
      slidesPerView: 1,
    },
    865: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
    1700: {
      slidesPerView: 4,
    },
  };
  const {
    custom_invoices: { records },
  } = useCustomInvoicesState((state) => state);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState({
    state: false,
    data: {
      total_amount: 0,
      due_amount: 0,
    },
  });
  const { incomplete_invoice, complete_invoice, unpaid_invoice } = useMemo(
    () =>
      records.reduce(
        (acc, invoice) => {
          const {
            invoice_id,
            invoice_data: { billing_address, shipping_address, company_name },
          } = invoice;
          if (
            invoice_id.toLowerCase().includes(search.toLowerCase()) ||
            billing_address[0].value.toLowerCase().includes(search.toLowerCase()) ||
            shipping_address[0].value.toLowerCase().includes(search.toLowerCase()) ||
            company_name.toLowerCase().includes(search.toLowerCase())
          ) {
            if (invoice.state === 0) acc.incomplete_invoice.push(invoice);
            if (invoice.state === 1) acc.complete_invoice.push(invoice);
            if (invoice.state !== 2 && invoice.state === 1) acc.unpaid_invoice.push(invoice);
          }

          return acc;
        },
        { incomplete_invoice: [], complete_invoice: [], unpaid_invoice: [] }
      ),
    [records, search]
  );

  const onPay = (data) => {
    setShowModal({
      state: true,
      data,
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-5 w-full">
        <Link className="invoice-button w-72" to="/custom-invoice/create">
          <FontAwesomeIcon icon="fa fa-file-invoice" />
          <span className="texts">
            <span className="text-1">Invoice</span>
            <span className="text-2">Create New Invoice</span>
          </span>
        </Link>
        <Link className="invoice-button w-72" to="/custom-invoice/history">
          <FontAwesomeIcon icon="fa fa-history" />
          <span className="texts">
            <span className="text-1">Invoice</span>
            <span className="text-2">History</span>
          </span>
        </Link>
      </div>
      <div className="projects-section ">
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">{records.length}</span>
              <span className="status-type">Total Invoices</span>
            </div>
            <div className="item-status">
              <span className="status-number">{unpaid_invoice.length}</span>
              <span className="status-type">Payment Pending Invoices</span>
            </div>
            <div className="item-status ">
              <span className="status-number">{incomplete_invoice.length}</span>
              <span className="status-type">Outstanding Invoices</span>
            </div>
            <div className="item-status">
              <span className="status-number">{complete_invoice.length}</span>
              <span className="status-type">Finalized Invoices</span>
            </div>
          </div>
          <div className="projects-status">
            <div className="item-status">
              <div className="flex justify-end">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Invoices"
                  className="p-2 font-lg outline-none border-b-2 w-60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-2 ">
          <div className="font-semibold text-2xl w-full">
            <div className="relative  inline-flex gap-3 items-center p-3 text-xl font-medium text-center    ">
              <FontAwesomeIcon icon={faFileAlt} />
              Payment Pending Invoices
              {unpaid_invoice.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border shadow border-white rounded-full -top-2 -end-2 hover:scale-150 transition-transform cursor-default">
                  {unpaid_invoice.length}
                </div>
              )}
            </div>
          </div>

          <Swiper
            className="bg-gray-100 rounded-lg"
            modules={[Keyboard, Mousewheel]}
            keyboard={true}
            direction="horizontal"
            mousewheel={true}
            spaceBetween={10}
            breakpoints={breakpoints}
          >
            {unpaid_invoice.length > 0 ? (
              unpaid_invoice.map((invoice, idx) => {
                const { id, invoice_id, created_at, state, invoice_data, total_amount, due_amount } = invoice;

                return (
                  <SwiperSlide key={`complete_invoice_${idx}_${id}`} className="invoice-card-box-wrapper">
                    <div className="invoice-card">
                      <img className="profile-image" src={`${ImageDownloadURL}${invoice_data.logo_file}`} alt="profile image" />
                      <div className="invoice-card-content">
                        <div className="invoice-card-header">
                          <Link to={`/custom-invoice/generate/${id}`} className=" text-blue-900 hover:underline font-semibold">
                            {idx + 1}. #{invoice_id}
                          </Link>
                        </div>
                        <p className="invoice-card-line">
                          {`${invoice_data.billing_address[0].value} from ${invoice_data.billing_address[1].value}, ${invoice_data.billing_address[2].value}, ${invoice_data.billing_address[3].value}, ${invoice_data.billing_address[4].value}`}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Company </span>
                          {invoice_data.company_name}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Total Amount </span> <span>₹{total_amount}</span>
                          <br />
                          <span className="font-semibold">Due Amount </span> <span>₹{due_amount}</span>
                        </p>
                        <div className="flex justify-end gap-2">
                          <button className="pay-button" onClick={() => onPay({ id, total_amount, due_amount })}>
                            Pay
                            <FontAwesomeIcon className="svgIcon" icon="fa-solid fa-credit-card" />
                          </button>
                        </div>
                        <p className="invoice-card-line time">{moment(created_at).format("ddd, DD-MM-yyyy  h:mm A")}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="text-center font-medium  py-5">Currently, there are no invoices available for viewing.</div>
            )}
          </Swiper>
        </div>

        <div className="py-2 ">
          <div className="font-semibold text-2xl w-full">
            <div className="relative  inline-flex gap-3 items-center p-3 text-xl font-medium text-center    ">
              <FontAwesomeIcon icon={faFileAlt} />
              Outstanding Invoices
              {incomplete_invoice.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 hover:scale-150 transition-transform cursor-default">
                  {incomplete_invoice.length}
                </div>
              )}
            </div>
          </div>
          <Swiper
            className="bg-gray-100 rounded-lg"
            modules={[Keyboard, Mousewheel]}
            keyboard={true}
            direction="horizontal"
            mousewheel={true}
            spaceBetween={10}
            breakpoints={breakpoints}
          >
            {incomplete_invoice.length > 0 ? (
              incomplete_invoice.map((invoice, idx) => {
                const { id, invoice_id, created_at, state, invoice_data, total_amount, due_amount } = invoice;

                return (
                  <SwiperSlide key={`complete_invoice_${idx}_${id}`} className="invoice-card-box-wrapper">
                    <div className="invoice-card">
                      <img className="profile-image" src={`${ImageDownloadURL}${invoice_data.logo_file}`} alt="profile image" />
                      <div className="invoice-card-content">
                        <div className="invoice-card-header">
                          <Link to={`/custom-invoice/generate/${id}`} className=" text-blue-900 hover:underline font-semibold">
                            {idx + 1}. #{invoice_id}
                          </Link>
                        </div>
                        <p className="invoice-card-line">
                          {`${invoice_data.billing_address[0].value} from ${invoice_data.billing_address[1].value}, ${invoice_data.billing_address[2].value}, ${invoice_data.billing_address[3].value}, ${invoice_data.billing_address[4].value}`}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Company </span>
                          {invoice_data.company_name}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Total Amount </span> <span>₹{total_amount}</span>
                          <br />
                          <span className="font-semibold">Due Amount </span> <span>₹{due_amount}</span>
                        </p>
                        <p className="invoice-card-line time">{moment(created_at).format("ddd, DD-MM-yyyy  h:mm A")}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="text-center font-medium  py-5">Currently, there are no invoices available for viewing.</div>
            )}
          </Swiper>
        </div>

        <div className="py-2 w-full">
          <div className="font-semibold text-2xl w-full">
            <div className="relative  inline-flex gap-3 items-center p-3 text-xl font-medium text-center    ">
              <FontAwesomeIcon icon={faFileAlt} />
              Finalized Invoices
              {complete_invoice.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 hover:scale-150 transition-transform cursor-default">
                  {complete_invoice.length}
                </div>
              )}
            </div>
          </div>

          <Swiper
            className="bg-gray-100 rounded-lg"
            modules={[Keyboard, Mousewheel]}
            keyboard={true}
            direction="horizontal"
            mousewheel={true}
            spaceBetween={10}
            breakpoints={breakpoints}
          >
            {complete_invoice.length > 0 ? (
              complete_invoice.map((invoice, idx) => {
                const { id, invoice_id, created_at, state, invoice_data, total_amount, due_amount } = invoice;

                return (
                  <SwiperSlide key={`incomplete_invoice_${idx}_${id}`} className="invoice-card-box-wrapper">
                    <div className="invoice-card">
                      <img className="profile-image" src={`${ImageDownloadURL}${invoice_data.logo_file}`} alt="profile image" />
                      <div className="invoice-card-content">
                        <div className="invoice-card-header">
                          <Link to={`/custom-invoice/generate/${id}`} className=" text-blue-900 hover:underline font-semibold">
                            {idx + 1}. #{invoice_id}
                          </Link>
                        </div>
                        <p className="invoice-card-line">
                          {`${invoice_data.billing_address[0].value} from ${invoice_data.billing_address[1].value}, ${invoice_data.billing_address[2].value}, ${invoice_data.billing_address[3].value}, ${invoice_data.billing_address[4].value}`}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Company </span>
                          {invoice_data.company_name}
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Total Amount </span> <span>₹{total_amount}</span>
                          <br />
                          <span className="font-semibold">Due Amount </span> <span>₹{due_amount}</span>
                        </p>

                        <p className="invoice-card-line time">{moment(created_at).format("ddd, DD-MM-yyyy  h:mm A")}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="text-center font-medium py-5">Currently, there are no invoices available for viewing.</div>
            )}
          </Swiper>
        </div>
      </div>

      {showModal.state && showModal.data ? (
        <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-blue-900 bg-opacity-50 z-50">
          <CustomInvoicePaymentForm payment={showModal.data} onModelClose={handleCloseModal} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CustomInvoicePage;
