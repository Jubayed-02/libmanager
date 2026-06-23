import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { getRandomGradient, validateBookForm } from "../utils/helpers";

const categories = [
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

function AddBookPage() {
  const { addBook } = useLibrary();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishedYear: "",
    description: "",
    shelf: "",
    totalCopies: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBookForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newBook = {
      ...formData,
      totalCopies: parseInt(formData.totalCopies),
      publishedYear: formData.publishedYear
        ? parseInt(formData.publishedYear)
        : null,
      coverGradient: getRandomGradient(),
    };
    addBook(newBook);
    navigate("/books");
  };

  const handleCancel = () => {
    navigate("/books");
  };

  return (
    <Container className="py-4">
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <div className="mb-4">
          <h1 className="fw-bold mb-1">Add New Book</h1>
          <p className="text-muted mb-0">
            Add a new book to your library collection
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                      placeholder="Enter book title"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Author *</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      isInvalid={!!errors.author}
                      placeholder="Enter author name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>ISBN *</Form.Label>
                    <Form.Control
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      isInvalid={!!errors.isbn}
                      placeholder="ISBN number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.isbn}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Published Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="publishedYear"
                      value={formData.publishedYear}
                      onChange={handleChange}
                      placeholder="Year"
                      min="1000"
                      max={new Date().getFullYear()}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Shelf Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="shelf"
                      value={formData.shelf}
                      onChange={handleChange}
                      placeholder="e.g., FIC-001"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Total Copies</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalCopies"
                      value={formData.totalCopies}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      isInvalid={!!errors.totalCopies}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalCopies}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Minimum 1 copy required
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the book"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="bg-light p-3 rounded mt-4 mb-4">
                <h6 className="fw-semibold mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Book Preview
                </h6>
                <Row>
                  <Col md={4}>
                    <div
                      className="rounded p-3 text-center text-white"
                      style={{
                        background: getRandomGradient(),
                        minHeight: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <i className="bi bi-book fs-1 d-block mb-2"></i>
                        {formData.title ? (
                          <small className="fw-bold">{formData.title}</small>
                        ) : (
                          <small className="opacity-75">Book Cover</small>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div>
                      <h6>{formData.title || "Book Title"}</h6>
                      <p className="text-muted mb-1">
                        <i className="bi bi-person me-2"></i>
                        {formData.author || "Author Name"}
                      </p>
                      {formData.isbn && (
                        <p className="text-muted mb-1 small">
                          <i className="bi bi-upc-scan me-2"></i>
                          ISBN: {formData.isbn}
                        </p>
                      )}
                      {formData.category && (
                        <span className="badge bg-primary me-2">
                          {formData.category}
                        </span>
                      )}
                      {formData.publishedYear && (
                        <span className="badge bg-secondary">
                          {formData.publishedYear}
                        </span>
                      )}
                      {formData.description && (
                        <p className="text-muted small mt-2">
                          {formData.description}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={handleCancel}
                  type="button"
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" size="lg">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Book to Library
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default AddBookPage;
