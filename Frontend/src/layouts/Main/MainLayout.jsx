import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../app/global_store";
import { current_month, current_year, findPageByName, findPageByURL, page_routes } from "../../common";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
import Header from "../../components/PageElements/Header/Header.elements";
import useKeycloak from "../../hooks/useKeycloak";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { share_regex } from "../../env";
import PageLoader from "../../components/Loader/Page.loader";

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { initKeyClock } = useKeycloak();
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    user,
    global,
    changeTitle,
    initLogout,
    setUserList,
    keycloak: { keycloakInstance, isAuth, isInit },
  } = useGlobalState((state) => state);
  const { getAllInvoices, getAllPreset } = useCustomInvoicesState((state) => state);

  useEffect(() => {
    initKeyClock().then(() => setTimeout(() => setIsInitialized(true), 1000));
  }, []);

  useEffect(() => {
    if (isAuth) {
      (async () => {
        await getAllInvoices();
        await getAllPreset();
        await setUserList();
      })();
    }
  }, [isAuth]);

  useEffect(() => {
    let title = null;
    for (const key of Object.keys(findPageByName)) {
      const pattern = findPageByName[key];
      if (pattern.test(location.pathname)) {
        title = key;
        break;
      }
    }
    changeTitle(title);
    return () => {
      changeTitle("Welcome to FN Money");
    };
  }, [location.pathname]);

  return isInitialized ? (
    <>
      <Header />
      <div className="app-content">
        <div className="app-sidebar">
          {page_routes.map((page, idx) => {
            if (page.isSidebar)
              return (
                <Link key={`page_${idx}_${page.title}`} to={page.url} className={`app-sidebar-link ${page.url === location.pathname ? "active" : ""}`}>
                  <FontAwesomeIcon icon={page.icon} />
                </Link>
              );
          })}
        </div>
        <div className="projects-section">
          <div className="projects-section-header">
            <p>
              <Link className="pr-5 hover:text-blue-800" to={-1}>
                ❮
              </Link>
              {global.title}{" "}
            </p>
            {/* <p className="time">
              {current_month}, {current_year}
            </p> */}
          </div>
          <div
            style={{
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <div className="fixed text-right -right-28 bottom-32 hover:-translate-x-[6.5rem] transition-transform">
        <a href="http://fnmoney.ai" title="Math & AI in Finance">
          <span className="font-bold bg-[#303030] text-white py-3 px-6 rounded-lg hover:bg-black transition-colors duration-300">FnMoney.ai</span>
        </a>
      </div>
    </>
  ) : (
    <PageLoader title="App Initializing" />
  );
}

export default MainLayout;
