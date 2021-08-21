const express = require('express');
const SourceRepo = require('../repos/source-repo');

const router = express.Router();

router.get('/api/source', async (req, res) => {
  //get all the source codes
  const sources = await SourceRepo.find();
  
  if(sources){
    res.send(sources);
  } else{
    res.sendStatus(404);
  }

});

router.get('/api/source/random', async (req, res) => {
  
  //how many entries in the tablle "source"
  const totalSrc = await SourceRepo.count();

  //get a random id from source
  const id = Math.floor((Math.random()*totalSrc)+1);

  //find the value

  const source = await SourceRepo.findById(id);

  if(source){
    res.send(source);
  } else{
    res.sendStatus(404);
  }
});

router.get('/api/source/:id', async (req, res) => {
  //get a particular source
  const {id} = req.params;

  const source = await SourceRepo.findById(id);

  if(source){
    res.send(source);
  } else{
    res.sendStatus(404);
  }
});

router.post('/api/source', async (req, res) => {
  const { language, project, uri, src } = req.body;

  const source = await SourceRepo.insert(language, project, uri, src);

  res.status(201).send(source);
});

router.put('/api/source/:id', async (req, res) => {
  const {id} = req.params;
  const {language, project, uri, src } = req.body;

  const source = await SourceRepo.update(id, language, project, uri, src);

  if(source){
    res.send(source);
  } else{
    res.sendStatus(404);
  }
});

router.delete('/api/source/:id', async (req, res) => {

  const { id } = req.params;

  const source = await SourceRepo.delete(id);

  if (source) {
    res.send(source);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
