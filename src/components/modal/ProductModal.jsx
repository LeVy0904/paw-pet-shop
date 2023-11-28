import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function ProductModal(props) {
  const { productData, ...modalProps } = props;

  if (!productData) {
    return null; // or some other fallback UI
  }

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
        <Modal.Header closeButton>
          <Modal.Title>{productData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <img
                  src={productData.image}
                  alt={productData.title}
                  className="img-fluid"
                />
              </Col>
              <Col xs={12} md={6}>
                <h3>{productData.title}</h3>
                <h4 className="mt-2">Price: {productData.price} VNĐ</h4>
                <p className="mt-2">Mã Sản phẩm: {productData.productId}</p>
                <button id="custom-button"
                  variant="primary"
                  className="mt-2"
                  style={{ width: "100%" }}
                  onClick={() => console.log("Add to Cart clicked")}
                >
                  Add to Cart
                </button>
                <p style={{ textAlign: "right", marginTop: "10px" }}>
                  <a href="/product-detail">Xem thêm chi tiết</a>
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}