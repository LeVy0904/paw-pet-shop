import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import theCat from "../../img/babycute.jpg";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/v1/customers/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;
      const user = response.data.user;

      const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 giờ
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenExpiration", expirationTime);

      navigate(`/home/${user.userid}`);
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div
      className="container1"
      style={{ marginBottom: "0px", marginTop: "-100px" }}
    >
      <div className="login_contact">
        <div className="login_sb_contact">
          <div className="login_sb_contact-link">
            <div className="login_contact-img">
              <img src={theCat} alt="" srcSet="" />
            </div>
            <div className="login_sb_contact-link-div">
              <h2> Đăng nhập </h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nhập Email của bạn"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="cf_pass"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="login_btn">
                  Đăng nhập <i className="fas fa-paper"></i>
                </button>
                <p className="title_first">
                  Bạn chưa có tài khoản?{" "}
                  <a href="/signup" className="css_btn_1">
                    {" "}
                    Đăng ký{" "}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
