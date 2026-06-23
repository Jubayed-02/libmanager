import React from "react";
import { Modal, Button } from "react-bootstrap";
import { getInitials } from "../../utils/helpers";

function DeleteMemberModal({ show, onHide, onConfirm, member }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle text-warning me-2"></i>
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove this member?</p>
        {member && (
          <div className="bg-light p-3 rounded d-flex align-items-center">
            <div className="member-avatar bg-danger me-3">
              {getInitials(member.name)}
            </div>
            <div>
              <p className="mb-1 fw-semibold">{member.name}</p>
              <p className="mb-0 small text-muted">{member.email}</p>
              <p className="mb-0 small text-muted">ID: {member.memberId}</p>
            </div>
          </div>
        )}
        <p className="mt-3 mb-0 text-danger small">
          <i className="bi bi-exclamation-circle me-1"></i>
          This action cannot be undone. All borrowing records for this member
          will be lost.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-1"></i> Remove Member
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMemberModal;
