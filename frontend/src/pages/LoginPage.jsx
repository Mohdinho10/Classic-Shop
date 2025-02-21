import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-2 shadow-sm focus:border-gray-800 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-2 shadow-sm focus:border-gray-800 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-black py-2 text-white"
            >
              {isLoading ? <ClipLoader color="white" size={20} /> : "Login"}
            </button>
          </div>
        </form>
        {/* Additional Links */}
        <p className="text-center text-sm text-gray-500">
          Don`t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
