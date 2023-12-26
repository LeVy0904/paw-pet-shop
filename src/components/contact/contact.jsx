import React from "react";
import "../contact/contact.css";
import chabong from "../../img/chabongUs.jpg";

export default function Contact() {
  return (
    <div className="contact">
      <div className="sb_contact">
        {" "}
        {/* container */}
        <div className="sb_contact-link">
          {" "}
          {/* main */}
          <div className="sb_contact-link-div">
            {" "}
            {/* content */}
            <h2>Liên hệ chúng tôi</h2>
            <form action="#" method="post">
              <input type="text" name="name" placeholder="Họ và tên" />
              <input
                type="email"
                name="name"
                placeholder="Nhập Email của bạn"
                required
              />
              <textarea
                name="message"
                placeholder="Lời nhắn gửi của bạn"
                required
              ></textarea>
              <button type="submit" className="btn">
                Gửi <i className="fas fa-paper"></i>
              </button>
            </form>
          </div>
          <div className="contact-img">
            <img src={chabong} alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
  );
}
