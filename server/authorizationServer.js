var express = require('express');
var app = express();

var port = 8081;

app.use(require('express-bunyan-logger')({
  name: 'soundRedux',
  format: function (obj) {
    console.log('[soundredux] ' + obj.method + ' ' + obj.url);
    console.log('[soundredux] Completed ' + obj['status-code'] + ' in ' + obj['response-time'] + 'ms');
  },
  level: 'error',
  parseUA: false,
}));

app.use(express.static('./public'));

app.get('/api/status', function (req, res) {
  return res.json({ status: 'ok'} );
});

app.get('/api/callback', function (req, res) {
  res.sendFile('callback.html', {
    root: __dirname + '/html',
  });
});

app.listen(port, function () {
  console.log('[soundredux] listening on :' + port);
});
