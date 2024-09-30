import { useEffect, useState } from "react";

import CustomRouter from "./CustomRouter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faCalendarDays, faCheckCircle, faCircleXmark, faCreditCard, faEnvelope, faFilePdf, faMessage, faMoon, faSquare, faStar, faUser } from "@fortawesome/free-regular-svg-icons";

import {
  faArrowLeft,
  faArrowRight,
  faArrowsRotate,
  faBuilding,
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faCircleCheck,
  faClockRotateLeft,
  faDice,
  faDownload,
  faEllipsisVertical,
  faFilePen,
  faGear,
  faGlobe,
  faGrip,
  faHistory,
  faHouse,
  faIcons,
  faInfo,
  faList,
  faPhone,
  faPieChart,
  faPlus,
  faPrint,
  faRectangleAd,
  faSpinner,
  faSquarePen,
  faStop,
  faSun,
  faTriangleExclamation,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import "./App.css";
import { share_regex } from "./env";

const LibraryIcons = [
  fas,
  faMoon,
  faPlus,
  faMessage,
  faHouse,
  faPieChart,
  faCalendar,
  faGear,
  faList,
  faGrip,
  faEllipsisVertical,
  faCircleXmark,
  faStar,
  faClockRotateLeft,
  faChevronDown,
  faChevronUp,
  faStop,
  faTrash,
  faCheckCircle,
  faDice,
  faCalendarDays,
  faArrowRight,
  faSquare,
  faIcons,
  faPrint,
  faDownload,
  faSquarePen,
  faFilePdf,
  faUser,
  faInfo,
  faEnvelope,
  faGlobe,
  faPhone,
  faTriangleExclamation,
  faChevronLeft,
  faSun,
  faCircleCheck,
  faArrowsRotate,
  faPlus,
  faFilePen,
  faSpinner,
  faCreditCard,
  faArrowLeft,
  faBuilding,
  faRectangleAd,
  faHistory,
];

library.add(...LibraryIcons);
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <CustomRouter />
      <Toaster />
    </>
  );
}

export default App;
