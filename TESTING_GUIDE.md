# Library Management System - Testing Guide

## Features Implemented

### 1. **Student Registration & Login**
- Students can register with: Name, Roll Number, Department, Year
- Students can login using their Name and Roll Number
- Registration data is stored and validated (no duplicate roll numbers)

### 2. **Admin Login**
- Admin credentials: 
  - Username: `admin`
  - Password: `admin123`

### 3. **Admin Dashboard - 4 Tabs**

#### Tab 1: Overview
- View today's login statistics
- Department-wise login chart
- Recent pre-bookings from students
- Student feedbacks with ratings

#### Tab 2: Registered Candidates
- **NEW FEATURE**: Complete list of all registered students
- Shows: Name, Roll Number, Department, Year
- Updates in real-time as new students register

#### Tab 3: Manage Books
- Add new books with title, category, and content
- Upload book files (PDF/TXT)
- View all books with ratings
- Delete books

#### Tab 4: Book Views Tracking
- **NEW FEATURE**: Track which students view which books
- Shows: Student Name, Roll Number, Book Title, Timestamp
- Real-time updates when students open books

### 4. **Student Dashboard**
- Browse and search books
- Read books online with 3D flip effect
- Pre-book physical books
- Submit feedback and ratings
- Session timer tracking

## How to Test

### Step 1: Start the Application
```bash
# In the library directory
npm run start-all
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:5173

### Step 2: Test Student Registration
1. Open http://localhost:5173
2. Click "Student" tab
3. Click "Register here"
4. Fill in:
   - Name: John Doe
   - Department: Computer Science
   - Year: 1st Year
   - Roll Number: CS001
5. Click "Register Account"
6. You should see "Registration successful! Please login."

### Step 3: Test Student Login
1. Click "Login here"
2. Enter:
   - Name: John Doe
   - Roll Number: CS001
3. Click "Login to Dashboard"
4. You should see the student dashboard

### Step 4: Test Book Viewing (Tracking)
1. In the student dashboard, click "Read Online" on any book
2. This action is now tracked!
3. The book will open in a 3D flip reader

### Step 5: Test Admin Login
1. Logout from student account
2. Click "Admin" tab
3. Enter:
   - Username: admin
   - Password: admin123
4. Click "Admin Login"

### Step 6: Test Admin Features

#### View Registered Candidates
1. Click "👥 Registered Candidates" tab
2. You should see "John Doe" with roll number CS001
3. All registered students appear here

#### View Book Tracking
1. Click "👁️ Book Views Tracking" tab
2. You should see the book that John Doe viewed
3. Shows: Student name, roll number, book title, and exact time viewed

#### Manage Books
1. Click "📚 Manage Books" tab
2. Add a new book:
   - Title: "Test Book"
   - Category: "Testing"
   - Summary: "This is a test book"
3. Click "Add Full Book"
4. The book appears in the list

#### View Overview
1. Click "📊 Overview" tab
2. See login statistics
3. View pre-bookings and feedbacks

## Testing Checklist

- [ ] Student can register successfully
- [ ] Student can login with correct credentials
- [ ] Student cannot login with wrong credentials
- [ ] Student can view books
- [ ] Student can read books online
- [ ] Student can submit feedback
- [ ] Admin can login
- [ ] Admin can see all registered candidates
- [ ] Admin can track which books students view
- [ ] Admin can add new books
- [ ] Admin can delete books
- [ ] Admin can see login statistics
- [ ] Admin can see pre-bookings
- [ ] Admin can see feedbacks

## Common Issues & Solutions

### Issue: "Cannot connect to server"
**Solution**: Make sure the backend server is running on port 5000
```bash
node server.js
```

### Issue: "Page not loading"
**Solution**: Make sure Vite dev server is running on port 5173
```bash
npm run dev
```

### Issue: "Data not saving"
**Solution**: Check that data.json file has write permissions

### Issue: "Book views not tracking"
**Solution**: 
1. Check browser console for errors
2. Verify server is receiving the POST request to /api/track-view
3. Check data.json has bookViews array

## API Endpoints

### Student Endpoints
- POST `/api/register` - Register new student
- POST `/api/login/student` - Student login
- POST `/api/logout` - Student logout
- POST `/api/track-view` - Track book views (NEW)
- POST `/api/prebook` - Pre-book a book
- POST `/api/feedback` - Submit feedback

### Admin Endpoints
- POST `/api/login/admin` - Admin login
- GET `/api/admin/stats` - Get login statistics
- GET `/api/admin/users` - Get all registered users (NEW)
- GET `/api/admin/book-views` - Get book view tracking (NEW)
- GET `/api/admin/notifications` - Get pre-bookings
- GET `/api/admin/feedbacks` - Get feedbacks

### Book Endpoints
- GET `/api/books` - Get all books
- POST `/api/books` - Add new book
- DELETE `/api/books/:id` - Delete book

## Data Structure

### User Object
```json
{
  "name": "John Doe",
  "rollNo": "CS001",
  "department": "Computer Science",
  "year": "1st Year"
}
```

### Book View Object (NEW)
```json
{
  "studentName": "John Doe",
  "rollNo": "CS001",
  "bookTitle": "Quantum Physics for Beginners",
  "bookId": 1,
  "timestamp": "2026-01-30T08:58:06.123Z"
}
```

## Success Criteria

✅ All features working without errors
✅ Admin can see all registered candidates
✅ Admin can track book views in real-time
✅ Students can register and login
✅ Students can view books and tracking works
✅ Data persists in data.json file
