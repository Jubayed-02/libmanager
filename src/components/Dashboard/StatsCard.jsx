import React from "react";
import { Card } from "react-bootstrap";

function StatsCard({ title, value, change, changeType, icon, bgColor }) {
  return (
    <Card className="border-0 shadow-sm h-100 stat-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted small mb-1">{title}</p>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
          <div
            className="stats-icon"
            style={{ backgroundColor: `${bgColor}20` }}
          >
            <i className={`bi ${icon} fs-4`} style={{ color: bgColor }}></i>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <i
            className={`bi bi-arrow-${changeType === "success" ? "up" : "down"} me-1`}
            style={{ color: changeType === "success" ? "#198754" : "#dc3545" }}
          ></i>
          <small
            className={
              changeType === "success" ? "text-success" : "text-danger"
            }
          >
            {change}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatsCard;
