export function detectIntent(query: string, session: any): string {
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery.includes('harga') || lowerCaseQuery.includes('biaya')) {
        return 'price_check';
    }
    if (lowerCaseQuery.includes('produk') || lowerCaseQuery.includes('layanan')) {
        return 'product_info';
    }
    if (lowerCaseQuery.includes('keluhan') || lowerCaseQuery.includes('complaint')) {
        return 'complaint';
    }
    if (lowerCaseQuery.includes('halo') || lowerCaseQuery.includes('hi') || lowerCaseQuery.includes('hello')) {
        return 'greeting';
    }
    if (lowerCaseQuery.includes('sebelumnya') || lowerCaseQuery.includes('yang tadi')) {
        return 'previous_query';
    }

    return 'unknown';
}
