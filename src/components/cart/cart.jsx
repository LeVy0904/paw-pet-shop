import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../cart/cart.css";
import cat from "../../img/bonludan.jpeg";
import { Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [products, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { customerid } = useParams();

  useEffect(() => {
    console.log("1");
    axios
      .get(`http://localhost:3001/v1/cart/getCart/${customerid}`)
      .then((response) => {
        const newData = response.data.cart;
        const newProduct = response.data.cart.products
        console.log(newProduct);
        console.log(newData);
        setCart(newData);
        setProduct(newProduct);
        
        localStorage.setItem('Cart', JSON.stringify(newData));

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleIncreaseQuantity = async (productid) => {
    try {
      console.log(productid);
      const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
        productid: productid._id,
        action: "increase"
      });
      setCart(response)
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDecreaseQuantity = async (productid) => {
    try {
      console.log(productid);
      const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
        productid: productid._id,
        action: "decrease"
      });

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleSelectProduct = async (productid) => {
    try {
      const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
        productid: productid,
        selected: "true"
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div>
      <div className="cart-container">
        <h1>My Cart</h1>
        <div className="cart">
          <div className="cart-product">
            {products.map((product) => (
              <div key={product.productId} className="product">
                <img src={product.productid.image} alt="" />
                <div className="product-info">
                  <h3 className="product-name">Name: {product.productid.name}</h3>
                  <h4 className="product-price">Price: {product.productid.price}</h4>
                  <label>
                    <input
                      type="radio"
                      checked={product.selected}
                      OnChange={() => handleSelectProduct(product.productid)}
                    />
                    Select
                  </label>
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
                  <p className="product-remove">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <span className="remove">Gỡ bỏ</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <p>
              <span>Tổng Tiền</span>
              <span>360.000</span>
            </p>

            <p>
              <span>Số Sản Phẩm</span>
              <span>2</span>
            </p>

            <p>
              <span>Tiết Kiệm</span>
              <span>36.000</span>
            </p>

            <p>
              <span>Thuế</span>
              <span>0</span>
            </p>
            <div className="total">
              <p>
                <span>
                  <b>Thành Tiền </b>
                </span>
                <span>
                  <b>324.000</b>
                </span>
              </p>
              <Link to={"/credit"}>Tiến Hành Thanh Toán</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
