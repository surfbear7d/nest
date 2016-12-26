var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected!');
  mongoose.disconnect();
});

var kittySchema = mongoose.Schema({
    text: String
});

var Kitten = mongoose.model('Post', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name);