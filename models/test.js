var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/bookstore');
var db = connect.connection;
 
//接続エラー時にコールバック実行
db.on('error', console.error.bind(console, 'DB connection error:'));
 
//接続成功時にコールバック実行
db.once('open', function (callback) {
    console.log("DB connect successfully");
});

var Schema = mongoose.Schema;
 
var bookSchema = new Schema({
    _id:Number,
    title: String,
    price: Number,
    publishDate: Date,
    author: { type: Number, ref: 'Author' }
});
 
var authorSchema = new Schema({
    _id:Number,
    name: String,
    books : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});
 
var Book = mongoose.model('Book', bookSchema);
var Author = mongoose.model('Author', authorSchema);

var authorModel = new Author();
authorModel._id = 1;
authorModel.name = "taro";
authorModel.save(function(err){
   if(err) {
       console.error(err);
   } else {
       var bookModel = new Book();
       bookModel._id = 100;
       bookModel.title = "JavaScriptリファレンス";
       bookModel.price = 100;
       bookModel.publishDate = new Date();
       bookModel.author = authorModel._id;
       bookModel.save(function(err,book){
           if(err) {
               console.error(err);
           } else {
               console.log("bookModel saved:" + book);
           }
       });
   }
});
console.log('-----------------------');
Book.findOne({"title" : "JavaScriptリファレンス"})
  .populate("author").exec(function(err, book) {
    if(err) throw new Error(err);
    console.log(book);
});

Book.update({ title: 'JavaScriptリファレンス' }, { $set: {price: 200} },
            { upsert: false}, function(err) {
   if(err) {
     console.log(err);
   } else {
     console.log("update success.");
   }
});

Book.remove({ title: 'JavaScriptリファレンス' }, function(err) {
  if(err) {
     console.log(err);
  } else {
     console.log("delete success.");
  }
});

mongoose.disconnect();