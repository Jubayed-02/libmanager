import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useLibrary } from "../../context/LibraryContext";

function PopularBooks() {
  const { books } = useLibrary();
  const popularBooks = [...books]
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 5);

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-bottom py-3">
        <h5 className="mb-0 fw-semibold">
          <i className="bi bi-star me-2"></i>Popular Books
        </h5>
      </Card.Header>
      <Card.Body>
        {popularBooks.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-book fs-3 d-block mb-2"></i>
            No books available
          </div>
        ) : (
          popularBooks.map((book, index) => (
            <div key={book.id} className="d-flex align-items-center mb-3">
              <div
                className="me-3 d-flex align-items-center justify-content-center text-white fw-bold rounded"
                style={{
                  width: "45px",
                  height: "60px",
                  background: book.coverGradient,
                  fontSize: "1.1rem",
                }}
              >
                {index + 1}
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-medium">{book.title}</p>
                <p className="text-muted small mb-0">{book.author}</p>
                <Badge bg="light" text="dark" className="mt-1">
                  {book.borrowCount} borrows
                </Badge>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}

export default PopularBooks;
