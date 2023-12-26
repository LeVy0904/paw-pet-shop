import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../cart/cart.css";
// import cat from "../../img/bonludan.jpeg";
import { Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  // const [cart, setCart] = useState();
  const [products, setProduct] = useState([]);
  const [pets, setPet] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const { customerid } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/cart/getCart/${customerid}`
      );
      const newData = response.data.cart;
      const newProduct = response.data.cart.products;
      const newPet = response.data.cart.pets;
      const initialSelectedProducts = newProduct.reduce((acc, product) => {
        return { ...acc, [product.productid._id]: product.selected };
      }, {});

      // setCart(newData);
      setProduct(newProduct);
      setPet(newPet);
      setSelectedProducts(initialSelectedProducts);
      console.log(initialSelectedProducts);

      localStorage.setItem("Cart", JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts or customerid changes
  }, [customerid]);

  const handleToggleSelect = (productid) => {
    const newSelectedValue = !selectedProducts[productid];
    const updatedSelectedProducts = {
      ...selectedProducts,
      [productid]: newSelectedValue,
    };
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleIncreaseQuantity = async (productid) => {
    try {
      await axios.put(
        `http://localhost:3001/v1/cart/updateCart/${customerid}`,
        {
          productid: productid._id,
          action: "increase",
        }
      );
      // setCart(response);
      updateCartData();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDecreaseQuantity = async (productid) => {
    try {
      await axios.put(
        `http://localhost:3001/v1/cart/updateCart/${customerid}`,
        {
          productid: productid._id,
          action: "decrease",
        }
      );
      updateCartData();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDeleteItem = async (productid) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/v1/cart/deleteItemById/${customerid}`,
        {
          data: { productid: productid._id },
        }
      );

      if (response.status === 200) {
        console.log("Sản phẩm đã được xóa thành công");
        updateCartData();
      } else {
        console.error("Lỗi khi xóa sản phẩm:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const updateCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/cart/getCart/${customerid}`
      );
      const newData = response.data.cart;
      const newProduct = response.data.cart.products;

      const initialSelectedProducts = newProduct.reduce((acc, product) => {
        return { ...acc, [product.productid._id]: false };
      }, {});

      // setCart(newData);
      setProduct(newProduct);

      setSelectedProducts(initialSelectedProducts);

      localStorage.setItem("Cart", JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSelections = async () => {
    try {
      const updatePromises = Object.entries(selectedProducts).map(
        async ([productid, selected]) => {
          const response = await axios.put(
            `http://localhost:3001/v1/cart/updateCart/${customerid}`,
            {
              productid,
              selected,
            }
          );
          console.log(
            `Sản phẩm ${productid} đã được cập nhật. Đã chọn: ${selected}`,
            response.data
          );
        }
      );

      await Promise.all(updatePromises);

      console.log("Tất cả sản phẩm đã chọn đã được gửi lên server.");

      try {
        const response = await axios.post(
          `http://localhost:3001/v1/order/addOrder/${customerid}`
        );
        console.log(response.data.order);
        navigate(`/order/${response.data.order._id}`);
      } catch (error) {
        console.log("Lỗi khi xuất hóa đơn: ", error);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin sản phẩm đã chọn:", error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const product of products) {
      const productId = product.productid._id;
      if (selectedProducts[productId]) {
        totalPrice += product.productid.price * product.quantity;
      }
    }

    return totalPrice;
  };

  const productsQuantity = () => {
    let productsQ = 0;
    for (const product of products) {
      const productId = product.productid._id;
      if (selectedProducts[productId]) {
        productsQ++;
      }
    }

    return productsQ;
  };

  const productsQ = productsQuantity();

  const totalPrice = calculateTotalPrice();
  console.log(totalPrice);

  return (
    <div>
      <div className="cart-container">
        <h1>Giỏ hàng của tôi</h1>
        <div className="cart">
          <div className="cart-product">
            {products.map((product) => (
              <div key={product.productId} className="product">
                <img src={product.productid.image} alt="" />
                <div className="product-info">
                  <h3 className="product-name">
                    Tên: {product.productid.name}
                  </h3>
                  <h4 className="product-price">
                    Giá: {product.productid.price}
                  </h4>
                  <div className="selectProduct">
                    <label>
                      <input
                        className="selectProduct-input"
                        type="checkbox"
                        checked={selectedProducts[product.productid._id]}
                        onChange={() =>
                          handleToggleSelect(product.productid._id)
                        }
                      />
                      Chọn
                    </label>
                  </div>
                  <p className="product-quantity">
                    <button
                      className="btn"
                      onClick={() => handleDecreaseQuantity(product.productid)}
                    >
                      -
                    </button>
                    <input value={product.quantity} name="" />
                    <button
                      className="btn"
                      onClick={() => handleIncreaseQuantity(product.productid)}
                    >
                      +
                    </button>
                  </p>
                  <p
                    onClick={() => handleDeleteItem(product.productid)}
                    className="product-remove"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <span className="remove">Gỡ bỏ</span>
                  </p>
                </div>
              </div>
            ))}
            {pets.map((pet) => (
              <div key={pet.petid._id} className="product">
                <img src={pet.petid.image} alt="" />
                <div className="product-info">
                  <h3 className="product-name">Tên: {pet.petid.name}</h3>
                  <h4 className="product-price">Giá: {pet.petid.price}</h4>
                  <div className="selectProduct">
                    <p>Thú cưng đã đặt hàng.</p>
                  </div>

                  <p
                    onClick={() => handleDeleteItem(pet.petid)}
                    className="product-remove"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <span className="remove">Gỡ bỏ</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <p>
              <span>Tổng giá</span>
              <span>{totalPrice}</span>
            </p>

            <p>
              <span>Số sản phẩm</span>
              <span>{productsQ}</span>
            </p>

            <p>
              <span>Tiết kiệm</span>
              <span>0</span>
            </p>

            <p>
              <span>Thuế</span>
              <span>0</span>
            </p>
            <div className="total">
              <p>
                <span>
                  <b>Thành tiền </b>
                </span>
                <span>
                  <b>{totalPrice}</b>
                </span>
              </p>
              <Link onClick={handleSaveSelections}>Tiến hành thanh toán</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
