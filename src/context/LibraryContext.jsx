import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId, getCurrentTimestamp } from "../utils/helpers";

const LibraryContext = createContext();

const initialBooks = [
  {
    id: "book_001",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    publishedYear: 1925,
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    shelf: "FIC-001",
    totalCopies: 3,
    availableCopies: 2,
    status: "Available",
    coverGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    addedDate: "2024-01-15",
    borrowCount: 45,
  },
  {
    id: "book_002",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Fiction",
    publishedYear: 1949,
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    shelf: "FIC-012",
    totalCopies: 2,
    availableCopies: 0,
    status: "Borrowed",
    coverGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    addedDate: "2024-02-20",
    borrowCount: 38,
  },
  {
    id: "book_003",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    category: "Science Fiction",
    publishedYear: 1965,
    description:
      "Set in the distant future, the novel tells the story of young Paul Atreides.",
    shelf: "SCI-003",
    totalCopies: 4,
    availableCopies: 3,
    status: "Available",
    coverGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    addedDate: "2024-03-10",
    borrowCount: 32,
  },
];

const initialMembers = [
  {
    id: "mem_001",
    memberId: "MEM001",
    name: "Alice Johnson",
    email: "alice.j@email.com",
    phone: "+1 234-567-8901",
    address: "123 Main St, New York, NY",
    booksBorrowed: 2,
    joinDate: "2024-01-15",
    status: "Active",
    borrowedBooks: ["book_001", "book_006"],
  },
  {
    id: "mem_002",
    memberId: "MEM002",
    name: "Bob Smith",
    email: "bob.s@email.com",
    phone: "+1 234-567-8902",
    address: "456 Oak Ave, Los Angeles, CA",
    booksBorrowed: 1,
    joinDate: "2024-02-20",
    status: "Active",
    borrowedBooks: ["book_002"],
  },
  {
    id: "mem_003",
    memberId: "MEM003",
    name: "Carol White",
    email: "carol.w@email.com",
    phone: "+1 234-567-8903",
    address: "789 Pine Rd, Chicago, IL",
    booksBorrowed: 3,
    joinDate: "2024-03-10",
    status: "Inactive",
    borrowedBooks: ["book_004", "book_005", "book_008"],
  },
];

