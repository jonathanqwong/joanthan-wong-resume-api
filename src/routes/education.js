const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');
// const { checkJwt }  = require('../../configuration/auth');

exports.educationController = {
  /* GET education listing. */
  getEducation: router.get('/education', async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('education')
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
