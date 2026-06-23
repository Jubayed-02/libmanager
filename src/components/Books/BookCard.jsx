import React from "react";
import {
  Card,
  Badge,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  BsBook,
  BsPencil,
  BsTrash,
  BsBoxArrowUp,
  BsBoxArrowInDown,
} from "react-icons/bs";
import { getBookStatusColor } from "../../utils/helpers";

function BookCard({ book, onEdit, onDelete, onBorrow, onReturn, members }) {
  const statusColor = getBookStatusColor(book.status);

  return (
    <Card className="book-card border-0 shadow-sm h-100">
      <div
        className="book-cover rounded-top"
        style={{ background: book.coverGradient }}
      >
        <BsBook size={48} className="opacity-50 text-white" />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <h6 className="fw-semibold mb-1">{book.title}</h6>
          <p className="text-muted small mb-2">{book.author}</p>
          <Badge bg={`${statusColor}-subtle`} text={statusColor}>
            <span className={`status-dot bg-${statusColor}`}></span>
            {book.status}
          </Badge>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              <i className="bi bi-upc-scan me-1"></i>
              {book.isbn}
            </small>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <small className="text-muted">
              <i className="bi bi-geo-alt me-1"></i>
              {book.shelf}
            </small>
            <small className="text-muted">
              {book.availableCopies}/{book.totalCopies} available
            </small>
          </div>

          <ButtonGroup size="sm" className="w-100">
            {book.status === "Available" && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Borrow this book</Tooltip>}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => onBorrow(book)}
                >
                  <BsBoxArrowUp />
                </Button>
              </OverlayTrigger>
            )}
            {book.status === "Borrowed" && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Return this book</Tooltip>}
              >
                <Button
                  variant="outline-success"
                  onClick={() => onReturn(book)}
                >
                  <BsBoxArrowInDown />
                </Button>
              </OverlayTrigger>
            )}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Edit book</Tooltip>}
            >
              <Button variant="outline-secondary" onClick={() => onEdit(book)}>
                <BsPencil />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Delete book</Tooltip>}
            >
              <Button variant="outline-danger" onClick={() => onDelete(book)}>
                <BsTrash />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
