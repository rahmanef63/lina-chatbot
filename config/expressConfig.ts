import express from 'express';

export function setupExpressApp(app: express.Application) {
    // Setup middleware, routes, dll.
    app.use(express.json());
    // Tambahkan middleware atau konfigurasi lainnya di sini
}
