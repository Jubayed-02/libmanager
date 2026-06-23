import React, { useState, useMemo } from "react";
import { Container, Row, Col, Pagination, Alert } from "react-bootstrap";
import BookCard from "../components/Books/BookCard";
import BookFilters from "../components/Books/BookFilters";
import BookModal from "../components/Books/BookModal";
import DeleteConfirmModal from "../components/Books/DeleteConfirmModal";
import { useLibrary } from "../context/LibraryContext";
import { getRandomGradient } from "../utils/helpers";

function BooksPage() {
  const {
    books,
    members,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
  } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowBookData, setBorrowBookData] = useState(null);
  const booksPerPage = 8;

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "All Categories" || book.category === category;
      const matchesStatus = status === "All Status" || book.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [books, searchTerm, category, status]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleSubmitBook = (bookData) => {
    if (selectedBook) {
      updateBook(selectedBook.id, bookData);
    } else {
      const newBook = {
        ...bookData,
        coverGradient: getRandomGradient(),
      };
      addBook(newBook);
    }
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook.id);
      setShowDeleteModal(false);
      setSelectedBook(null);
    }
  };

  const handleBorrow = (book) => {
    setBorrowBookData(book);
    setSelectedBook(book);
    // Find first active member for demo
    const activeMember = members.find((m) => m.status === "Active");
    if (activeMember) {
      borrowBook(book.id, activeMember.id);
    }
  };

  const handleReturn = (book) => {
    // Find member who has this book
    const member = members.find((m) => m.borrowedBooks.includes(book.id));
    if (member) {
      returnBook(book.id, member.id);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Library Books</h1>
          <p className="text-muted mb-0">
            {filteredBooks.length} book(s) found
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleAddBook}>
          <i className="bi bi-plus-circle me-2"></i> Add New Book
        </button>
      </div>

      <BookFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        category={category}
        onCategoryChange={(value) => {
          setCategory(value);
          setCurrentPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {currentBooks.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-book empty-state-icon"></i>
          <h5>No books found</h5>
          <p className="text-muted">Try adjusting your search or filters</p>
          <button className="btn btn-primary" onClick={handleAddBook}>
            Add Your First Book
          </button>
        </div>
      ) : (
        <>
          <Row className="g-4">
            {currentBooks.map((book) => (
              <Col key={book.id} xs={12} sm={6} lg={4} xl={3}>
                <BookCard
                  book={book}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                  onBorrow={handleBorrow}
                  onReturn={handleReturn}
                  members={members}
                />
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      <BookModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedBook(null);
        }}
        onSubmit={handleSubmitBook}
        book={selectedBook}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedBook(null);
        }}
        onConfirm={handleConfirmDelete}
        book={selectedBook}
      />
    </Container>
  );
}

export default BooksPage;
