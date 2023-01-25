//server.js
const express = require('express');
const path = require('path');
const port = 80;
const app = express();

app.use('/short-term/control-area-balance-monitor/ui', express.static(path.join(__dirname, 'build')));

app.get('/short-term/control-area-balance-monitor/ui/ping', function (req, res) {
  return res.send('pong');
});

app.get('/short-term/control-area-balance-monitor/ui/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/short-term/control-area-balance-monitor/ui', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);