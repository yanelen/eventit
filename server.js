var express     = require('express'),
    server      = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var noteSchema  = new Schema({
  note_value: { type: String, required: true },
  created: { type: Date, default: Date.now }
});
var Note = mongoose.model('Note', noteSchema);

server.use(express.static('./public'));
server.use(bodyParser.json());
server.get('/notes', function(request, response){
  Note.find({}, function(err, notes){
    response.json(notes);
  })
});

server.post('/notes', function(request, response){
  Note.create(request.body, function(err, data){
    Note.find({}, function(err, notes){
      response.json(notes);
    });
  });
});

mongoose.connect('mongodb://localhost:27017/notes');
server.listen(3000, function(){
  console.log("Server is listening");
});
