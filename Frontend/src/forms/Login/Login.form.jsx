import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./Login.form.css";
import { useGlobalState } from "../../app/global_store";
import { useNavigate } from "react-router-dom";
import useKeycloak from "../../hooks/useKeycloak";

function LoginForm() {
  const navigate = useNavigate();
  const { initLogin, user } = useGlobalState((state) => state);

  const [isLoggedInTried, setIsLoggedInTried] = useState(false);
  const {  login, logout } = useKeycloak();

  useEffect(() => {
    if (user.isLoggedIn) {
      setIsLoggedInTried(false);
      toast.success("Logged In");
      navigate("/");
    } else if (!user.isLoggedIn && isLoggedInTried) {
      setIsLoggedInTried(false);
      toast.error("Wrong Username/Password");
    }

    return () => {
      setIsLoggedInTried(false);
    };
  }, [user]);

  const onSubmit = async () => {
    setIsLoggedInTried(true);
  };

  return (
    <div className="form-container ">
      <div className="text-3xl text-right">Login</div>
      <div className="form">
        <button type="button" className="form-submit-btn" onClick={login}>
          Login
        </button>
        <button type="button" className="form-submit-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
