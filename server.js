import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Admin Login
app.post('/api/login/admin', (req, res) => {
    const { username, password } = req.body;
    // Simple verification
    if (username === 'admin' && password === 'admin123') {
        res.json({ 
            success: true, 
            message: 'Admin logged in', 
            user: { 
                username, 
                role: 'admin' 
            } 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials. Try username: "admin" and password: "admin123"' 
        });
    }
});

// Student Login
app.post('/api/login/student', (req, res) => {
    const { name, rollNo, department, year } = req.body;
    if (name && rollNo) {
        res.json({ 
            success: true, 
            message: 'Student logged in', 
            user: { 
                name, 
                rollNo, 
                department, 
                year, 
                role: 'student' 
            } 
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'Please provide Name and Roll Number' 
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