const initialActivities = [
  {
    id: "act_001",
    type: "borrow",
    member: "Alice Johnson",
    book: "The Great Gatsby",
    timestamp: "2024-06-24T10:30:00",
    description: 'borrowed "The Great Gatsby"',
  },
  {
    id: "act_002",
    type: "return",
    member: "Bob Smith",
    book: "1984",
    timestamp: "2024-06-24T09:15:00",
    description: 'returned "1984"',
  },
  {
    id: "act_003",
    type: "reserve",
    member: "Emma Davis",
    book: "Dune",
    timestamp: "2024-06-23T14:20:00",
    description: 'reserved "Dune"',
  },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLocalStorage("library_books", initialBooks);
  const [members, setMembers] = useLocalStorage(
    "library_members",
    initialMembers,
  );
  const [activities, setActivities] = useLocalStorage(
    "library_activities",
    initialActivities,
  );
  const [notifications, setNotifications] = useLocalStorage(
    "library_notifications",
    [],
  );
  const [currentUser] = useLocalStorage("library_current_user", {
    name: "John Doe",
    initials: "JD",
    role: "Administrator",
  });

  // Book Operations
  const addBook = useCallback(
    (bookData) => {
      const newBook = {
        ...bookData,
        id: generateId("book"),
        availableCopies: bookData.totalCopies,
        status: "Available",
        addedDate: getCurrentTimestamp(),
        borrowCount: 0,
      };
      setBooks((prev) => [...prev, newBook]);
      addActivity({
        type: "add",
        member: currentUser.name,
        book: bookData.title,
        description: `added "${bookData.title}" to the library`,
      });
      addNotification(
        `New book "${bookData.title}" added successfully!`,
        "success",
      );
      return newBook;
    },
    [currentUser.name],
  );

  const updateBook = useCallback((bookId, bookData) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, ...bookData } : book,
      ),
    );
    addNotification("Book updated successfully!", "success");
  }, []);

  const deleteBook = useCallback(
    (bookId) => {
      setBooks((prev) => {
        const book = prev.find((b) => b.id === bookId);
        if (book) {
          addActivity({
            type: "delete",
            member: currentUser.name,
            book: book.title,
            description: `removed "${book.title}" from the library`,
          });
          addNotification(
            `Book "${book.title}" removed successfully!`,
            "warning",
          );
        }
        return prev.filter((book) => book.id !== bookId);
      });
    },
    [currentUser.name],
  );

  const borrowBook = useCallback(
    (bookId, memberId) => {
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === bookId && book.availableCopies > 0) {
            const newAvailable = book.availableCopies - 1;
            return {
              ...book,
              availableCopies: newAvailable,
              status: newAvailable === 0 ? "Borrowed" : "Available",
              borrowCount: book.borrowCount + 1,
            };
          }
          return book;
        }),
      );

      setMembers((prev) =>
        prev.map((member) => {
          if (member.id === memberId) {
            return {
              ...member,
              booksBorrowed: member.booksBorrowed + 1,
              borrowedBooks: [...member.borrowedBooks, bookId],
            };
          }
          return member;
        }),
      );

      const book = books.find((b) => b.id === bookId);
      const member = members.find((m) => m.id === memberId);
      if (book && member) {
        addActivity({
          type: "borrow",
          member: member.name,
          book: book.title,
          description: `borrowed "${book.title}"`,
        });
        addNotification(`"${book.title}" borrowed by ${member.name}`, "info");
      }
    },
    [books, members],
  );

  const returnBook = useCallback(
    (bookId, memberId) => {
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === bookId) {
            const newAvailable = book.availableCopies + 1;
            return {
              ...book,
              availableCopies: newAvailable,
              status: "Available",
            };
          }
          return book;
        }),
      );

      setMembers((prev) =>
        prev.map((member) => {
          if (member.id === memberId) {
            return {
              ...member,
              booksBorrowed: Math.max(0, member.booksBorrowed - 1),
              borrowedBooks: member.borrowedBooks.filter((id) => id !== bookId),
            };
          }
          return member;
        }),
      );

      const book = books.find((b) => b.id === bookId);
      const member = members.find((m) => m.id === memberId);
      if (book && member) {
        addActivity({
          type: "return",
          member: member.name,
          book: book.title,
          description: `returned "${book.title}"`,
        });
        addNotification(
          `"${book.title}" returned by ${member.name}`,
          "success",
        );
      }
    },
    [books, members],
  );

  // Member Operations
  const addMember = useCallback(
    (memberData) => {
      const newMember = {
        ...memberData,
        id: generateId("mem"),
        memberId: `MEM${String(members.length + 1).padStart(3, "0")}`,
        booksBorrowed: 0,
        joinDate: getCurrentTimestamp(),
        status: "Active",
        borrowedBooks: [],
      };
      setMembers((prev) => [...prev, newMember]);
      addNotification(
        `New member "${memberData.name}" added successfully!`,
        "success",
      );
      return newMember;
    },
    [members.length],
  );

  const updateMember = useCallback((memberId, memberData) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, ...memberData } : member,
      ),
    );
    addNotification("Member updated successfully!", "success");
  }, []);

  const deleteMember = useCallback((memberId) => {
    setMembers((prev) => {
      const member = prev.find((m) => m.id === memberId);
      if (member) {
        addNotification(
          `Member "${member.name}" removed successfully!`,
          "warning",
        );
      }
      return prev.filter((member) => member.id !== memberId);
    });
  }, []);

  // Activity Operations
  const addActivity = useCallback((activityData) => {
    const newActivity = {
      ...activityData,
      id: generateId("act"),
      timestamp: getCurrentTimestamp(),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 50)); // Keep last 50 activities
  }, []);

  // Notification Operations
  const addNotification = useCallback((message, type = "info") => {
    const newNotification = {
      id: generateId("notif"),
      message,
      type,
      timestamp: getCurrentTimestamp(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== newNotification.id),
      );
    }, 5000);
  }, []);

  const markNotificationRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Statistics
  const getStats = useCallback(() => {
    return {
      totalBooks: books.length,
      borrowedBooks: books.filter((b) => b.status === "Borrowed").length,
      activeMembers: members.filter((m) => m.status === "Active").length,
      overdueReturns: books.filter((b) => b.availableCopies === 0).length,
      totalCopies: books.reduce((sum, book) => sum + book.totalCopies, 0),
      availableCopies: books.reduce(
        (sum, book) => sum + book.availableCopies,
        0,
      ),
    };
  }, [books, members]);

  const value = {
    books,
    members,
    activities,
    notifications,
    currentUser,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    addMember,
    updateMember,
    deleteMember,
    addActivity,
    addNotification,
    markNotificationRead,
    clearNotifications,
    getStats,
  };

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
