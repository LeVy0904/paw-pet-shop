import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import Profile from "../components/profile/Profile";
import useCheckToken from "../components/custom-hook/UseCheckToken";
import Login from "../components/login/Login";

export default function ProfilePage() {
  const getUser = localStorage.getItem("user");
  const getToken = localStorage.getItem("token");
  useCheckToken();

  return (
    <div>
      {getToken && getUser ? (
        <>
          <Header />
          <Profile />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
