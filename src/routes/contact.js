const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabase = require('../../configuration/supabaseConfig');
const { checkJwt }  = require('../../configuration/auth');

const postContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, message } = req.body;
        const { data, error } = await supabase
            .from('contact')
            .insert([{ name, email, message }])
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
    postContact: router.post('/contact', checkJwt, [
            body('name').notEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Email is invalid'),
            body('message').notEmpty().withMessage('Message is required')

        ],
        postContact
    )
}
