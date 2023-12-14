import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProductModal from "../modal/ProductModal";
//import { productDataList } from "../../data/data";
import IconAdd from "../iconadd/iconadd";
import "./productCard.css";

import SearchBar from "../search-bar/SearchBar";

export default function AllProductCard() {
  const [modalShow, setModalShow] = useState({
    show: false,
    productData: null,
  });

  const [visibleProducts, setVisibleProducts] = useState(6); // Số lượng sản phẩm muốn hiển thị ban đầu
  const [productDataList, setProductDataList] = useState([]);

  useEffect(() => {
    const productApi = "http://localhost:3001/v1/product/getAllProducts";
    axios
      .get(productApi)
      .then((productResponse) => {
        const productData = productResponse.data;
        setProductDataList(productData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Gọi API khi component được tạo

  const productsToShow = productDataList.slice(0, visibleProducts);

  const handleShowModal = (productData) => {
    setModalShow({ show: true, productData: productData });
  };

  const handleCloseModal = () => {
    setModalShow({ show: false, productData: null });
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 6); // Tăng số lượng sản phẩm khi bấm nút "Xem thêm"
  };

  return (
    <>
      <Container className="py-2">
        <h1 className="m-4">Sản Phẩm Của Cửa Hàng</h1>
        <SearchBar />
        <Row xs={1} md={3} className="g-4 m-4">
          {productsToShow.map((productData, idx) => (
            <Col key={idx} className="mb-4">
              <Card className="h-100 shadow ">
                <Card.Img
                  variant="top"
                  src={productData.image}
                  style={{ maxHeight: "355px" }}
                  className="custom-product-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mt-auto">
                    <span className="h3 mt-auto">{productData.name}</span>
                  </Card.Title>
                  <Card.Title>Giá: {productData.price}</Card.Title>
                  <button
                    id="custom-button"
                    className="mx-auto shadow"
                    onClick={() => handleShowModal(productData)}
                  >
                    Xem Trước
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {visibleProducts < productDataList.length && (
          <div className="text-center mt-3">
            <button
              id="custom-button3"
              className="btn "
              onClick={handleShowMore}
            >
              Xem thêm
            </button>
          </div>
        )}
      </Container>

      <ProductModal
        show={modalShow.show}
        onHide={handleCloseModal}
        productData={modalShow.productData}
        // onSelectProduct={(productData) =>
        //   setModalShow({ show: false, productData })
        // }
      />
      <IconAdd />
      {/* {selectedProduct && <ProductDetail productDetails={selectedProduct} />} */}
    </>
  );
}
