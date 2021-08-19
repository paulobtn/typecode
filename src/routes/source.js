const express = require('express');
const SourceRepo = require('../repos/source-repo');

const router = express.Router();

router.get('/source', async (req, res) => {
  //get all the source codes
  const sources = await SourceRepo.find();

  res.send(sources);
});

router.get('/source/:id', async (req, res) => {
  //get a particular source
  const {id} = req.params;

  const source = await SourceRepo.findById(id);

  if(source){
    res.send(source);
  } else{
    res.sendStatus(404);
  }
});

router.post('/source', async (req, res) => {

});

router.put('/source/:id', async (req, res) => {

});

router.delete('/source/:id', async (req, res) => {

});

module.exports = router;
