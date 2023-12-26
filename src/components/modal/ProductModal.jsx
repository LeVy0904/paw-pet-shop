import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import SmallShoppingCart from "./SmallShoppingCart";

export default function ProductModal(props) {
  const { productData, onHide, onSelectProduct, ...modalProps } = props;
  // const [Cart, setCart] = useState();
  const getUser = localStorage.getItem("user");
  const user = getUser ? JSON.parse(getUser) : null;
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  if (!productData) {
    return null;
  }

  const handleAddToCart = (productData) => {
    try {
      const userid = user.userid;
      let product;
      if (productData && productData.age) {
        const petid = productData._id;
        product = [{ petid: petid, quantity: 1 }];
      }
      if (productData && productData.quantity) {
        const productid = productData._id;
        product = [{ productid: productid, quantity: 1 }];
      }
      console.log(product);
      const response = axios.post(
        `http://localhost:3001/v1/cart/addToCart/${userid}`,
        product
      );
      const data = response.data;
      // const newCart = response.cart.products;
      // setCart(newCart);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setShowCart(true);
  };

  const handleClose = () => {
    onHide();
    // onSelectProduct(null); // Reset selected product
  };

  const handleBuyNow = () => {
    navigate(`/cart`);
  };

  return (
    <>
      <Modal
        {...modalProps}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>
            <h2 style={{ color: "#3a43b7" }}>Xem trước</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <Image
                  src={productData.image}
                  alt={productData.name}
                  fluid
                  rounded
                />
              </Col>
              <Col xs={12} md={6}>
                <h2 style={{ fontWeight: "600" }}>{productData.name}</h2>
                <h5 className="mt-2" style={{ color: "#5d6bb0" }}>
                  Price: {productData.price.toLocaleString()} đ
                </h5>
                <p className="mt-2">Mã Sản Phẩm: {productData._id}</p>
                <button
                  // id="custom-button2"
                  className="add-to-cart-button mt-2"
                  style={{ width: "100%" }}
                  onClick={() => handleAddToCart(productData)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  // id="custom-button"
                  className="buy-now-button mt-2 mb-3"
                  style={{ width: "100%" }}
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
                <p style={{ textAlign: "right" }}>
                  <Link
                    to={`/product-detail/${productData._id}`}
                    onClick={handleClose}
                  >
                    Chi tiết sản phẩm
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {showCart && (
        <SmallShoppingCart show={showCart} onHide={() => setShowCart(false)} />
      )}
    </>
  );
}
