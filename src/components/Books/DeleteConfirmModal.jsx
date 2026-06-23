import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteConfirmModal({ show, onHide, onConfirm, book }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle text-warning me-2"></i>
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this book?</p>
        {book && (
          <div className="bg-light p-3 rounded">
            <p className="mb-1 fw-semibold">{book.title}</p>
            <p className="mb-0 small text-muted">by {book.author}</p>
            <p className="mb-0 small text-muted">ISBN: {book.isbn}</p>
          </div>
        )}
        <p className="mt-3 mb-0 text-danger small">
          <i className="bi bi-exclamation-circle me-1"></i>
          This action cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-1"></i> Delete Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
