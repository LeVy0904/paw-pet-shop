import React from "react";
import "./profile.css";
// import { useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router";
import theImg from "../../img/catlogin.jpg";

const Profile = () => {
  const storedCustomer = localStorage.getItem("user");
  const user = storedCustomer ? JSON.parse(storedCustomer) : null;

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const formattedDate = new Date(dateString).toLocaleDateString();
    return formattedDate;
  };

  return (
    <div className="profile-css">
      <section className="profile">
        <header className="header">
          <div className="details">
            <img src={theImg} alt="" className="profile-pic" />
            <h1 className="heading">{user.name || ""}</h1>
            <div className="location">
              <p>{user.admin ? "Admin" : "Thành Viên"}</p>
            </div>
            {/* <div className="stats">
                            <div className="col-4">
                                <h4>Phone number:</h4>
                                <p>{user.phone_number || ''}</p>
                            </div>
                            <div className="col-4">
                                <h4>Date of Birth:</h4>
                                <p>{user.dateofbirth || ''}</p>
                            </div>
                            <div className="col-4">
                                <h4>100</h4>
                                <p>Thảo Luận</p>
                            </div>
                        </div> */}
          </div>
        </header>
        <div className="proflie-content">
          <div>
            <h2>Tiểu Sử</h2>
            <p>
              Tôi một người mua mèo đam mê, bắt đầu hành trình của mình vào thế
              giới của những chú mèo từ khi còn là sinh viên đại học. Sinh ra và
              lớn lên trong một thành phố nhỏ, tôi luôn có niềm đam mê đặc biệt
              đối với thế giới động vật, đặc biệt là mèo. Tình yêu của tôi đối
              với mèo bắt đầu khi cô nhận nuôi một chú mèo nhỏ bị bỏ rơi trước
              cổng nhà. Từ đó, tôi bắt đầu khám phá thế giới đặc biệt của những
              chú mèo và dành thời gian nghiên cứu về việc chăm sóc, nuôi dưỡng,
              và tạo môi trường sống tốt nhất cho chúng.
            </p>
          </div>
          <div>
            <h2>Hồ Sơ</h2>
            <p>Date Of Birth: {formatDate(user.dateofbirth) || ""}</p>
            <p>Phone Number: {user.phone_number || ""}</p>
            <p>Participation At: {formatDate(user.create) || ""}</p>
            <p>Thời Gian Tham Gia: 11th 14, 2023</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
