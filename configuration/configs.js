require('dotenv').config();

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
const AUDIENCE = process.env.AUTH0_AUDIENCE;
const ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;

module.exports = {
    SUPABASE_URL,
    SUPABASE_KEY,
    AUDIENCE,
    ISSUER_BASE_URL,
};
