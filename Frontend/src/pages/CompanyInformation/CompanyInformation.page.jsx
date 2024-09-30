import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "./CompanyInformation.page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
import moment from "moment";
import { ImageDownloadURL } from "../../env";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

function CompanyInformationPage() {
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
    custom_invoices: { company_info },
  } = useCustomInvoicesState((state) => state);
  const [search, setSearch] = useState("");

  const { filtered_company } = useMemo(
    () =>
      company_info.reduce(
        (acc, company) => {
          const { id, name, created_at, info } = company;
          const { phone, logo_file, sellers_gst, company_name, contact_mail, website_link, company_address } = info;
          if (
            company_name.toLowerCase().includes(search.toLowerCase()) ||
            phone.toLowerCase().includes(search.toLowerCase()) ||
            sellers_gst.toLowerCase().includes(search.toLowerCase()) ||
            company_address[0].value.toLowerCase().includes(search.toLowerCase()) ||
            company_address[1].value.toLowerCase().includes(search.toLowerCase()) ||
            company_address[2].value.toLowerCase().includes(search.toLowerCase()) ||
            company_address[3].value.toLowerCase().includes(search.toLowerCase()) ||
            company_address[4].value.toLowerCase().includes(search.toLowerCase()) ||
            website_link.toLowerCase().includes(search.toLowerCase()) ||
            contact_mail.toLowerCase().includes(search.toLowerCase())
          )
            acc.filtered_company.push(company);

          return acc;
        },
        { filtered_company: [] }
      ),
    [company_info, search]
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-5 w-full">
        <Link className="invoice-button w-72" to="/company-information/create">
          <FontAwesomeIcon icon="fa fa-building" />
          <span className="texts">
            <span className="text-1">Company Information</span>
            <span className="text-2">Create New Company</span>
          </span>
        </Link>
      </div>
      <div className="projects-section ">
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">{company_info.length}</span>
              <span className="status-type">Total Companies</span>
            </div>
          </div>
          <div className="projects-status">
            <div className="item-status">
              <div className="flex justify-end">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Company"
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
              Company List
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
            {filtered_company.length > 0 ? (
              filtered_company.map((company, idx) => {
                const { id, name, created_at, info } = company;
                const { phone, logo_file, sellers_gst, company_name, contact_mail, website_link, company_address } = info;
                return (
                  <SwiperSlide key={`complete_invoice_${idx}_${id}`} className="invoice-card-box-wrapper">
                    <div className="invoice-card">
                      <img className="profile-image" src={`${ImageDownloadURL}${logo_file}`} alt="profile image" />
                      <div className="invoice-card-content">
                        <div className="invoice-card-header">
                          <Link to={`/company-information/update/${id}`} className=" text-blue-900 hover:underline font-semibold">
                            {idx + 1}. {name}
                          </Link>
                        </div>

                        <p className="invoice-card-line">
                          <span className="font-semibold">Phone </span> <span>₹{phone}</span>
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Sellers GST </span> <span>₹{sellers_gst}</span>
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Mail </span> <span>₹{contact_mail}</span>
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Web </span> <span>₹{website_link}</span>
                        </p>
                        <p className="invoice-card-line">
                          <span className="font-semibold">Address </span>
                          <span>{` ${company_address[1].value}, ${company_address[2].value}, ${company_address[3].value}, ${company_address[4].value}`}</span>
                        </p>
                        <p className="invoice-card-line time">{moment(created_at).format("ddd, DD-MM-yyyy  h:mm A")}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="text-center font-medium  py-5">Currently, there are no company available for viewing.</div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CompanyInformationPage;
