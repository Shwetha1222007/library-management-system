const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// In-memory data store for the demo
let stats = {
  totalLogins: 0,
  deptWiseLogins: {
    "Computer Science": 0,
    "Information Technology": 0,
    "ECE": 0,
    "EEE": 0,
    "Mechanical": 0
  },
  studentUsage: [] // { name, startTime, duration, date }
};

let books = [
  { id: 1, title: 'Python Programming', category: 'python', pages: ['Page 1 content...', 'Page 2 content...', 'Last Page!'], ratings: [] },
  { id: 2, title: 'Java basics', category: 'java', pages: ['Java 1', 'Java 2'], ratings: [] },
  // ... more books will be added via seed or admin
];

let preBookings = [];
let feedbacks = [];

// Login Endpoints
app.post('/api/login/student', (req, res) => {
  const { name, department, rollNo, year } = req.body;
  stats.totalLogins++;
  stats.deptWiseLogins[department] = (stats.deptWiseLogins[department] || 0) + 1;

  const loginEntry = {
    name,
    department,
    rollNo,
    year,
    loginTime: new Date()
  };

  res.json({ success: true, user: loginEntry });
});

app.post('/api/login/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === '12345678' && password === 'sandhya') {
    res.json({ success: true, role: 'admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Notifications / Pre-booking
app.post('/api/prebook', (req, res) => {
  const { studentName, bookTitle } = req.body;
  const booking = { studentName, bookTitle, time: new Date(), status: 'pending' };
  preBookings.push(booking);
  res.json({ success: true, message: 'Notification sent to admin' });
});

app.get('/api/admin/notifications', (req, res) => {
  res.json(preBookings);
});

// Feedback Endpoints
app.post('/api/feedback', (req, res) => {
  const { studentName, bookTitle, message, rating } = req.body;
  feedbacks.push({ studentName, bookTitle, message, rating, date: new Date() });

  // Update book rating
  const book = books.find(b => b.title === bookTitle);
  if (book) {
    if (!book.ratings) book.ratings = [];
    book.ratings.push(Number(rating));
  }

  res.json({ success: true });
});

app.get('/api/admin/feedbacks', (req, res) => {
  res.json(feedbacks);
});

// Stats for Admin Dashboard
app.get('/api/admin/stats', (req, res) => {
  res.json(stats);
});

app.post('/api/logout', (req, res) => {
  const { name, duration } = req.body;
  stats.studentUsage.push({ name, duration, date: new Date().toLocaleDateString() });
  res.json({ success: true });
});

// Book Management
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', upload.single('bookFile'), (req, res) => {
  const { title, category, pages } = req.body;

  // If a file was uploaded, we might use it. 
  // For the "swap page" UI, we'll still use the pages provided or mock them from the file.
  const bookPages = pages ? pages.split('\n\n') : ["Content from uploaded file: " + (req.file ? req.file.originalname : "No file")];

  const newBook = {
    id: books.length + 1,
    title,
    category,
    pages: bookPages,
    fileName: req.file ? req.file.filename : null,
    ratings: []
  };

  books.push(newBook);
  res.json(newBook);
});

app.delete('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (book && book.fileName) {
    const filePath = path.join(__dirname, 'uploads', book.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  books = books.filter(b => b.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
