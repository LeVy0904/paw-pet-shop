import React, { useState } from "react";
import plusicon from "../../img/plus.svg";
import "./iconadd.css";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function IconAdd() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Use a single state for both pet and product
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
    description: "",
    type: "",
    age: "",
    gender: "",
    origin: "",
    weight: "",
    detail: "",
  });

  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Reset input fields on modal close
    setFormData({
      name: "",
      price: "",
      quantity: "",
      image: null,
      description: "",
      type: "",
      age: "",
      gender: "",
      origin: "",
      weight: "",
      detail: "",
    });
  };

  const handleSave = () => {
    // Prepare the data to be sent in the request
    const requestData = {
      ...formData,
    };
    console.log("Request data:", requestData);
    // Determine the API endpoint based on the selected option
    const apiUrl =
      selectedOption === "addPet"
        ? "http://localhost:3001/v1/pet/addPet"
        : "http://localhost:3001/v1/product/addProduct";

    // Make the API request using Axios and promises
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("API response:", response.data);

        // Close the modal after handling the save logic
        handleModalClose();
      })
      .catch((error) => {
        console.error("API error:", error);

        // Handle error logic if needed

        // Close the modal after handling the save logic
        handleModalClose();
      });
    window.location.reload();
  };

  return (
    <div className="iconadd">
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
              <Form.Label>
                Tên {selectedOption === "addProduct" ? "Sản Phẩm" : "Thú Cưng"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Nhập tên ${
                  selectedOption === "addProduct" ? "sản phẩm" : "thú cưng"
                }`}
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            {selectedOption === "addPet" && (
              <>
                <Form.Group controlId="age">
                  <Form.Label>Tuổi</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập tuổi"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="gender">
                  <Form.Label>Giới Tính</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="origin">
                  <Form.Label>Xuất Xứ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập xuất xứ"
                    value={formData.origin}
                    onChange={(e) =>
                      setFormData({ ...formData, origin: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="weight">
                  <Form.Label>Cân Nặng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập cân nặng"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Giá Thú Cưng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá thú cưng"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Ảnh Thú Cưng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập URL ảnh thú cưng"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Mô Tả Thú Cưng</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập mô tả thú cưng"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}

            {selectedOption === "addProduct" && (
              <>
                <Form.Group controlId="quantity">
                  <Form.Label>Số Lượng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập số lượng"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Loại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập loại sản phẩm"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="detail">
                  <Form.Label>Chi Tiết</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập chi tiết sản phẩm"
                    value={formData.detail}
                    onChange={(e) =>
                      setFormData({ ...formData, detail: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Ảnh Sản Phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập URL ảnh sản phẩm"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Giá Sản Phẩm</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Mô Tả Sản Phẩm</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập mô tả sản phẩm"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleModalClose}>Đóng</Button>
          <Button onClick={handleSave}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
