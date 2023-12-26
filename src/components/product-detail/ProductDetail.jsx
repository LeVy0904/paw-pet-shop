import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./product-detail.css"; // Thêm file CSS tùy chỉnh
import SmallShoppingCart from "../modal/SmallShoppingCart";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  const user = getUser ? JSON.parse(getUser) : null;
  const [showCart, setShowCart] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/product/getProductByID/${productId}`)
      .then((response) => {
        setProductDetails(response.data.product);
      })
      .catch(() => {
        // Nếu không lấy được thông tin sản phẩm, thử với endpoint pet
        axios
          .get(`http://localhost:3001/v1/pet/getPetByID/${productId}`)
          .then((petResponse) => {
            setProductDetails(petResponse.data.pet);
          })
          .catch((petError) => {
            console.error("Error fetching pet details:", petError);
          });
      });
  }, [productId]);

  // Check if productDetails is available
  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const handleBuyNow = async () => {
    try {
      await handleAddToCart(productDetails);
      navigate(`/cart/${user.userid}`);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng hoặc chuyển hướng:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userid = user.userid;
      let product;

      if (productDetails && productDetails.age) {
        const petid = productDetails._id;
        product = [{ petid: petid, quantity: 1 }];
      }
      if (productDetails && productDetails.quantity) {
        const productid = productDetails._id;
        product = [{ productid: productid, quantity: 1 }];
      }

      await axios.post(
        `http://localhost:3001/v1/cart/addToCart/${userid}`,
        product
      );
      setShowCart(true);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <>
      <Container>
        <Row className="p-4" style={{ margin: "20vh auto 5vh" }}>
          <Col xs={12} md={6}>
            <Image
              src={productDetails.image}
              alt={productDetails.name}
              fluid
              rounded
            />
          </Col>
          <Col xs={12} md={6}>
            <Card style={{ borderWidth: "0" }}>
              <Card.Body className="px-4">
                <Card.Title className="product-title">
                  <span className="h2" style={{ fontWeight: "600" }}>
                    {productDetails.name}
                  </span>
                </Card.Title>
                <Card.Subtitle className="product-subtitle">
                  <span className="h5" style={{ color: "#5d6bb0" }}>
                    Giá: {productDetails.price.toLocaleString()} đ
                  </span>
                </Card.Subtitle>
                <Card.Text className="mt-3">
                  <strong>Mã Sản Phẩm:</strong> {productId}
                </Card.Text>
                {productDetails.type && (
                  <Card.Text className="mt-2">
                    <strong>Loại:</strong> {productDetails.type}
                  </Card.Text>
                )}
                {productDetails.detail && (
                  <Card.Text className="mt-2">
                    <strong>Thông tin thêm:</strong> {productDetails.detail}
                  </Card.Text>
                )}
                {productDetails.age && (
                  <Card.Text className="mt-2">
                    <strong>Tuổi:</strong> {productDetails.age}
                  </Card.Text>
                )}
                {productDetails.gender && (
                  <Card.Text className="mt-2">
                    <strong>Giới Tính:</strong> {productDetails.gender}
                  </Card.Text>
                )}
                {productDetails.weight && (
                  <Card.Text className="mt-2">
                    <strong>Cân Nặng:</strong> {productDetails.weight} kg
                  </Card.Text>
                )}
                {productDetails.origin && (
                  <Card.Text className="mt-2">
                    <strong>Xuất Xứ:</strong> {productDetails.origin}
                  </Card.Text>
                )}
                {productDetails.description && (
                  <Card.Text className="product-description">
                    <strong>Miêu Tả:</strong> {productDetails.description}
                  </Card.Text>
                )}
                <div className="button-container mt-5 mb-3 ">
                  <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                  <button className="buy-now-button" onClick={handleBuyNow}>
                    Mua Ngay
                  </button>
                </div>
                <p className="mt-2">
                  <Link to="/products">Quay Lại Trang Mua Sắm</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {showCart && (
        <SmallShoppingCart show={showCart} onHide={() => setShowCart(false)} />
      )}
    </>
  );
};

export default ProductDetail;
