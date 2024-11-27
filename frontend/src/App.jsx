import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ShopProvider } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CartPage from "./pages/CartPage";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/place-order" element={<PlaceOrderPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}
      />
    </ShopProvider>
  );
}

export default App;
