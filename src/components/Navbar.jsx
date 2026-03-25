import { Button } from "@/components/ui/button";
import { setCart } from "@/redux/productSlice";
import { store } from "@/redux/Store";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { Menu, ShoppingCart, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //  REAL USER FROM REDUx
  const user = useSelector((state) => state.user?.user);
  const {cart} = useSelector(store=>store.product)

  console.log("STATE 👉", useSelector(state => state));

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false

  const logoutHandler = async () => {
    try {
      if (accessToken) {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          } 
        );
      }

      // CLEAR STATE + TOKEN
      dispatch(setUser(null));
      dispatch(setCart({ items: [], totalPrice:0 }));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      // Even if logout fails (e.g., token expired), clear client-side state
      dispatch(setUser(null));
      dispatch(setCart({ items: [], totalPrice:0 }));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      toast.success("Logged out successfully");
      navigate("/login");
      console.log(error);
    }
  };

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-pink-600" />
          <span className="text-2xl font-bold text-pink-600">Ekart</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>

            {/* NAME SHOWS HERE */}
            {user && (
              <li>
                <Link to={`/profile/${user._id}`}>Hello, {user.firstname}</Link> 
              </li>
            )
            }

              {admin && (
              <li>
                <Link to={`/dashboard/sales`}>Dashboard</Link> 
              </li>
            )
            }
          </ul>

          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* LOGOUT CLICK FIXED */}

          {user ? (
            <Button
              type="button"
              onClick={logoutHandler}
              className="bg-pink-600 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-600 text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm">
              {cart?.items?.length || 0}
            </span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-pink-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-50 border-t border-pink-200">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Products</Link>
            {user && (
              <Link to={`/profile/${user._id}`} className="block text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Hello, {user.firstname}</Link>
            )}
            {admin && (
              <Link to={`/dashboard/sales`} className="block text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            )}
            {user ? (
              <Button
                type="button"
                onClick={() => { logoutHandler(); setIsMenuOpen(false); }}
                className="bg-pink-600 text-white w-full"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-blue-600 text-white w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
