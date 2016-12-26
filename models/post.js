var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  text: String
});

var Post = mongoose.model('Post', PostSchema);

mongoose.connect('mongodb://localhost/nest', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connection success!');
  }
});

Post.find({}, function(err, posts) {
  console.log(posts);
  if(!err) {
    console.log('no err');
    console.log(posts);
    mongoose.disconnect();
  } else {
    console.log('err');
  }
  
});