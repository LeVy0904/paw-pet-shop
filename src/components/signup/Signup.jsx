import React from "react";
import theCat from "../../img/babycute.jpg";


export default function Signup() {
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
            <h2> Đăng ký </h2>
            <form action="#" method="post">
              <input
                type="email"
                name="name"
                placeholder="Nhập Email của bạn"
              />

              <input type="password" name="cf_pass" placeholder="Mật khẩu" />
              <input type="password" name="cf_pass" placeholder="Nhập lại mật khẩu" />
              <button type="submit" className="login_btn">
                {" "}
                Đăng ký <i className="fas fa-paper"></i>
              </button>
              <p class="title_first">
                Bạn đã có tài khoản? <a href="/login" class="css_btn_1"> Đăng nhập </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
