import React, { useState } from "react";
import plusicon from "../../img/plus.svg";
import "./iconadd.css";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function IconAdd() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Reset input fields on modal close
    setProductName("");
    setProductPrice("");
    setQuantity("");
    setImage(null);
    setDescription("");
    setType(""); // Reset the type state
  };
  const handleSave = () => {
    // Handle save logic here
    // You can access the input values like productName, productPrice, etc.
    console.log("Product Name:", productName);
    console.log("Product Price:", productPrice);
    console.log("Quantity:", quantity);
    console.log("Image:", image);
    console.log("Description:", description);

    // Close the modal after handling the save logic
    handleModalClose();
  };



  return (
    <div className="iconadd" >
      <Dropdown onSelect={handleDropdownSelect}>
        <Dropdown.Toggle>
          <div className="iconadd_div">
            <div className="iconadd_div_img">
              <img className="iconadd_img" src={plusicon} alt="" srcSet="" />
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu id="custom-nav-menu">
          <Dropdown.Item eventKey="addProduct">Thêm Sản Phẩm</Dropdown.Item>
          <Dropdown.Item eventKey="addPet">Thêm Thú Cưng</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedOption === "addProduct"
              ? "Thêm Sản Phẩm"
              : "Thêm Thú Cưng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Giá Sản Phẩm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Số Lượng</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Loại</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Thú Cưng</option>
                <option value="type1">Sản phẩm cho Thú cưng</option>
                <option value="type2">Khác</option>
                
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Ảnh Sản Phẩm</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Mô Tả Sản Phẩm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập mô tả sản phẩm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>
            Đóng
          </Button>
          <Button onClick={handleSave}>
            Lưu
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}
