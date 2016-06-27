var express = require('express'),
serveStatic = require('serve-static');
var PORT = process.env.PORT || 5000;

var app = express(),
serve = serveStatic('public/assets', {'index': ['index.html', 'index.htm']})

app.use(serve);
app.listen(PORT)
console.log("Listening on PORT ..%s",PORT);