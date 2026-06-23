import React, { useState } from "react";
import {
  Table,
  Badge,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  BsSearch,
  BsPencil,
  BsTrash,
  BsPersonPlus,
  BsBook,
} from "react-icons/bs";
import { useLibrary } from "../../context/LibraryContext";
import { formatDate, getInitials } from "../../utils/helpers";

function MembersTable({ onEdit, onDelete }) {
  const { members, books } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getBorrowedBookTitles = (borrowedBooks) => {
    return borrowedBooks
      .map((bookId) => books.find((b) => b.id === bookId))
      .filter(Boolean)
      .map((b) => b.title)
      .join(", ");
  };

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <Row className="mb-4 align-items-center">
        <Col md={4} className="mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={5} className="text-md-end">
          <span className="text-muted me-3">
            {filteredMembers.length} member(s) found
          </span>
          <Button variant="primary" onClick={() => onEdit(null)}>
            <BsPersonPlus className="me-2" /> Add Member
          </Button>
        </Col>
      </Row>

      <Table hover responsive>
        <thead className="table-light">
          <tr>
            <th>Member</th>
            <th>Member ID</th>
            <th>Books Borrowed</th>
            <th>Join Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-muted">
                <i className="bi bi-people fs-3 d-block mb-2"></i>
                No members found
              </td>
            </tr>
          ) : (
            filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="member-avatar bg-primary me-3">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="fw-medium">{member.name}</div>
                      <small className="text-muted">{member.email}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg="light" text="dark">
                    {member.memberId}
                  </Badge>
                </td>
                <td>
                  <div>
                    <span className="fw-medium">{member.booksBorrowed}</span>
                    {member.borrowedBooks.length > 0 && (
                      <small className="text-muted d-block">
                        <BsBook className="me-1" />
                        {getBorrowedBookTitles(member.borrowedBooks)}
                      </small>
                    )}
                  </div>
                </td>
                <td className="text-muted">{formatDate(member.joinDate)}</td>
                <td>
                  <Badge
                    bg={
                      member.status === "Active"
                        ? "success-subtle"
                        : "secondary-subtle"
                    }
                    text={member.status === "Active" ? "success" : "secondary"}
                  >
                    {member.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="link"
                    className="text-primary p-0 me-3"
                    onClick={() => onEdit(member)}
                    title="Edit member"
                  >
                    <BsPencil />
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => onDelete(member)}
                    title="Delete member"
                  >
                    <BsTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MembersTable;
