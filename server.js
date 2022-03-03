const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('static'))

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/data', (req, res) => {
    try {
        io.emit('chat message', req.query.message)
        res.status(200).end();
    } catch (e) {
        res.json({
            message: e,
            status_code: 500
        }).end();
    }
})
app.post('/api/data', (req, res) => {
    const data = req.body.data;
    if (typeof JSON.parse(data) == 'undefined') res.status(400).end();
    else {
        // try {
        io.emit('chat message', JSON.stringify(req.body.data))
        res.status(200).end();
        // } catch (e) {
        //     res.json({
        //         message: e,
        //         status_code: 500
        //     }).end();
        // }
    }
});

io.on('connection', (socket) => {
    console.log('A user connected!');
    // socket.broadcast.emit('hi')
    socket.on('Disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});