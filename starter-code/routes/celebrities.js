const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/celebrity')
 
// POST /celebrities/edit/{{_id}}
router.post('/edit/:_id', (req, res, next) => {
  const { _id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.updateOne( {_id} , { $set:{name, occupation, catchPhrase} })
    .then( updatedCelebrity => {
      console.log('updatedCelebrity', updatedCelebrity);
      res.redirect('/celebrities')
    })
    .catch(err => console.log(`Error editing celebrity:${err}`))
})

// GET /celebrities/edit/{{_id}}
router.get('/edit/:_id', (req,res,next) => {
  const { _id } = req.params;
  // console.log('req.params', req.params)

  Celebrity.findById( {_id} )
    .then( celebrity => {
      console.log('celebrity', celebrity);
      res.render('celebrity-edit-form', {celebrity});
    })
    .catch(err => console.log(`Error showing edit form: ${err}`))
  
})

// GET /celebrities/delete/{{_id}}
router.get('/delete/:_id', (req, res, next) => {
  const { _id } = req.params;
  Celebrity.findOneAndRemove( {_id} )
    .then( data => {
      // console.log('data', data);
      res.redirect('/celebrities')
    })
    .catch(err => console.log(`Error deleting celebrity:${err}`))
})


// POST /celebrities/add
router.post('/add', (req, res,next) => {
  const { name, occupation, catchPhrase } = req.body;
  // console.log('req.params', req.params)
  
  const newCelebrity = new Celebrity(
    {
      name : name,
      occupation : occupation,
      catchPhrase : catchPhrase
    }
  )

  newCelebrity.save()
    .then( celebrity => {
      // console.log('celebrity', celebrity);
      res.redirect('/celebrities')
    })
    .catch(err => console.log(`Add celebrity error: ${err}`))
})

// GET /celebrities/add
router.get('/add', (req,res,next) => {
  res.render('celebrity-add-form')
})

// GET /celebrities/:_id
router.get('/:_id', (req, res, next) => {
  const { _id } = req.params;
  Celebrity.findById( {_id} )
    .then( celebrity => {
      // console.log('celebrity', celebrity);
      res.render('celebrity-details', {celebrity})
    })
    .catch(err => console.log(`Celebrity detail request error: ${err}`))
})

// GET /celebrities/
router.get('/', (req,res,next) => {
  Celebrity.find()
    .then( celebrities => {
      // console.log('celebrities', celebrities)
      res.render('celebrities', {celebrities})
    })
    .catch(err => console.log(`Celebrities request error: ${err}`))
})


module.exports = router