const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');

exports.certificationsController = {
  /* GET certification listing. */
  getCertifications: router.get('/certifications', async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('certifications')
          .select();
      if (error) {
        throw error;
      }
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
}
