const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');
const checkJwt  = require('../../configuration/auth');

exports.certificationsController = {
  /* GET certification listing. */
  getCertifications: router.get('/certifications', checkJwt, async(req, res) => {
    try {
      const { userId } = req;
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
