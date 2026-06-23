import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MembersTable from "../components/Members/MembersTable";
import MemberModal from "../components/Members/MemberModal";
import DeleteMemberModal from "../components/Members/DeleteMemberModal";
import { useLibrary } from "../context/LibraryContext";

function MembersPage() {
  const { addMember, updateMember, deleteMember } = useLibrary();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleSubmitMember = (memberData) => {
    if (selectedMember) {
      updateMember(selectedMember.id, memberData);
    } else {
      addMember(memberData);
    }
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMember) {
      deleteMember(selectedMember.id);
      setShowDeleteModal(false);
      setSelectedMember(null);
    }
  };

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Library Members</h1>
        <p className="text-muted mb-0">
          Manage your library members and their borrowing records
        </p>
      </div>

      <MembersTable onEdit={handleEditMember} onDelete={handleDeleteMember} />

      <MemberModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedMember(null);
        }}
        onSubmit={handleSubmitMember}
        member={selectedMember}
      />

      <DeleteMemberModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedMember(null);
        }}
        onConfirm={handleConfirmDelete}
        member={selectedMember}
      />
    </Container>
  );
}

export default MembersPage;
