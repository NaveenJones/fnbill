import "./Loader.css";

function PageLoader({ title }) {
  const pageLoaderOuterStyle = {
    backgroundImage: "linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255))",
    width: "100px",
    height: "100px",
    animation: "pageloader 1.7s linear infinite",
    textAlign: "center",
    borderRadius: "50px",
    filter: "blur(1px)",
    boxShadow: "0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255)",
  };

  const pageLoaderInnerStyle = {
    backgroundColor: "rgb(36, 36, 36)",
    width: "100px",
    height: "100px",
    borderRadius: "50px",
    filter: "blur(10px)",
  };
  return (
    <div className="top-0 left-0 fixed w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div style={pageLoaderOuterStyle}>
        <div style={pageLoaderInnerStyle}></div>
      </div>
      <div className="pt-10 font-bold text-xl">{title}</div>
    </div>
  );
}

export default PageLoader;
