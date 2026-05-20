import { useEffect, useState } from "react";

import { FaUsers, FaMagnifyingGlass } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../../services/adminService";

import { setUsers } from "../../redux/slices/adminUserSlice";
import { FaEllipsisVertical, FaTrash } from "react-icons/fa6";

import toast from "react-hot-toast";

import { deleteUser } from "../../services/adminService";

export default function AdminUserManagement() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.adminUsers.users) || [];

  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  useEffect(() => {
    async function loadUsers() {
      const data = await getAllUsers();
      console.log(data);
      dispatch(setUsers(data.data || []));
    }

    loadUsers();
  }, []);
  console.log(users);
  const filteredUsers = users.filter((user) => {
    const text = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text) ||
      user.phoneNumber.includes(text)
    );
  });

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);

    if (response.success) {
      dispatch(
        setUsers(
          users.map((u) =>
            u.userId === id
              ? {
                  ...u,
                  active: false,
                }
              : u,
          ),
        ),
      );

      toast.success("User deleted successfully");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[56px] font-black text-[#111827] leading-none">
            User Management
          </h1>

          <p className="text-[#6B7280] mt-5 text-[17px] max-w-[800px] leading-8">
            Monitor registered users, wallet balances and booking activity.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-black text-[#111827]">
            Registered Users
          </h2>

          <div className="w-[340px] bg-[#F4F7FB] border border-[#E9EDF5] rounded-2xl px-5 py-4 flex items-center gap-4">
            <FaMagnifyingGlass className="text-[#9CA3AF]" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#EEF2F7]">
          {filteredUsers.length === 0 ? (
            <div className="w-full py-24 flex flex-col items-center justify-center bg-[#FAFBFD]">
              <div className="w-20 h-20 rounded-[24px] bg-[#EEF4FF] flex items-center justify-center text-[34px]">
                <FaUsers />
              </div>

              <h2 className="text-[30px] font-black text-[#111827] mt-8">
                No Users Found
              </h2>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    User
                  </th>

                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    Contact
                  </th>

                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    Wallet
                  </th>

                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    Bookings
                  </th>

                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    Status
                  </th>

                  <th className="px-6 py-5" />
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-t border-[#EEF2F7] ${
                      !user.active ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] font-black">
                          {user.name?.charAt(0)}
                        </div>

                        <div>
                          <h3 className="font-bold text-[#111827]">
                            {user.name}
                          </h3>

                          <p className="text-[#9CA3AF] text-sm mt-1">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6 font-medium text-[#374151]">
                      {user.phoneNumber}
                    </td>

                    <td className="px-6 py-6 font-black text-[#111827]">
                      ₹{user.wallet}
                    </td>

                    <td className="px-6 py-6">
                      <span className="bg-[#EEF4FF] text-[#2563EB] px-4 py-2 rounded-xl text-sm font-bold">
                        {user.bookingsCount}
                      </span>
                    </td>

                    <td className="px-6 py-6">
                      {user.active ? (
                        <span className="bg-[#DCFCE7] text-[#16A34A] px-4 py-2 rounded-xl text-sm font-bold">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="bg-[#FEE2E2] text-[#DC2626] px-4 py-2 rounded-xl text-sm font-bold">
                          DELETED
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-6 text-right relative">
                      <button
                        onClick={() => {
                          setShowMenu(
                            showMenu === user.userId ? null : user.userId,
                          );
                        }}
                        className="text-[#6B7280] hover:text-[#111827]"
                      >
                        <FaEllipsisVertical />
                      </button>

                      {showMenu === user.userId && (
                        <div className="absolute right-10 top-14 bg-white border border-[#E9EDF5] shadow-xl rounded-2xl overflow-hidden z-20 min-w-[180px]">
                          {user.active ? (
                            <button
                              onClick={() => {
                                handleDeleteUser(user.userId);

                                setShowMenu(null);
                              }}
                              className="w-full text-left px-5 py-4 hover:bg-[#FEECEC] transition-all font-medium text-[#DC2626] flex items-center gap-3"
                            >
                              <FaTrash />
                              Delete User
                            </button>
                          ) : (
                            <div className="px-5 py-4 text-[#9CA3AF] text-sm font-medium">
                              User already deleted
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
