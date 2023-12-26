import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"; // Remove this line if not used
import { useNavigate } from "react-router-dom";
import { productDataList as cartItems } from "../../data/data";
import "./small-shopping-cart.css";

const SmallShoppingCart = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(cartItems);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      const price = parseFloat(
        item.price.replace(/\./g, "").replace(/,/g, ".")
      ); // Convert string to number
      total += price * item.quantity;
    });
    return total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <Modal id="modal-right" show={show} onHide={onHide} size="md">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#302f51", color: "white" }}
      >
        <Modal.Title>Giỏ hàng của bạn</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
      >
        {cart.map((item, index) => (
          <Row key={index} className="mb-2">
            <Col xs={3}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col xs={8}>
              <p className="mb-0">{item.name}</p>
              <p className="mb-0">{item.price} VNĐ</p>
              <Col xs={12} className="mt-2">
                <button
                  className="btn mr-2"
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn ml-2"
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  +
                </button>
              </Col>
            </Col>
            <Col xs={1} className="text-right">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => console.log("Remove item")}
              >
                <i className="custom-close-btn fa-solid fa-circle-xmark"></i>
              </span>
            </Col>
          </Row>
        ))}
        <hr />
        <Row>
          <Col>
            <p className="mb-0 font-weight-bold flex">
              Tổng tiền: {calculateTotal()}
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="mx-auto">
          <Col>
            <button
              id="custom-button"
              className="p-2"
              onClick={() => navigate(`/cart`)}
              block
            >
              Xem chi tiết giỏ hàng
            </button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default SmallShoppingCart;
