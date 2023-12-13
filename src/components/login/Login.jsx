import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import theCat from "../../img/babycute.jpg";
import axios from 'axios'
import "./login.css";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      const response = await axios.post("http://localhost:3001/v1/customers/login", {
        email: email,
        password: password,
      });
      console.log("Login successful", response.data);
      const customerId = response.data.user._id;
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      navigate(`/home/${customerId}`);
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div className="login_contact">
      {/* <h1>Contact Us</h1> */}
      <div className="login_sb_contact">
        {" "}
        {/* container */}
        <div className="login_sb_contact-link">
          {" "}
          {/* main */}
          <div className="login_contact-img">
            <img src={theCat} alt="" srcset="" />
          </div>
          <div className="login_sb_contact-link-div">
            {" "}
            {/* content */}
            <h2> Đăng nhập </h2>
            <form action={handleLogin} method="post">
              <input
                type="text"
                name="name"
                placeholder="Nhập Email của bạn"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                name="cf_pass"
                placeholder="Mật khẩu" 
                onChange={(e) => setPassword(e.target.value)}/>
              <button onClick={handleLogin} type="submit" className="login_btn">
                {" "}
                Đăng nhập <i className="fas fa-paper"></i>
              </button>
              <p class="title_first">
                Bạn chưa có tài khoản? <a href="/signup" class="css_btn_1"> Đăng ký </a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
