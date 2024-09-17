import React from "react";
import "./Sidebar.scss";
import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">
          <div className="sidebar-header">Active</div>
        </Nav.Link>
        <Nav.Link className="nav-link" as={NavLink} to="/">
          <div className="nav-icon">
            <div className="nav-icon_container">
              <i className="bi bi-house"></i>
              <span>Trang chủ</span>
            </div>
          </div>
        </Nav.Link>
        <Nav.Link eventKey="link-2" as={NavLink} to="/search">
          <div className="nav-icon">
            <div className="nav-icon_container">
              <i className="bi bi-search"></i>
              <span>Tìm kiếm</span>
            </div>
          </div>
        </Nav.Link>
        <Nav.Link eventKey="link-2" as={NavLink} to="/explore">
          <div className="nav-icon">
            <div className="nav-icon_container">
              <i className="bi bi-compass"></i>
              <span>Khám phá</span>
            </div>
          </div>
        </Nav.Link>
        <Nav.Link eventKey="link-2">
          <div className="nav-icon">
            <div className="nav-icon_container">
              <i className="bi bi-chat-heart"></i>
              <span>Tin nhắn</span>
            </div>
          </div>
        </Nav.Link>
        <Nav.Link eventKey="link-2">
          <div className="nav-icon">
            <div className="nav-icon_container">
              <i className="bi bi-bell"></i>
              <span>Thông báo</span>
            </div>
          </div>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
