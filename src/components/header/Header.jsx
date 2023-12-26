import React from "react";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./header.css";
import { BsCart3, BsPerson } from "react-icons/bs";
import logo from "../../img/logo.svg";
import { useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const storeduser = localStorage.getItem("user");
  const user = storeduser ? JSON.parse(storeduser) : null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiration");
    navigate("/");
  };

  const handleToProfile = () => {
    if (user && user.userid) {
      navigate(`/profile/${user.userid}`);
    } else {
      console.error("Thông tin khách hàng không khả dụng");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar
        // bg="dark"
        //variant={"dark"}
        expand="lg"
        className="custom-header"
        fixed="top"
        collapseOnSelect
      >
        <Container fluid className="custom-header2">
          <Navbar.Brand as={Link} to={"/"} id="my-brand">
            {<img src={logo} alt="" srcset="" />}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} className="mx-3 mt-3 " to={"/"}>
                TRANG CHỦ
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to={"/products"}
                className="custom-sub-nav mx-3 mt-3"
              >
                MUA HÀNG
              </Nav.Link> */}
              <NavDropdown
                title="MUA HÀNG"
                id="navbarScrollingDropdown"
                align={"end"}
                // to={"/products"}
                className="custom-sub-nav mt-3 mx-3"
              >
                <NavDropdown.Item
                  className="custom-dropdown-item"
                  as={Link}
                  to={"/products"}
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  TẤT CẢ SẢN PHẨM
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="custom-dropdown-item"
                  as={Link}
                  to={"/all-product"}
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  PHỤ KIỆN, ĐỒ ĂN
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="custom-dropdown-item"
                  as={Link}
                  to={"/pet"}
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  THÚ CƯNG
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="XEM THÊM"
                id="navbarScrollingDropdown"
                align={"end"}
                className="custom-sub-nav mt-3 mx-3"
              >
                <NavDropdown.Item
                  className="custom-dropdown-item"
                  as={Link}
                  to={"/about"}
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  THÔNG TIN
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="custom-dropdown-item"
                  as={Link}
                  to={"/contact"}
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  LIÊN HỆ
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item
                  className="custom-dropdown-item"
                  href="#action5"
                >
                  Something else here
                </NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link
                className="mx-1 mt-3"
                as={Link}
                to={`/cart/${user.userid}`}
              >
                <BsCart3 />
              </Nav.Link>
              <NavDropdown
                className="mx-1 mt-3"
                title={<BsPerson />} // Use UserAvatar as the dropdown title
                id="navbarScrollingDropdown"
                align={"end"}
              >
                {/* <NavDropdown.Item
                  as={Link}
                  to={`/profile/${user.userid}`}
                  className="custom-dropdown-item"
                  onClick={handleToProfile}
                >
                  Hồ sơ
                </NavDropdown.Item> */}
                <NavDropdown.Item
                  as={Link}
                  to={`/profile/${user.userid}`}
                  className="custom-dropdown-item"
                  onClick={user ? handleToProfile : null}
                >
                  {user ? user.name : "Đăng nhập"}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  // as={Link}
                  // to={"/login"}
                  onClick={handleLogOut}
                  className="custom-dropdown-item"
                >
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* <Image src="bag.png" roundedCircle /> */}
            {/* <Form className="d-flex">
                <Form.Control
                  id="custom-search"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="custom-search-btn" variant="outline-success">
                  Search
                </Button>
              </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
