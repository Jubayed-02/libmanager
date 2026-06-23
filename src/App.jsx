import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/Layout/AppNavbar";
import AppFooter from "./components/Layout/AppFooter";
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import MembersPage from "./pages/MembersPage";
import AddBookPage from "./pages/AddBookPage";
import { ToastContainer, Toast } from "react-bootstrap";
import { useLibrary } from "./context/LibraryContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { notifications } = useLibrary();
  const { theme } = useTheme();

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <AppNavbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <AppFooter />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            bg={notification.type}
            className="fade-in"
          >
            <Toast.Body className="text-white">
              <i
                className={`bi ${
                  notification.type === "success"
                    ? "bi-check-circle"
                    : notification.type === "warning"
                      ? "bi-exclamation-triangle"
                      : notification.type === "danger"
                        ? "bi-x-circle"
                        : "bi-info-circle"
                } me-2`}
              ></i>
              {notification.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}

export default App;
