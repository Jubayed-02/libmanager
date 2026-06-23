import React from "react";
import { Offcanvas, Button, Card, Badge } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import {
  BsPalette,
  BsArrowRepeat,
  BsCheck2,
  BsArrowCounterclockwise,
} from "react-icons/bs";

function ThemeCustomizer({ show, onHide }) {
  const {
    theme,
    updateSection,
    resetTheme,
    resetSection,
    colorPalettes,
    customizedSections,
  } = useTheme();

  const ColorPicker = ({ title, icon, section, colors }) => {
    const isCustomized = customizedSections.includes(section);

    return (
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">
            <i className={`bi ${icon} me-2`}></i>
            {title}
          </h6>
          {isCustomized && (
            <Button
              variant="link"
              size="sm"
              className="text-muted p-0"
              onClick={() => resetSection(section)}
              title="Reset to default"
            >
              <BsArrowCounterclockwise size={14} />
            </Button>
          )}
        </div>
        <div className="d-flex flex-wrap gap-2">
          {colors.map((color) => {
            const isActive =
              section === "navbar"
                ? theme.navbar.bg === color.value
                : section === "background"
                  ? theme.background === color.value
                  : section === "card"
                    ? theme.card.bg === color.value
                    : theme.accent === color.value;

            return (
              <button
                key={color.name}
                className="position-relative rounded-3 border-0 p-0"
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: color.value,
                  border: isActive
                    ? `3px solid ${theme.accent}`
                    : `1px solid ${theme.card.border}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  boxShadow: isActive ? `0 0 0 2px ${theme.accent}40` : "none",
                }}
                onClick={() =>
                  updateSection(section, color.value, color.textColor)
                }
                title={color.name}
              >
                {isActive && (
                  <BsCheck2
                    size={20}
                    style={{
                      color:
                        color.textColor ||
                        (isDarkColor(color.value) ? "#fff" : "#000"),
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <small className="text-muted mt-2 d-block">
          Current:{" "}
          <Badge bg={theme.mode === "dark" ? "dark" : "light"}>
            {getCurrentColorName(section, colors)}
          </Badge>
          {isCustomized && (
            <span className="ms-2 text-warning">● Customized</span>
          )}
        </small>
      </div>
    );
  };

  const getCurrentColorName = (section, colors) => {
    const currentValue =
      section === "navbar"
        ? theme.navbar.bg
        : section === "background"
          ? theme.background
          : section === "card"
            ? theme.card.bg
            : theme.accent;

    const found = colors.find((c) => c.value === currentValue);
    return found ? found.name : "Custom";
  };

  const isDarkColor = (hexColor) => {
    if (!hexColor) return false;
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const handleModeToggle = () => {
    const newMode = theme.mode === "light" ? "dark" : "light";
    updateSection("mode", newMode);
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={{
        width: "380px",
        backgroundColor: theme.card.bg,
        color: theme.card.text,
      }}
      className="theme-customizer"
    >
      <Offcanvas.Header
        closeButton
        className="border-bottom"
        style={{ borderBottomColor: `${theme.card.border} !important` }}
      >
        <Offcanvas.Title>
          <BsPalette className="me-2" style={{ color: theme.accent }} />
          Theme Customizer
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Mode Toggle */}
        <div
          className="mb-4 p-3 rounded-3"
          style={{
            backgroundColor:
              theme.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
            border: `1px solid ${theme.card.border}`,
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold mb-1">
                <i
                  className={`bi ${theme.mode === "dark" ? "bi-moon-stars" : "bi-sun"} me-2`}
                ></i>
                Display Mode
              </h6>
              <small className="text-muted">
                {theme.mode === "dark"
                  ? "Dark mode is active"
                  : "Light mode is active"}
              </small>
            </div>
            <Button
              variant={theme.mode === "dark" ? "light" : "dark"}
              size="sm"
              onClick={handleModeToggle}
              className="d-flex align-items-center"
              style={{
                backgroundColor: theme.mode === "dark" ? "#ffffff" : "#212529",
                color: theme.mode === "dark" ? "#000000" : "#ffffff",
                border: "none",
              }}
            >
              <i
                className={`bi ${theme.mode === "dark" ? "bi-sun" : "bi-moon"} me-2`}
              ></i>
              Switch to {theme.mode === "dark" ? "Light" : "Dark"}
            </Button>
          </div>
          <small className="text-muted">
            Toggling mode will reset non-customized sections to their defaults.
            <span className="text-warning"> ● </span>
            Customized sections will be preserved.
          </small>
        </div>

        <hr style={{ borderColor: theme.card.border }} />

        {/* Color Pickers */}
        <ColorPicker
          title="Navigation Bar"
          icon="bi-menu-button-wide"
          section="navbar"
          colors={colorPalettes.navbar}
        />

        <ColorPicker
          title="Background"
          icon="bi-image"
          section="background"
          colors={colorPalettes.background}
        />

        <ColorPicker
          title="Card & Container"
          icon="bi-card-text"
          section="card"
          colors={colorPalettes.card}
        />

        <ColorPicker
          title="Accent Color"
          icon="bi-paint-bucket"
          section="accent"
          colors={colorPalettes.accent}
        />

        {/* Preview */}
        <div className="mt-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-eye me-2"></i>
            Live Preview
          </h6>
          <div
            className="rounded-3 overflow-hidden"
            style={{
              border: `1px solid ${theme.card.border}`,
              boxShadow: theme.card.shadow,
            }}
          >
            <div
              className="p-3 d-flex align-items-center"
              style={{
                backgroundColor: theme.navbar.bg,
                color: theme.navbar.text,
              }}
            >
              <BsPalette className="me-2" />
              <span className="fw-semibold">Navigation Bar</span>
            </div>
            <div
              style={{ backgroundColor: theme.card.bg, color: theme.card.text }}
            >
              <div className="p-3">
                <h6 style={{ color: theme.card.text }}>Card Title</h6>
                <p className="small mb-2" style={{ color: theme.muted }}>
                  This shows how your cards and content will look with the
                  current settings.
                </p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: theme.accent,
                      color: "#ffffff",
                      border: "none",
                    }}
                  >
                    Accent Button
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "transparent",
                      color: theme.card.text,
                      border: `1px solid ${theme.card.border}`,
                    }}
                  >
                    Outline Button
                  </button>
                </div>
              </div>
              <div
                className="p-2 text-center small"
                style={{
                  backgroundColor: theme.background,
                  color: theme.muted,
                  borderTop: `1px solid ${theme.card.border}`,
                }}
              >
                Background Area
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4">
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={resetTheme}
            style={{
              borderColor: theme.card.border,
              color: theme.text,
            }}
          >
            <BsArrowRepeat className="me-2" />
            Reset All to {theme.mode === "dark" ? "Dark" : "Light"} Defaults
          </Button>
        </div>

        {/* Current Theme Summary */}
        <div
          className="mt-3 p-3 rounded-3 small"
          style={{
            backgroundColor:
              theme.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
          }}
        >
          <strong style={{ color: theme.text }}>Current Settings:</strong>
          <div className="mt-1" style={{ color: theme.muted }}>
            <div>
              • Navbar: {getCurrentColorName("navbar", colorPalettes.navbar)}
            </div>
            <div>
              • Background:{" "}
              {getCurrentColorName("background", colorPalettes.background)}
            </div>
            <div>
              • Cards: {getCurrentColorName("card", colorPalettes.card)}
            </div>
            <div>
              • Accent: {getCurrentColorName("accent", colorPalettes.accent)}
            </div>
            <div>• Mode: {theme.mode === "dark" ? "🌙 Dark" : "☀️ Light"}</div>
          </div>
          {customizedSections.length > 0 && (
            <div
              className="mt-2 pt-2 border-top"
              style={{ borderColor: theme.card.border }}
            >
              <span className="text-warning">
                ● Customized sections: {customizedSections.join(", ")}
              </span>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ThemeCustomizer;
