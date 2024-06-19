const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');
// const { checkJwt }  = require('../../configuration/auth');

exports.skillsController = {
  /* GET skills listing. */
  getSkills: router.get('/skills', async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('skills')
          .select()
          .order('skill', { ascending: true });
      if (error) {
        throw error;
      }
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
}
