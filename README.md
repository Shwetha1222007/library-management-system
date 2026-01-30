# Smart Digital Library Management System

A modern, full-stack library management system with student registration, book management, and comprehensive admin tracking features.

## 🎯 Features

### For Students (Candidates)
- ✅ **Registration System**: Register with name, roll number, department, and year
- ✅ **Secure Login**: Login using name and roll number
- ✅ **Book Browsing**: Search and browse available books
- ✅ **3D Book Reader**: Read books online with realistic flip animation
- ✅ **Pre-booking**: Reserve physical books for collection
- ✅ **Feedback System**: Rate and review books
- ✅ **Session Tracking**: Automatic time tracking during library sessions

### For Admin
- ✅ **Secure Admin Login**: Username/password authentication
- ✅ **Dashboard Overview**: 
  - Login statistics with charts
  - Department-wise login tracking
  - Recent pre-bookings
  - Student feedbacks
- ✅ **Registered Candidates View**: 
  - Complete list of all registered students
  - View name, roll number, department, and year
- ✅ **Book Management**:
  - Add new books with categories
  - Upload book files (PDF/TXT)
  - View book ratings
  - Delete books
- ✅ **Book Views Tracking**: 
  - Real-time tracking of which students view which books
  - Timestamp for each view
  - Complete audit trail

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd "d:\New folder\Desktop\myproject\library"
```

2. Install dependencies (if not already installed):
```bash
npm install
```

### Running the Application

**Option 1: Run both server and client together**
```bash
npm run start-all
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure

```
library/
├── server.js                 # Express backend server
├── data.json                 # Data storage
├── package.json             # Dependencies
├── src/
│   ├── App.jsx              # Main application component
│   ├── Login.jsx            # Login/Registration component
│   ├── StudentDashboard.jsx # Student interface
│   ├── AdminDashboard.jsx   # Admin interface with tabs
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── public/
│   └── uploads/             # Uploaded book files
└── TESTING_GUIDE.md         # Comprehensive testing guide
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login/admin` - Admin login
- `POST /api/login/student` - Student login
- `POST /api/register` - Student registration
- `POST /api/logout` - Student logout

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book (with file upload)
- `DELETE /api/books/:id` - Delete book

### Student Actions
- `POST /api/prebook` - Pre-book a physical book
- `POST /api/feedback` - Submit book feedback
- `POST /api/track-view` - Track book views (automatic)

### Admin Data
- `GET /api/admin/stats` - Login statistics
- `GET /api/admin/users` - All registered candidates
- `GET /api/admin/book-views` - Book view tracking data
- `GET /api/admin/notifications` - Pre-booking notifications
- `GET /api/admin/feedbacks` - Student feedbacks

## 💾 Data Storage

All data is stored in `data.json` with the following structure:

```json
{
  "users": [],           // Registered students
  "books": [],           // Book catalog
  "logs": [],            // Login logs
  "notifications": [],   // Pre-booking requests
  "feedbacks": [],       // Student reviews
  "bookViews": []        // Book view tracking (NEW)
}
```

## 🎨 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React PageFlip** - 3D book reader
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Backend
- **Express.js** - Web framework
- **Multer** - File upload handling
- **fs-extra** - File system operations
- **CORS** - Cross-origin resource sharing

## 📊 Admin Dashboard Tabs

### 1. Overview Tab
- Login statistics chart
- Total logins today
- Department-wise breakdown
- Recent pre-bookings
- Student feedbacks with ratings

### 2. Registered Candidates Tab
- Table view of all registered students
- Columns: Name, Roll Number, Department, Year
- Real-time updates

### 3. Manage Books Tab
- Add new books form
- Book list with ratings
- Delete functionality
- File upload support

### 4. Book Views Tracking Tab
- Real-time tracking table
- Columns: Student Name, Roll Number, Book Title, Timestamp
- Audit trail for library usage

## 🧪 Testing

See `TESTING_GUIDE.md` for comprehensive testing instructions.

Quick test:
1. Register a student
2. Login as student
3. View a book (this gets tracked)
4. Logout
5. Login as admin
6. Check "Registered Candidates" tab - see the student
7. Check "Book Views Tracking" tab - see the book view

## 🐛 Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Verify `data.json` exists and is valid JSON

### Frontend won't start
- Check if port 5173 is already in use
- Clear node_modules and reinstall: `npm install`

### Data not persisting
- Check file permissions on `data.json`
- Verify server has write access to the directory

### Book views not tracking
- Check browser console for errors
- Verify `/api/track-view` endpoint is working
- Check `data.json` has `bookViews` array

## 📝 Recent Updates

### Version 2.0 (Current)
- ✨ Added "Registered Candidates" view for admin
- ✨ Added "Book Views Tracking" feature
- ✨ Implemented tabbed interface in admin dashboard
- ✨ Automatic tracking when students view books
- 🔧 Enhanced admin monitoring capabilities
- 🔧 Improved data organization

### Version 1.0
- Initial release with basic features
- Student registration and login
- Book management
- 3D book reader
- Feedback system

## 🤝 Contributing

This is a project for educational purposes. Feel free to extend and modify as needed.

## 📄 License

This project is for educational use.

## 👥 Support

For issues or questions, refer to the `TESTING_GUIDE.md` file.

---

**Built with ❤️ for Smart Digital Library Management**
