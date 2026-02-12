import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function list() {
    const apiKey = process.env.GEMINI_API_KEY;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        fs.writeFileSync('models_raw.json', JSON.stringify(data, null, 2));
        console.log('SAVED_TO_JSON');
    } catch (err: any) {
        console.error('FETCH_ERROR:', err.message);
    }
}

list();
