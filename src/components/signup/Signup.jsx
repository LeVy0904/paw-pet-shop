import React, { useState } from "react";
import theCat from "../../img/babycute.jpg";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    dateofbirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu trước khi gửi yêu cầu
    if (formData.password !== formData.confirmPassword) {
      // Hiển thị thông báo lỗi cho người dùng
      document.getElementById("confirmPasswordError").innerText =
        "Mật khẩu và mật khẩu xác nhận không khớp";
      return;
    } else {
      document.getElementById("confirmPasswordError").innerText = "";
    }

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await axios.post(
        "http://localhost:3001/v1/customers/addCustomer",
        {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          admin: false,
        }
      );

      // Kiểm tra và xử lý kết quả từ API
      if (response.status === 201) {
        // Chuyển hướng người dùng đến trang chính
        window.location.href = "/";
      } else {
        // Hiển thị thông báo lỗi cho người dùng nếu đăng ký thất bại
        document.getElementById("confirmPasswordError").innerText =
          "Đăng ký thất bại!";
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra: ", error);
    }
  };

  return (
    <div className="login_contact">
      <div className="login_sb_contact">
        <div className="login_sb_contact-link">
          <div className="login_contact-img">
            <img src={theCat} alt="" srcset="" />
          </div>
          <div className="login_sb_contact-link-div">
            <h2> Đăng ký </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Nhập Email của bạn"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Nhập số điện thoại"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span id="confirmPasswordError" style={{ color: "red" }}></span>
              <button type="submit" className="login_btn">
                Đăng ký <i className="fas fa-paper"></i>
              </button>
              <p class="title_first">
                Bạn đã có tài khoản?
                <a href="/login" class="css_btn_1">
                  Đăng nhập
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
