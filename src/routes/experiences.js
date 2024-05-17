const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');

exports.experiencesController = {
  /* GET experiences listing. */
  getExperiences: router.get('/experiences', async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('experiences')
          .select()
          .order('id', { ascending: false });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error});
    }
  })
}


