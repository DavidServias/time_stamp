
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// respond to request that includes date as a param query
app.get('/api/:date?', (req, res, next) => {
  let date = req.params.date;       // date sent from url
  let unix, utc;
  // CASE 1: date is sent as unix timestamp.
  // if date is not a valid date, try to parse it as a unix timestamp
  if (!Date.parse(date) ) {       
    // TODO: check if date is a valid unix timestamp
    // if not, return error
    try {
      let date_type_int = parseInt(date);
      unix = parseInt(date_type_int);
      utc = new Date(date_type_int).toUTCString();
      console.log("CASE 1 SUCCESS");
    }
    catch (err) {
      res.json({error: "Invalid Date"});
      return;
    };
  } else  {   
    // CASE 2: date is sent as a string
    // if date is a string, try to parse it as a date
    unix = new Date(date).getTime();
    utc = new Date(date).toUTCString();
    console.log("CASE 2 SUCCESS");
  }
  res.json({unix: unix, utc: utc});
  return;
});

// respond to request without a date
app.get('/api', (req, res, next) => {

  let date = new Date(date);
  let unix = date.getTime();
  let utc = date.toUTCString();
  res.json({unix: unix, utc: utc});
});

// listen for requests :)
// changed port to 8080 to avoid conflict with other projects
// TODO: change backt to process.env.PORT
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
