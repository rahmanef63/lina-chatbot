import session from 'express-session';

app.use(session({
    secret: 'your-secret-key', // Gantilah dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Atur secure ke true jika menggunakan HTTPS
}));
