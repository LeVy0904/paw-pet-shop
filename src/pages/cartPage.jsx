import React from "react";
import Header from "../components/header/Header";
import Cart from "../components/cart/cart";
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
          <Cart />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
