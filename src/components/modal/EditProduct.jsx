import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

export default function EditModal(props) {
  const { productData, onHide, onSelectProduct, ...modalProps } = props;
  let apiURL = null;
  console.log(productData);
  let id = null;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
    type: "",
    age: "",
    gender: "",
    origin: "",
    weight: "",
    detail: "",
  });

  const handleModalClose = () => {
    onHide();
    setFormData({
      name: "",
      price: "",
      quantity: "",
      image: "",
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
    onHide();

    // Tạo đối tượng chỉ chứa những trường thay đổi
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "") {
        changedFields[key] = formData[key];
      }
    });

    const requestData = {
      ...changedFields,
    };

    console.log("Request data:", requestData);

    if (productData && productData.age) {
      id = productData._id;
      apiURL = "http://localhost:3001/v1/pet/updatePet/" + id;
    } else if (productData && productData.quantity) {
      id = productData._id;
      apiURL = "http://localhost:3001/v1/product/updateProduct/" + id;
    }

    axios
      .put(apiURL, requestData)
      .then((response) => {
        console.log("API response:", response.data);
        handleModalClose();
      })
      .catch((error) => {
        console.log(apiURL);
        console.log("Request data:", requestData);
        console.error("API error:", error);
        console.log(apiURL);

        // Log more details from the server response
        if (error.response) {
          console.error("Server response data:", error.response.data);
          console.error("Server response status:", error.response.status);
          console.error("Server response headers:", error.response.headers);
        }
      });
    window.location.reload();
    handleModalClose();
  };
  if (!productData) {
    return null;
  }
  const handleChange = (field, value) => {
    if (formData[field] !== value) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleClose = () => {
    onHide();
  };
  return (
    <div>
      {productData.age && (
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
              <h2 style={{ color: "#3a43b7" }}> Edit </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Form.Group controlId="age">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder={productData.age}
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                placeholder={productData.gender}
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="origin">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.origin}
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder={productData.weight}
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={productData.price.toLocaleString()}
                đ
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.image}
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={productData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleModalClose}>Đóng</Button>
            <Button onClick={handleSave}>Lưu</Button>
          </Modal.Footer>
        </Modal>
      )}
      {productData.quantity && (
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
              <h2 style={{ color: "#3a43b7" }}> Edit </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.price}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="detail">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.detail}
                onChange={(e) =>
                  setFormData({ ...formData, detail: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                placeholder={productData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Choose type product</option>
                <option value="male">Toy</option>
                <option value="female">Food</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={productData.price}
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder={productData.image}
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={productData.description}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleModalClose}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
