var supabasePackage= require('@supabase/supabase-js');

const {
    SUPABASE_URL,
    SUPABASE_KEY
} = require("../configuration/configs");

const supabaseConfig = supabasePackage.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

module.exports = supabaseConfig;
