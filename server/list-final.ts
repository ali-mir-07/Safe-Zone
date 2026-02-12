import dotenv from 'dotenv';
dotenv.config();

async function list() {
    const apiKey = process.env.GEMINI_API_KEY;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        if (data.models) {
            console.log('FULL_MODELS_LIST_START');
            data.models.forEach((m: any) => console.log(m.name));
            console.log('FULL_MODELS_LIST_END');
        } else {
            console.log('ERROR_RESPONSE:', JSON.stringify(data, null, 2));
        }
    } catch (err: any) {
        console.error('FETCH_ERROR:', err.message);
    }
}

list();
