var express = require('express');
var app = express();

// New call to compress content
//app.use(express.compress());

console.log(__dirname);
app.use(express.static(__dirname));

app.listen(8333);