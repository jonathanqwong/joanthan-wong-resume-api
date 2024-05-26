const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabase = require('../../configuration/supabaseConfig');

const postContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
};

exports.contactController = {
    /* POST contact listing. */
    postContact: router.post('/contact', [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').isEmail().withMessage('Email is invalid')
        ],
        postContact
    )
}
