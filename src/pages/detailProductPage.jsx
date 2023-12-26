import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import ProductDetail from "../components/product-detail/ProductDetail";
import Login from "../components/login/Login";
import useCheckToken from "../components/custom-hook/UseCheckToken";

export default function DetailProductPage() {
  const getUser = localStorage.getItem("user");
  const getToken = localStorage.getItem("token");

  useCheckToken();

  return (
    <div>
      {getToken && getUser ? (
        <>
          <Header />
          <ProductDetail />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
