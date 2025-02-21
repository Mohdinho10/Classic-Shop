import logo from "/logo-admin.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={logo} alt="" className="w-[max(10%,80px)]" />
      <button
        onClick={logoutHandler}
        className="rounded-full bg-gray-600 px-5 py-2 text-sm text-white md:px-7 md:py-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
