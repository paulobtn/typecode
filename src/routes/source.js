const express = require('express');
const SourceRepo = require('../repos/source-repo');

const router = express.Router();

router.get('/source', async (req, res) => {
  //get all the source codes
  const sources = await SourceRepo.find();
  
  if(sources){
    res.send(sources);
  } else{
    res.sendStatus(404);
  }

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
  const { language, project, uri, src } = req.body;

  const source = await SourceRepo.insert(language, project, uri, src);

  res.send(source);
});

router.put('/source/:id', async (req, res) => {
  const {id} = req.params;
  const {language, project, uri, src } = req.body;

  const source = await SourceRepo.update(id, language, project, uri, src);

  if(source){
    res.send(source);
  } else{
    res.sendStatus(404);
  }
});

router.delete('/source/:id', async (req, res) => {

  const { id } = req.params;

  const source = await SourceRepo.delete(id);

  if (source) {
    res.send(source);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
