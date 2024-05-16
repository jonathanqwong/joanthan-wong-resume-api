var express = require('express');
var router = express.Router();

const supabase = require('../configuration/supabaseConfig');

/* GET skills listing. */
router.get('/', async(req, res) => {
  try {
    const { data, error } = await supabase
        .from('certifications')
        .select();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error});
  }
});

module.exports = router;
