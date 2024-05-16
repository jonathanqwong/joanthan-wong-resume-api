var express = require('express');
var router = express.Router();

const supabase = require('../configuration/supabaseConfig');

/* GET skills listing. */
router.get('/skills', async(req, res) => {
  const {data, error} = await supabase
      .from('skills')
      .select()
  res.render(data);
});

module.exports = router;
