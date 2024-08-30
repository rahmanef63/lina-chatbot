import knowledgeBase from '../data/knowledge_base.json';
import fs from 'fs';
import path from 'path';

export function buildQuery(userQuery: string): string {
    // Muat prompt dasar
    const promptPath = path.join(process.cwd(), 'data', 'prompt.txt');
    const prompt = fs.readFileSync(promptPath, 'utf-8');

    // Gabungkan base knowledge, prompt, dan query pengguna
    const knowledge = JSON.stringify(knowledgeBase);
    const finalQuery = `${prompt}\n\nBase Knowledge:\n${knowledge}\n\nUser Query: ${userQuery}`;

    return finalQuery;
}
