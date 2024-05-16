require('dotenv').config();

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

module.exports = {
    SUPABASE_URL,
    SUPABASE_KEY
};
