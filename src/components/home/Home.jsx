import React from "react";
import chaBong from "../../img/chabongimg.jpg";
import chaBong1 from "../../img/chabong.jpg";
import { Link } from "react-router-dom";
// import chaBong1 from "../../img/chabong.jpg"
import "./home.css";
import Reactslider from "../slider/reactslider";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import { useParams } from "react-router";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="home-img">
          <img src={chaBong} alt="" />
        </div>
        <div className="store-quote">
          <h4> Người Bạn Thân Nhất</h4>
        </div>
        <div className="home-frame-1">
          <h1 className="home-h1">Câu Chuyện</h1>
          <div className="banner-container">
            <img src={chaBong1} alt="Banner" className="banner-image" />
            <div className="hover-story">
              <p>
                Có một con mèo tên là Chà Bông <br /> Đang tìm kiếm pate <br />{" "}
                Thích được cho ăn <br /> .... ghét phải trả tiền <br />
                Lẻn vào quán cà phê <br /> Đánh hơi các món ăn trưng bày <br />{" "}
                Nhìn thấy một đĩa pa tê <br /> "Thật là một ngày may mắn..."
              </p>
            </div>
            <Link to="/products">
              <button className="hover-button">SẢN PHẨM</button>
            </Link>
          </div>
        </div>
        <div className="home-frame-2">
          <h1 className="home-h1">Hàng Bán Chạy Nhất</h1>

          <div className="home-content">
            <Reactslider />
          </div>
        </div>
      </div>
    </>
  );
}
