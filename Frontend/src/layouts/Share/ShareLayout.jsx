import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGlobalState } from "../../app/global_store";
import { findPageByName } from "../../common";
import Header from "../../components/PageElements/Header/Header.elements";

function ShareLayout() {
  const { changeTitle, global } = useGlobalState((state) => state);

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

  return (
    <>
      <Header />
      <div className="app-content">
        <div className="app-sidebar"></div>
        <div className="projects-section">
          <div className="projects-section-header">
            <p>
              <Link className="pr-5 hover:text-blue-800" to={-1}>
                ❮
              </Link>
              {global.title}
            </p>
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
  );
}

export default ShareLayout;
