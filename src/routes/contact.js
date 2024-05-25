const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');

exports.contactController = {
    /* POST contact listing. */
    postContact: router.post('/contact', async (req, res) => {
        try {
            const { first_name, last_name, email } = req.body;
            const { data, error } = await supabase
                .from('contact')
                .insert([{ first_name, last_name, email }])
                .select();
            if (error) {
                throw error;
            }
            return res.status(201).json({ data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
}
