export function sanitizeInput(input: string): string {
    // Menghapus spasi tambahan di awal dan akhir
    let sanitized = input.trim();

    // Menghapus karakter berbahaya atau tidak diinginkan
    sanitized = sanitized.replace(/[<>]/g, "");

    return sanitized;
}
