import React from "react";
import { Card } from "react-bootstrap";
import { useLibrary } from "../../context/LibraryContext";
import { formatTimeAgo } from "../../utils/helpers";

function RecentActivities() {
  const { activities } = useLibrary();
  const recentActivities = activities.slice(0, 5);

  const getActivityIcon = (type) => {
    switch (type) {
      case "borrow":
        return "bi-bookmark text-warning";
      case "return":
        return "bi-check-circle text-success";
      case "add":
        return "bi-plus-circle text-primary";
      case "delete":
        return "bi-x-circle text-danger";
      case "reserve":
        return "bi-clock text-info";
      default:
        return "bi-activity text-secondary";
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-bottom py-3">
        <h5 className="mb-0 fw-semibold">
          <i className="bi bi-activity me-2"></i>Recent Activities
        </h5>
      </Card.Header>
      <Card.Body>
        {recentActivities.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-inbox fs-3 d-block mb-2"></i>
            No recent activities
          </div>
        ) : (
          recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="activity-item d-flex align-items-center mb-2"
            >
              <i
                className={`bi ${getActivityIcon(activity.type)} me-3 fs-5`}
              ></i>
              <div className="flex-grow-1">
                <p className="mb-0 small">
                  <span className="fw-medium">{activity.member}</span>{" "}
                  {activity.description}
                </p>
                <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}

export default RecentActivities;
