import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "./AdvertisementInformation.page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
import moment from "moment";
import { ImageDownloadURL } from "../../env";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

function AdvertisementInformationPage() {
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
    custom_invoices: { ad_info },
  } = useCustomInvoicesState((state) => state);
  const [search, setSearch] = useState("");
  const [imageView, setImageView] = useState({
    state: false,
    image: null,
  });

  const { filtered_ad_info } = useMemo(
    () =>
      ad_info.reduce(
        (acc, company) => {
          const { id, name, created_at } = company;

          if (name !== "" && name.toLowerCase().includes(search.toLowerCase())) acc.filtered_ad_info.push(company);

          return acc;
        },
        { filtered_ad_info: [] }
      ),
    [ad_info, search]
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-5 w-full">
        <Link className="invoice-button w-96" to="/advertisement-information/create">
          <FontAwesomeIcon icon="fa fa-ad" />
          <span className="texts">
            <span className="text-1">Advertisement Information</span>
            <span className="text-2">Create New Advertisement</span>
          </span>
        </Link>
      </div>
      <div className="projects-section ">
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">{ad_info.length}</span>
              <span className="status-type">Total Advertisement</span>
            </div>
          </div>
          <div className="projects-status">
            <div className="item-status">
              <div className="flex justify-end">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Advertisement"
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
              Advertisement List
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
            {filtered_ad_info.length > 0 ? (
              filtered_ad_info.map((company, idx) => {
                const { id, name, ad_file, created_at, info } = company;
                return (
                  <SwiperSlide key={`complete_invoice_${idx}_${id}`} className="advertisement-card-box-wrapper">
                    <div
                      className="advertisement-card"
                      style={{
                        backgroundImage: `url(${ImageDownloadURL}/${ad_file})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                      }}
                      onClick={() => setImageView({ state: true, image: `${ImageDownloadURL}/${ad_file}` })}
                    >
                      <div className="advertisement-card-content">
                        <div className="advertisement-card-header">
                          <Link to={`/advertisement-information/update/${id}`} className="bg-white rounded p-2 text-blue-900 hover:underline font-semibold">
                            {idx + 1}. {name}
                          </Link>
                        </div>

                        <p className="advertisement-card-line time bg-white rounded p-2 opacity-100 flex gap-3 justify-between hover:underline hover:text-blue-900 cursor-pointer">
                          <span>Click to view Advertisement Image</span>
                          <span>{moment(created_at).format("ddd, DD-MM-yyyy  h:mm A")}</span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="text-center font-medium  py-5">Currently, there are no advertisement available for viewing.</div>
            )}
          </Swiper>
        </div>
      </div>
      {imageView.state && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50"
          onClick={() => setImageView({ state: false, image: null })}
        >
          <div className="w-10/12 h-5/6 bg-white">
            <img src={imageView.image} alt="advertisement" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvertisementInformationPage;
