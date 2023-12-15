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
  const [selectedProducts, setSelectedProducts] = useState({});
  const { customerid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/v1/cart/getCart/${customerid}`)
      .then((response) => {
        const newData = response.data.cart;
        const newProduct = response.data.cart.products

        const initialSelectedProducts = newProduct.reduce((acc, product) => {
          return { ...acc, [product.productid._id]: false };
        }, {});

        setCart(newData);
        setProduct(newProduct);
        setSelectedProducts(initialSelectedProducts);

        updateSelectedProductsToServer(initialSelectedProducts);

        localStorage.setItem('Cart', JSON.stringify(newData));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateSelectedProductsToServer = async (selectedProducts) => {
    console.log(selectedProducts);
    try {
      for (const productid in selectedProducts) {
        const selected = selectedProducts[productid];
  
        const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
          productid,
          selected,
        });
  
        console.log(`Product ${productid} updated. Selected: ${selected}`, response.data);
      }
  
      console.log('All selected products sent to the server.');
    } catch (error) {
      console.error('Error updating selected products:', error);
    }
  };

  const updateCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/cart/getCart/${customerid}`);
      const newData = response.data.cart;
      const newProduct = response.data.cart.products;
  
      const initialSelectedProducts = newProduct.reduce((acc, product) => {
        return { ...acc, [product.productid._id]: false };
      }, {});
  
      setCart(newData);
      setProduct(newProduct);
      setSelectedProducts(initialSelectedProducts);
  
      updateSelectedProductsToServer(initialSelectedProducts);
  
      localStorage.setItem('Cart', JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    updateCartData();
  }, []);
  const handleIncreaseQuantity = async (productid) => {
    try {
      console.log(productid._id);
      const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
        productid: productid._id,
        action: "increase"
      });
      setCart(response)
      updateCartData();
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
      updateCartData();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleToggleSelect = (productid) => {
    const newSelectedValue = !selectedProducts[productid];
    const updatedSelectedProducts = { ...selectedProducts, [productid]: newSelectedValue };
    setSelectedProducts(updatedSelectedProducts);

    handleSelectProduct(productid, newSelectedValue);
  };

  const handleSelectProduct = async (productid, newSelectedValue) => {
    try {
      const response = await axios.put(`http://localhost:3001/v1/cart/updateCart/${customerid}`, {
        productid: productid,
        selected: newSelectedValue.toString()
      });

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
                  <div className='selectProduct'>
                  <label>
                    <input className='selectProduct-input' 
                      type="checkbox"
                      checked={selectedProducts[product.productid._id]}
                      onChange={() => handleToggleSelect(product.productid._id)}
                    />
                    Select
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
