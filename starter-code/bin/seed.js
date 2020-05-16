const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbCelebrities = 'celebrities';
mongoose.connect(`mongodb://localhost/${dbCelebrities}`);

Celebrity.collection.drop();

const celebrities = [
  {
    name: 'Cuicui',
    occupation: 'codeuse',
    catchPhrase: 'J aime le saucission'
  },
  {
    name: 'Puri',
    occupation: 'chieuse',
    catchPhrase: 'J aime Michel'
  },
  {
    name: 'Kiara',
    occupation: 'ronfleuse',
    catchPhrase: 'J aime Cuicui'
  }
]

Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`)
  mongoose.connection.close();
});