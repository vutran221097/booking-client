import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Booking from "./pages/booking/Booking";
import Hotel from "./pages/hotel/Hotel";
import ProtectedRoute from "./constants/ProtectedRoute";
import Transaction from "./pages/transaction/Transaction";

import "./App.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute redirectPath="/login" isLogged={isLogged}>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
