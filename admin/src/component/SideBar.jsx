import { NavLink } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

function SideBar() {
  return (
    <div className="min-h-screen w-[18%] border-r-2">
      <div className="flex flex-col gap-4 pl-[20%] pt-6 text-[15px]">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
        >
          <IoMdAddCircleOutline className="h-5 w-5 text-gray-800" />
          <p className="hidden text-gray-900 md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/products"
          className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
        >
          <MdOutlineProductionQuantityLimits className="h-5 w-5 text-gray-800" />
          <p className="hidden text-gray-900 md:block">Products</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
        >
          <FaTruck className="h-5 w-5 text-gray-700" />
          <p className="hidden text-gray-900 md:block">Orders</p>
        </NavLink>
        <NavLink
          to="/users"
          className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
        >
          <FaUsers className="h-5 w-5 text-gray-700" />
          <p className="hidden text-gray-900 md:block">Users</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
