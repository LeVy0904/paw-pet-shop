import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"; // Remove this line if not used
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { productDataList as cartItems } from "../../data/data";
import "./small-shopping-cart.css";

const SmallShoppingCart = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [pets, setPets] = useState([]);
  // const getUser = localStorage.getItem("user");
  // const user = getUser ? JSON.parse(getUser) : null;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    const parsedUser = getUser ? JSON.parse(getUser) : null;
    setUser(parsedUser);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/cart/getCart/${user.userid}`
      );
      const cartData = response.data.cart;
      setCart(cartData);
      setProducts(cartData.products || []);
      setPets(cartData.pets || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchCart();
      }
    };

    fetchData();
  }, [user, fetchCart]);

  const calculateTotal = () => {
    let total = 0;

    // Tính toán tổng giá tiền cho products
    products.forEach((item) => {
      const price = parseFloat(item.productid.price);
      total += price * item.quantity;
    });

    // Tính toán tổng giá tiền cho pets
    pets.forEach((item) => {
      const price = parseFloat(item.petid.price);
      total += price;
    });

    return total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleIncreaseQuantity = async (index) => {
    const updatedCart = [...cart.products];
    updatedCart[index].quantity += 1;
    setCart({ ...cart, products: updatedCart });

    const productId = updatedCart[index].productid._id;
    try {
      await axios.put(
        `http://localhost:3001/v1/cart/updateCart/${user.userid}`,
        {
          productid: productId,
          action: "increase",
        }
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDecreaseQuantity = async (index) => {
    const updatedCart = [...cart.products];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart({ ...cart, products: updatedCart });
      const productId = updatedCart[index].productid._id;

      try {
        await axios.put(
          `http://localhost:3001/v1/cart/updateCart/${user.userid}`,
          {
            productid: productId,
            action: "decrease",
          }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3001/v1/cart/deleteItemById/${user.userid}`,
        {
          data: { productid: productId },
        }
      );
      // Cập nhật lại giỏ hàng sau khi xóa
      fetchCart();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(
        `http://localhost:3001/v1/cart/deleteItemById/${user.userid}`,
        {
          data: { petid: petId },
        }
      );
      // Cập nhật lại giỏ hàng sau khi xóa
      fetchCart();
    } catch (error) {
      console.error("Lỗi khi xóa pet:", error);
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
        {products &&
          products.map((item, index) => (
            <Row key={index} className="mb-2">
              <Col xs={3}>
                <Image
                  src={item.productid ? item.productid.image : ""}
                  alt={item.productid ? item.productid.name : ""}
                  fluid
                  rounded
                />
              </Col>
              <Col xs={8}>
                <p className="mb-0">
                  {item.productid ? item.productid.name : ""}
                </p>
                <p className="mb-0">
                  {item.productid ? item.productid.price.toLocaleString() : ""}{" "}
                  đ
                </p>
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
                  onClick={() => handleDeleteProduct(item.productid._id)}
                >
                  <i className="custom-close-btn fa-solid fa-circle-xmark"></i>
                </span>
              </Col>
            </Row>
          ))}
        {pets &&
          pets.map((pet, index) => (
            <Row key={index} className="mb-2">
              <Col xs={3}>
                <Image
                  src={pet.petid.image}
                  alt={pet.petid.name}
                  fluid
                  rounded
                />
              </Col>
              <Col xs={8}>
                <p className="mb-0">{pet.petid.name}</p>
                <p className="mb-0">{pet.petid.price.toLocaleString()} đ</p>
              </Col>
              <Col xs={1} className="text-right">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeletePet(pet.petid._id)}
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
              onClick={() => navigate(`/cart/${user.userid}`)}
              block
              style={{ width: "100%" }}
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
