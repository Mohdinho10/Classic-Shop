import { useSelector } from "react-redux";
import { FaTrash, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import Loader from "../component/Loader";

function UsersPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [selectedUser, setSelectedUser] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      refetch();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleToggleAdmin = async (user) => {
    try {
      await updateUser({ userId: user._id, isAdmin: !user.isAdmin }).unwrap();
      toast.success("User admin status updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Failed to fetch users</p>;

  const filteredUsers = users.filter((u) => u._id !== userInfo._id);

  return (
    <div className="pt-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Users Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Admin
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{user.name}</td>
                <td className="px-4 py-2 text-sm">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-4 py-2 text-sm">
                  {user.isAdmin ? (
                    <span className="font-semibold text-green-600">Yes</span>
                  ) : (
                    <span className="text-gray-600">No</span>
                  )}
                </td>
                <td className="flex items-center gap-4 px-4 py-2 text-sm">
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleToggleAdmin(user)}
                      className="text--gray-600 hover:text--gray-600"
                      title="Toggle Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                  {!user.isAdmin && (
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedUser.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                className="rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
