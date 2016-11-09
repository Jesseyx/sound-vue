var express = require('express');
var app = express();

var port = 8081;

app.use(require('express-bunyan-logger')({
  name: 'sound-vue',
  format: function (obj) {
    console.log('[sound-vue] ' + obj.method + ' ' + obj.url);
    console.log('[sound-vue] Completed ' + obj['status-code'] + ' in ' + obj['response-time'] + 'ms');
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
  console.log('[sound-vue] listening on :' + port);
});
