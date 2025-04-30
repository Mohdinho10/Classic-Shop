import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../slices/userApiSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { data: user, isLoading, error } = useGetProfileQuery();
  console.log(user);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  console.log(username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId: userInfo?._id, name: username, password });
      toast.success("Profile updated successfully");
      setPassword(""); // Clear password field
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed");
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load profile details.
      </p>
    );

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md rounded bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Profile</h2>

        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full rounded border p-2 focus:border-black focus:outline-none"
            placeholder={user.name}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full rounded border p-2 focus:border-black focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white hover:opacity-90"
          disabled={loadingUpdate}
        >
          {loadingUpdate ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
