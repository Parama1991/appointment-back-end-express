var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var slots = [];
var customers = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/retrieveSlots', function(req, res) {
  console.log("Called retrieveSlots");
  res.send(slots);
});

app.post('/api/appointmentCreate', function(req, res) {
  console.log("Called appointmentCreate");

  var req_body = req.body;

  var customer = {};
  customer.id = makeid(50);
  customer.first_name = req_body.first_name;
  customer.last_name = req_body.last_name;
  customer.email = req_body.email;
  customer.phone = req_body.phone;

  customers.push(customer);

  // Save request to slots/customers
  var slot = {};
  slot.customer_id = customer.id;
  slot.slot_date = req_body.slot_date;
  slot.slot_time = req_body.slot_time;

  slots.push(slot);
});

var port = process.env.PORT || 3010;
app.listen(port, function() {
  console.log('Appointment server listening on port ' + port);
})

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
