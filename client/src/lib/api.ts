// API configuration
// In production, we use relative paths to route through Vercel's edge
export const API_BASE_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');

