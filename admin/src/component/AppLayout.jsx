import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-bodyFont">
      <Header />
      <div className="flex w-full">
        <SideBar />
        <div className="mx-auto my-8 ml-[max(5vw,25px)] w-[70%] text-base text-gray-600">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
