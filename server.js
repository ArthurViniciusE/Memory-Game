const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static(__dirname+'/css'))
app.use(express.static(__dirname+'/javascript'))
app.use(express.static(__dirname+'/html'))
app.use(express.static(__dirname+'/font'))
app.use(express.static(__dirname+'/img'))

app.get('/', function(req, res){
	console.log("Execução no servidor.");
	fs.readFile('start.html', 'utf-8', function(err, data){
		console.log(data);
		
		res.send(data);
	});
});
app.listen(8000);