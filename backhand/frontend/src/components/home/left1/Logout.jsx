import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("messager");
      Cookies.remove("jwt");
      toast.success("Logout successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <div className="hidden lg:flex flex-col justify-between items-center w-14 h-screen bg-slate-900 py-4">
        {/* Top icons (optional) */}
        <div className="flex-1 flex flex-col items-center gap-4">
          {/* Add top icons if needed */}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="p-2 text-white hover:text-red-400 relative group"
        >
          <RiLogoutCircleLine size={28} />

          {/* 👇 Tooltip ऊपर और थोड़ा left में */}
          <span className="absolute bottom-full left-1/2 -translate-x-[60%] mb-2 px-2 py-1 bg-slate-800 rounded text-xs opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap text-red-500">
            Logout
          </span>
        </button>
      </div>

      {/* 🍔 Mobile hamburger (optional, if needed separately) */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(true)} className="text-white">
          <GiHamburgerMenu size={28} />
        </button>
      </div>

      {/* 📱 Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="w-64 h-full bg-slate-900 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-bold">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
                &times;
              </button>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-500 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
