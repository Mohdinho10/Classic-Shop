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
  const { data: user, isLoading, error } = useGetProfileQuery();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId: userInfo?._id,
        name: username,
        oldPassword,
        newPassword,
      }).unwrap();

      toast.success("Profile updated successfully");
      setOldPassword("");
      setNewPassword("");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message || err?.error || err?.message || "Update failed",
      );
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Old Password</label>
          <input
            type="password"
            className="w-full rounded border p-2 focus:border-black focus:outline-none"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Required only if changing password"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full rounded border p-2 focus:border-black focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
