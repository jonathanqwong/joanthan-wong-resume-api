const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');
const checkJwt  = require('../../configuration/auth');

exports.experiencesController = {
  /* GET experiences listing. */
  getExperiences: router.get('/experiences', checkJwt, async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('experiences')
          .select()
          .order('id', { ascending: false });
      if (error) {
        throw error;
      }
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
}


