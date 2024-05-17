const express = require('express');
const router = express.Router();
const supabase = require('../../configuration/supabaseConfig');

exports.educationController = {
  /* GET education listing. */
  getEducation: router.get('/education', async(req, res) => {
    try {
      const { data, error } = await supabase
          .from('education')
          .select()
          .order('id', { ascending: false });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error});
    }
  })
}