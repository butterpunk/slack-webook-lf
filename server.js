
// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({ 
      timestamp: Number,
      text: String
    }),

    Todo = mongoose.model('Todo', Schema);


mongo=process.env.MONGODB_URI

mongoose.connect(mongo, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .post('/api/hook', function (req,res) {
      // var todo = new Todo();
      // todo.timestamp = req.body.timestamp;
      // todo.text = req.body.text;
      // console.log('we are in the post hook function');
      // todo.save(function (err) {
      //   if(err)
      //     res.send(err);

      //     res.json({"text": "Your message was archived on our alexa server."});
      // });
  })

  .get('/api/hook', function (req,res) {
      Todo.find(function(err, tods){
          console.log('in the get function');
          if (err)
            res.send(err);

          res.json(tods);
      })
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);
