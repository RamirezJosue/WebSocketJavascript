// Requires
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: "Hola soy mensaje",
    author: "Josue Ramirez"
}]


app.use(express.static('public'));




// // Rutas
app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizad correctamente'
    });
});

//Socket
io.on('connection', (socket) => {
    console.log('alguien se ha conectado con el socket');
    socket.emit('messages', messages);


    socket.on('new-message', (data) => {
        messages.push(data);
        // Emite todo los mensajes
        io.sockets.emit('messages', messages);
    });
});

// // Escuchar peticiones
server.listen(8080, () => {
    console.log('Express server puerto 8080: \x1b[32m%s\x1b[0m', 'online');
});




// app.get('/', function(req, res) {
//     res.status(200).send("Hola mundo");
// })

// io.on('connection', function(socket) {
//     console.log('Un cliente se ha conectado');
// });

// server.listen(8080, function() {
//     console.log('Servidor corriendo en http://localhost:8080');
// });