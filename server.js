// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const port = process.env.PORT || 8080;




app.get('/api/:dateString?', (req, res) => {
  const { dateString } = req.params;
  console.log(req.params);
  const timestamp = parseInt(dateString * 1, 10);
  const date = new Date(timestamp || dateString || Date.now());

  let result;
  if (isNaN(+date)) {
    result = { error: 'Invalid Date' };
  } else {
    result = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }
  res.json(result);
});



// listen for requests :)
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
