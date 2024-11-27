import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="container font-bodyFont">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
