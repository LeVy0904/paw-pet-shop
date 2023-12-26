import React from "react";
import Header from "../components/header/Header";
import Home from "../components/home/Home";
import Footer from "../components/footer/footer";
import Login from "../components/login/Login";
import useCheckToken from "../components/custom-hook/UseCheckToken";

export default function HomePage() {
  const getUser = localStorage.getItem("user");
  const getToken = localStorage.getItem("token");

  useCheckToken();

  return (
    <div>
      {getToken && getUser ? (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
