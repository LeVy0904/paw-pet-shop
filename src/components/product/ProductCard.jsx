import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProductModal from "../modal/ProductModal";
import EditProductModal from "../modal/EditProduct";
//import { productDataList } from "../../data/data";
import IconAdd from "../iconadd/iconadd";
import "./productCard.css";

import SearchBar from "../search-bar/SearchBar";

export default function ProductCard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalShow, setModalShow] = useState({
    show: false,
    productData: null,
  });

  const [modalEditShow, setModalEditShow] = useState({
    show: false,
    productData: null,
  });

  const [visibleProducts, setVisibleProducts] = useState(6); // Số lượng sản phẩm muốn hiển thị ban đầu
  const [productDataList, setProductDataList] = useState([]);

  useEffect(() => {
    const petApi = "http://localhost:3001/v1/pet/getAllPets";
    const productApi = "http://localhost:3001/v1/product/getAllProducts";
    axios
      .all([axios.get(petApi), axios.get(productApi)])
      .then(([petResponse, productResponse]) => {
        const petData = petResponse.data;
        const productData = productResponse.data;
        const allData = [...petData, ...productData];
        setProductDataList(allData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Gọi API khi component được tạo

  const productsToShow = productDataList.slice(0, visibleProducts);

  const handleShowModal = (productData) => {
    setModalShow({ show: true, productData: productData });
  };

  const handleShowEditModal = (productData) => {
    setModalEditShow({ show: true, productData: productData });
  };

  const handleCloseEditModal = () => {
    setModalEditShow({ show: false, productData: null });
  };

  const handleCloseModal = () => {
    setModalShow({ show: false, productData: null });
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 6); // Tăng số lượng sản phẩm khi bấm nút "Xem thêm"
  };

  const handleDeleteProduct = async (productData) => {
    if (productData.age) {
      const id = productData._id;
      const petApi = "http://localhost:3001/v1/pet/deletePet/" + id;

      try {
        const response = await axios.delete(petApi);

        if (response.status === 201) {
          console.log("Sản phẩm đã được xóa thành công");
          window.location.reload();
        } else {
          console.error("Xóa sản phẩm thất bại:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
    const id = productData._id;
    const productApi = "http://localhost:3001/v1/product/deleteProduct/" + id;
    try {
      const response = await axios.delete(productApi);

      if (response.status === 201) {
        console.log("Sản phẩm đã được xóa thành công");
        window.location.reload();
      } else {
        console.error("Xóa sản phẩm thất bại:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
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
                  <Card.Title>
                    Giá: {productData.price.toLocaleString()} đ
                  </Card.Title>
                  {user.admin && (
                    <div className="action-wrapper">
                      <button
                        id="custom-button"
                        className="mx-auto shadow"
                        onClick={() => handleShowModal(productData)}
                      >
                        Xem Trước
                      </button>
                      <button
                        className="edit-btn-wrapper"
                        onClick={() => handleShowEditModal(productData)}
                      >
                        <img className="edit-btn" src={editIcon} alt="" />
                      </button>
                      <button
                        className="delete-btn-wrapper"
                        onClick={() => handleDeleteProduct(productData)}
                      >
                        <img className="delete-btn" src={deleteIcon} alt="" />
                      </button>
                    </div>
                  )}

                  {!user.admin && (
                    <div className="action-wrapper">
                      <button
                        id="custom-button-customer"
                        className="mx-auto shadow"
                        onClick={() => handleShowModal(productData)}
                      >
                        Xem Trước
                      </button>
                    </div>
                  )}
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
      <EditProductModal
        show={modalEditShow.show}
        onHide={handleCloseEditModal}
        productData={modalEditShow.productData}
      />

      {user.admin && <IconAdd />}

      {/* {selectedProduct && <ProductDetail productDetails={selectedProduct} />} */}
    </>
  );
}
