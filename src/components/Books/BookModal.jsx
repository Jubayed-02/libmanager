import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { validateBookForm } from "../../utils/helpers";

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

function BookModal({ show, onHide, onSubmit, book }) {
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

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publishedYear: "",
        description: "",
        shelf: "",
        totalCopies: 1,
      });
    }
    setErrors({});
  }, [book, show]);

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
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className={`bi ${book ? "bi-pencil" : "bi-plus-circle"} me-2`}></i>
          {book ? "Edit Book" : "Add New Book"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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
                  isInvalid={!!errors.totalCopies}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.totalCopies}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the book"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {book ? "Update Book" : "Add Book"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default BookModal;
