import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Book, Search, LogOut, ChevronLeft, ChevronRight, CheckCircle, Star } from 'lucide-react';

const StudentDashboard = ({ user, onLogout }) => {
    const [timer, setTimer] = useState(0);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [readingBook, setReadingBook] = useState(null);
    const [page, setPage] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get('http://localhost:5000/api/books');
            setBooks(res.data);
        };
        fetchBooks();

        const interval = setInterval(() => {
            setTimer(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePreBook = async (bookTitle) => {
        await axios.post('http://localhost:5000/api/prebook', { studentName: user.name, bookTitle });
        alert(`Pre-booked ${bookTitle}! Admin notified. Collect within 24hrs.`);
    };

    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

    const handleFeedbackSubmit = async () => {
        await axios.post('http://localhost:5000/api/feedback', {
            studentName: user.name,
            bookTitle: readingBook.title,
            message: feedbackMsg,
            rating: rating
        });
        alert('Thank you for your feedback and rating!');
        setReadingBook(null);
        setShowFeedback(false);
        setFeedbackMsg('');
        setRating(5);
    };

    if (showFeedback) {
        return (
            <div className="glass-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
                <h3 className="text-gradient">Book Review</h3>
                <p>How was your experience reading <strong>{readingBook.title}</strong>?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={32}
                            fill={star <= rating ? "#fbbf24" : "none"}
                            stroke={star <= rating ? "#fbbf24" : "#666"}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                <textarea
                    placeholder="Type your feedback here..."
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    style={{ width: '100%', height: '150px', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '12px', padding: '15px', border: '1px solid var(--glass-border)' }}
                />
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
                    <button onClick={() => { setShowFeedback(false); setReadingBook(null); }} style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>Skip</button>
                </div>
            </div>
        );
    }

    if (readingBook) {
        return (
            <div className="glass-card" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3>{readingBook.title}</h3>
                    <button onClick={() => setReadingBook(null)} style={{ width: 'auto' }}>Close Reader</button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '15px', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {readingBook.pages[page] || "End of book."}
                    {readingBook.fileName && (
                        <div style={{ marginTop: '30px', padding: '15px', border: '1px dashed var(--glass-border)', borderRadius: '10px' }}>
                            <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>This book has a full file uploaded:</p>
                            <a href={`http://localhost:5000/uploads/${readingBook.fileName}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                Open Full Book File
                            </a>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)} style={{ width: 'auto' }}><ChevronLeft /></button>
                    <span>Page {page + 1} of {readingBook.pages.length}</span>
                    {page === readingBook.pages.length - 1 ? (
                        <button onClick={() => setShowFeedback(true)} style={{ width: 'auto', background: 'var(--accent)' }}>Finish & Feedback</button>
                    ) : (
                        <button onClick={() => setPage(page + 1)} style={{ width: 'auto' }}><ChevronRight /></button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h2 className="text-gradient">Welcome, {user.name}!</h2>
                    <p>{user.department} - {user.rollNo}</p>
                </div>
                <div className="glass-card" style={{ padding: '10px 20px', width: 'auto', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={20} className="text-gradient" />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatTime(timer)}</span>
                </div>
                <button onClick={() => onLogout(timer)} style={{ width: 'auto' }}><LogOut size={20} /></button>
            </header>

            <div className="search-bar" style={{ marginBottom: '30px', position: 'relative' }}>
                <input
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ paddingLeft: '45px' }}
                />
                <Search style={{ position: 'absolute', left: '15px', top: '12px', color: '#666' }} size={20} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {filteredBooks.map(book => (
                    <div key={book.id} className="glass-card" style={{ margin: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Book size={40} style={{ marginBottom: '15px', color: 'var(--secondary)' }} />
                            <h4>{book.title}</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Category: {book.category}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {book.ratings && book.ratings.length > 0
                                        ? (book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length).toFixed(1)
                                        : "N/A"}
                                </span>
                                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>({book.ratings?.length || 0})</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button onClick={() => { setReadingBook(book); setPage(0); }} style={{ padding: '0.5rem' }}>Read Online</button>
                            <button onClick={() => handlePreBook(book.title)} style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>Pre-Book</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
