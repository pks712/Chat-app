import React from "react";
import "./App.css";
import Left from "./components/home/left/left";
import Right from "./components/home/right/right";
import Signup from "./log-sign/Signup";
import Login from "./log-sign/Login";
import { useAuth } from "./context/AuthProvider.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import useConversation from "./statemange/userConversation";
import Logout from "./components/home/left1/Logout"; // ✅ Import Sidebar

function App() {
  const { authuser } = useAuth();
  const { showChatOnMobile } = useConversation();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="h-screen">
                {/*  MOBILE LAYOUT */}
                <div className="lg:hidden h-full">
                  {showChatOnMobile ? <Right /> : <Left />}
                </div>

                {/* 💻 DESKTOP LAYOUT */}
                <div className="hidden lg:flex h-full">
                  <Logout /> {/* ✅ Sidebar (w-14) */}
                  <Left />   {/* ✅ Users/Search Panel (w-[30%]) */}
                  <Right />  {/* ✅ Chat Panel (flex-1) */}
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={authuser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authuser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
