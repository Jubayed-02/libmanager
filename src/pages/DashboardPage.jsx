import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StatsCard from "../components/Dashboard/StatsCard";
import RecentActivities from "../components/Dashboard/RecentActivities";
import PopularBooks from "../components/Dashboard/PopularBooks";
import { useLibrary } from "../context/LibraryContext";

function DashboardPage() {
  const { books, members, getStats } = useLibrary();
  const stats = getStats();

  const statsData = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      change: `${stats.totalCopies} total copies`,
      changeType: "success",
      icon: "bi-book",
      bgColor: "#0d6efd",
    },
    {
      title: "Borrowed Books",
      value: stats.borrowedBooks,
      change: `${stats.availableCopies} available`,
      changeType: "warning",
      icon: "bi-bookmark",
      bgColor: "#ffc107",
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      change: `${members.length} total members`,
      changeType: "success",
      icon: "bi-people",
      bgColor: "#198754",
    },
    {
      title: "Overdue Returns",
      value: stats.overdueReturns,
      change: "Action required",
      changeType: "danger",
      icon: "bi-exclamation-circle",
      bgColor: "#dc3545",
    },
  ];

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Library Dashboard</h1>
        <p className="text-muted mb-0">
          Welcome back! Here's your library overview.
        </p>
      </div>

      <Row className="g-4 mb-4">
        {statsData.map((stat, index) => (
          <Col key={index} xs={12} sm={6} xl={3}>
            <StatsCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        <Col md={8}>
          <div className="bg-white rounded shadow-sm p-4">
            <h5 className="fw-semibold mb-4">
              <i className="bi bi-lightning-charge me-2 text-warning"></i>
              Quick Actions
            </h5>
            <Row className="g-3">
              <Col sm={6} md={3}>
                <Link to="/add-book" className="text-decoration-none">
                  <div className="border rounded p-3 text-center quick-action-btn">
                    <i className="bi bi-plus-circle fs-2 text-primary d-block mb-2"></i>
                    <small className="text-dark fw-medium">Add Book</small>
                  </div>
                </Link>
              </Col>
              <Col sm={6} md={3}>
                <Link to="/books" className="text-decoration-none">
                  <div className="border rounded p-3 text-center quick-action-btn">
                    <i className="bi bi-search fs-2 text-success d-block mb-2"></i>
                    <small className="text-dark fw-medium">Browse Books</small>
                  </div>
                </Link>
              </Col>
              <Col sm={6} md={3}>
                <Link to="/members" className="text-decoration-none">
                  <div className="border rounded p-3 text-center quick-action-btn">
                    <i className="bi bi-person-plus fs-2 text-info d-block mb-2"></i>
                    <small className="text-dark fw-medium">Add Member</small>
                  </div>
                </Link>
              </Col>
              <Col sm={6} md={3}>
                <Link to="/members" className="text-decoration-none">
                  <div className="border rounded p-3 text-center quick-action-btn">
                    <i className="bi bi-people fs-2 text-warning d-block mb-2"></i>
                    <small className="text-dark fw-medium">View Members</small>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <PopularBooks />
        </Col>
      </Row>

      <RecentActivities />
    </Container>
  );
}

export default DashboardPage;
