import React from "react";
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { BsSearch, BsFilter, BsGrid, BsList } from "react-icons/bs";

const categories = [
  "All Categories",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Technology",
  "History",
  "Biography",
  "Self-Help",
];

const statusFilters = ["All Status", "Available", "Borrowed", "Reserved"];

function BookFilters({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="bg-white p-3 rounded shadow-sm mb-4">
      <Row className="g-2 align-items-center">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button
            variant={viewMode === "grid" ? "primary" : "outline-primary"}
            size="sm"
            className="me-1"
            onClick={() => onViewModeChange("grid")}
          >
            <BsGrid />
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <BsList />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default BookFilters;
