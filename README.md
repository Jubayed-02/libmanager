# 📚 Library Management System

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

A full-featured Library Management System built with React, featuring real-time statistics, book/member management, borrowing tracking, and a customizable theme system with light/dark modes.

![Dashboard Screenshot](https://via.placeholder.com/800x400/0d6efd/ffffff?text=Library+Management+System+Dashboard)

## ✨ Features

### 📊 Dashboard
- Real-time statistics (total books, borrowed books, active members, overdue returns)
- Recent activity feed tracking all library operations
- Popular books ranking based on borrow count
- Quick action buttons for common tasks

### 📚 Book Management
- **CRUD Operations**: Add, edit, delete books with form validation
- **Advanced Search**: Search by title, author, or ISBN
- **Multi-filter System**: Filter by category and availability status
- **Grid/List Views**: Toggle between viewing modes
- **Borrowing System**: Issue and return books with tracking
- **Status Indicators**: Available, Borrowed, Reserved with color coding
- **Pagination**: Navigate through large book collections

### 👥 Member Management
- Add, edit, and remove library members
- Track borrowing history per member
- Search members by name, email, or member ID
- Active/Inactive status management
- Member profile with contact details

### 🎨 Theme Customization
- **Light/Dark Mode Toggle**: Switch between light and dark themes
- **Section-wise Customization**:
  - Navigation bar color (10+ options)
  - Background color (10+ options)
  - Card/Container color (10+ options)
  - Accent color (10+ options)
- **Smart Defaults**: Each mode has optimized default colors
- **Persistent Settings**: All preferences saved to localStorage
- **Live Preview**: See changes in real-time

### 💾 Data Management
- **Local Storage**: All data persists across browser sessions
- **Sample Data**: Pre-loaded with demo books, members, and activities
- **Activity Logging**: Complete history of all library operations
- **Toast Notifications**: User feedback for all actions

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/198754/ffffff?text=Dashboard+View)

### Books Management
![Books](https://via.placeholder.com/800x400/6f42c1/ffffff?text=Books+Management)

### Theme Customization
![Theme](https://via.placeholder.com/800x400/fd7e14/ffffff?text=Theme+Customizer)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400/1a1d23/e1e4e8?text=Dark+Mode)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | Frontend Framework |
| React Router DOM | 6.23 | Routing |
| React Bootstrap | 2.10 | UI Components |
| Bootstrap | 5.3 | CSS Framework |
| Bootstrap Icons | 1.11 | Icons |
| React Icons | 5.2 | Additional Icons |
| UUID | 9.0 | Unique ID Generation |
| Vite | 5.0 | Build Tool |

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/library-management-system.git
cd library-management-system
