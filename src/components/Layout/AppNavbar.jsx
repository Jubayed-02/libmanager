import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Button,
} from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import {
  BsBook,
  BsBell,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsPalette,
} from "react-icons/bs";
import { useLibrary } from "../../context/LibraryContext";
import { useTheme } from "../../context/ThemeContext";
import { formatTimeAgo } from "../../utils/helpers";
import ThemeCustomizer from "../ThemeCustomizer";

function AppNavbar() {
  const location = useLocation();
  const {
    notifications,
    currentUser,
    markNotificationRead,
    clearNotifications,
  } = useLibrary();
  const { theme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "bi-check-circle text-success";
      case "warning":
        return "bi-exclamation-triangle text-warning";
      case "danger":
        return "bi-x-circle text-danger";
      default:
        return "bi-info-circle text-primary";
    }
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center"
          >
            <BsBook
              className="me-2"
              size={24}
              style={{ color: theme.accent }}
            />
            <span className="fw-bold fs-4">
              <span className="gradient-text">LibManager</span>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                end
                className={location.pathname === "/" ? "active" : ""}
              >
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/books"
                className={location.pathname === "/books" ? "active" : ""}
              >
                <i className="bi bi-book me-1"></i> Books
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/members"
                className={location.pathname === "/members" ? "active" : ""}
              >
                <i className="bi bi-people me-1"></i> Members
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/add-book"
                className={location.pathname === "/add-book" ? "active" : ""}
              >
                <i className="bi bi-plus-circle me-1"></i> Add Book
              </Nav.Link>
            </Nav>

            <Nav className="align-items-center">
              {/* Theme Customizer Button */}
              <Button
                variant="link"
                className="text-decoration-none p-2"
                onClick={() => setShowThemeCustomizer(true)}
                title="Customize Theme"
              >
                <BsPalette size={20} />
              </Button>

              {/* Notifications */}
              <Dropdown
                show={showNotifications}
                onToggle={setShowNotifications}
              >
                <Dropdown.Toggle
                  as={Button}
                  variant="link"
                  className="position-relative text-decoration-none p-2"
                >
                  <BsBell size={20} />
                  {unreadCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  className="shadow-sm border-0"
                  style={{
                    width: "350px",
                    maxHeight: "400px",
                    overflow: "auto",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                    <h6 className="mb-0 fw-bold">Notifications</h6>
                    {notifications.length > 0 && (
                      <Button
                        variant="link"
                        className="text-muted p-0 small"
                        onClick={clearNotifications}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-4 text-muted">
                      <i className="bi bi-bell-slash fs-3 d-block mb-2"></i>
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <Dropdown.Item
                        key={notification.id}
                        className={`px-3 py-2 ${!notification.read ? "bg-light" : ""}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="d-flex">
                          <i
                            className={`bi ${getNotificationIcon(notification.type)} me-2 mt-1`}
                          ></i>
                          <div>
                            <p className="mb-0 small">{notification.message}</p>
                            <small className="text-muted">
                              {formatTimeAgo(notification.timestamp)}
                            </small>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {/* User Profile */}
              <Dropdown>
                <Dropdown.Toggle
                  as="div"
                  className="member-avatar ms-2"
                  style={{
                    cursor: "pointer",
                    backgroundColor: theme.accent,
                  }}
                >
                  {currentUser.initials}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="shadow-sm border-0">
                  <Dropdown.Header>
                    <strong>{currentUser.name}</strong>
                    <br />
                    <small className="text-muted">{currentUser.role}</small>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <BsPerson className="me-2" /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowThemeCustomizer(true)}>
                    <BsPalette className="me-2" /> Customize Theme
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <BsGear className="me-2" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger">
                    <BsBoxArrowRight className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Theme Customizer Offcanvas */}
      <ThemeCustomizer
        show={showThemeCustomizer}
        onHide={() => setShowThemeCustomizer(false)}
      />
    </>
  );
}

export default AppNavbar;
