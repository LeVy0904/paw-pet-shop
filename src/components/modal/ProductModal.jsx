import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function ProductModal(props) {
  const { productData, onHide, onSelectProduct, ...modalProps } = props;

  if (!productData) {
    return null;
  }

  const handleClose = () => {
    onHide();
    onSelectProduct(null); // Reset selected product
  };

  return (
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
          <h2 style={{ color: "#3a43b7" }}>Preview</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Image
                src={productData.image}
                alt={productData.title}
                fluid
                rounded
              />
            </Col>
            <Col xs={12} md={6}>
              <h2 style={{ fontWeight: "600" }}>{productData.title}</h2>
              <h5 className="mt-2" style={{ color: "#5d6bb0" }}>
                Price: {productData.price} VNĐ
              </h5>
              <p className="mt-2">Product ID: {productData.productId}</p>
              <button
                // id="custom-button2"
                className="add-to-cart-button mt-2"
                style={{ width: "100%" }}
                onClick={() => console.log("Add to Cart clicked")}
              >
                Add to Cart
              </button>
              <button
                // id="custom-button"
                className="buy-now-button mt-2 mb-3"
                style={{ width: "100%" }}
                onClick={() => console.log("Add to Cart clicked")}
              >
                Buy Now
              </button>
              <p style={{ textAlign: "right" }}>
                <Link
                  to={`/product-detail/${productData.productId}`}
                  onClick={() => onSelectProduct(productData)}
                >
                  More Details
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
