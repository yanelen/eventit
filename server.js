var express     = require('express'),
    server      = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    PORT        = process.env.PORT || 4321,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname = "events";

mongoose.connect(MONGOURI + "/" + dbname);

var eventSchema  = new Schema({
  event_value: { type: String, required: true },
  created: { type: Date, default: Date.now }
});
var Event = mongoose.model('Event', eventSchema);

server.use(express.static('./public'));
server.use(bodyParser.json());
server.get('/events', function(request, response){
  Event.find({}, function(err, events){
    response.json(events);
  })
});

server.post('/events', function(request, response){
  Event.create(request.body, function(err, data){
    Event.find({}, function(err, events){
      response.json(events);
    });
  });
});

server.listen(PORT, function(){
  console.log("Server is listening");
});
