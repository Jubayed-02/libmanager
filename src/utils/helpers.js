import { v4 as uuidv4 } from 'uuid';

export function generateId(prefix = '') {
  return `${prefix}_${uuidv4().slice(0, 8)}`;
}

export function getCurrentTimestamp() {
  return new Date().toISOString();
}

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return formatDate(dateString);
}

export function getBookStatusColor(status) {
  switch (status) {
    case 'Available':
      return 'success';
    case 'Borrowed':
      return 'danger';
    case 'Reserved':
      return 'warning';
    default:
      return 'secondary';
  }
}

export function getRandomGradient() {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function validateBookForm(data) {
  const errors = {};
  if (!data.title?.trim()) errors.title = 'Title is required';
  if (!data.author?.trim()) errors.author = 'Author is required';
  if (!data.isbn?.trim()) errors.isbn = 'ISBN is required';
  if (data.totalCopies < 1) errors.totalCopies = 'Must have at least 1 copy';
  return errors;
}

export function validateMemberForm(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  return errors;
}