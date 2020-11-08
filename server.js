const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/javascript'))
app.use(express.static(__dirname + '/html'))
app.use(express.static(__dirname + '/font'))
app.use(express.static(__dirname + '/img'))

const { Carta, Par, distribuirCartas } = require(__dirname + '/javascript/game.js')
var carta = new Carta()
var cartas = [
    ['robotcop.jpg', 'robotcop.jpg', 'link.png', 'link.png'],
    ['mega.png', 'mega.png', 'pac.png', 'pac.png'],
    ['sonic.png', 'sonic.png', 'scorpion.png', 'scorpion.png']
]

app.get('/', function(req, res) {
    console.log("Execução no servidor.");
    fs.readFile('html/index.html', 'utf-8', function(err, data) {
        res.send(data);
    });
});

app.get('/start', function(req, res) {
    console.log("Execução no servidor.");
    fs.readFile('html/start.html', 'utf-8', function(err, data) {
        var contador = 1;
        var div = ``

        for (let i = 0; i < cartas.length; i++) {
            for (let j = 0; j < cartas[i].length; j++) {
                div += `<div class="card"  onclick="marcaCarta(${contador})">
				<img class="front-card" id="carta${contador}" src="${cartas[i][j]}">
				</div>`
                contador++
            }
        }
        data = data.replace(/_CARTAS_/, div)
        res.send(data);
    });
});

app.get('/about', function(req, res) {
    console.log("Execução no servidor.");
    fs.readFile('html/about.html', 'utf-8', function(err, data) {
        res.send(data);
    });
});

app.get('/howtoplay', function(req, res) {
    console.log("Execução no servidor.");
    fs.readFile('html/howtoplay.html', 'utf-8', function(err, data) {
        res.send(data);
    });
});

app.listen(8000);