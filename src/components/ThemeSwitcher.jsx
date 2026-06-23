import React, { useState } from "react";
import { Dropdown, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { BsPalette } from "react-icons/bs";

function ThemeSwitcher() {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [show, setShow] = useState(false);

  const themeColors = {
    light: { bg: "#ffffff", border: "#dee2e6" },
    dark: { bg: "#1a1d20", border: "#444c56" },
    blue: { bg: "#1e3a5f", border: "#b8d4fe" },
    green: { bg: "#1a3c2a", border: "#b7d7c5" },
    purple: { bg: "#2d1b69", border: "#c4b5fd" },
  };

  return (
    <Dropdown show={show} onToggle={setShow}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Change Theme</Tooltip>}
      >
        <Dropdown.Toggle
          as={Button}
          variant="link"
          className="text-decoration-none p-2"
        >
          <BsPalette size={20} />
        </Dropdown.Toggle>
      </OverlayTrigger>

      <Dropdown.Menu
        align="end"
        className="shadow-lg border-0 p-3"
        style={{ minWidth: "280px" }}
      >
        <div className="mb-3">
          <h6 className="fw-bold mb-0">
            <BsPalette className="me-2" />
            Choose Theme
          </h6>
          <small className="text-muted">
            Select your preferred color scheme
          </small>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {Object.entries(themes).map(([key, theme]) => (
            <OverlayTrigger
              key={key}
              placement="top"
              overlay={<Tooltip>{theme.name}</Tooltip>}
            >
              <button
                className={`theme-switcher-btn ${currentTheme === key ? "active" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${themeColors[key].bg}, ${themeColors[key].border})`,
                }}
                onClick={() => {
                  changeTheme(key);
                  setShow(false);
                }}
                title={theme.name}
              />
            </OverlayTrigger>
          ))}
        </div>

        <div className="border-top pt-3">
          <div className="d-flex flex-wrap gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`btn btn-sm ${currentTheme === key ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => {
                  changeTheme(key);
                  setShow(false);
                }}
              >
                <i className={`bi ${theme.icon} me-1`}></i>
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {currentTheme && (
          <div className="border-top mt-3 pt-3">
            <small className="text-muted">
              Current: <strong>{themes[currentTheme].name}</strong>
            </small>
            <div className="d-flex gap-2 mt-2">
              <div
                className="rounded p-2 flex-grow-1 text-center"
                style={{
                  backgroundColor: themes[currentTheme].navbar,
                  color: themes[currentTheme].text,
                  fontSize: "0.75rem",
                }}
              >
                Navbar
              </div>
              <div
                className="rounded p-2 flex-grow-1 text-center"
                style={{
                  backgroundColor: themes[currentTheme].card,
                  color: themes[currentTheme].text,
                  fontSize: "0.75rem",
                  border: `1px solid ${themes[currentTheme].border}`,
                }}
              >
                Card
              </div>
            </div>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSwitcher;
