const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = 'mongodb://'+ NOTES_APP_MONGODB_HOST + '/' + NOTES_APP_MONGODB_DATABASE;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology : true,
  useCreateIndex : true
})
  .then(db => console.log('Database in on rails!'))
  .catch(err => console.log(err));
