/**
 *  Entry / Start Point of the Websocket Applicartion 
 *   + Setup
 *   + Create App
 *   + Run App
 *  
 * @version 1.0
 * @author Benjamin Thomas Schwertfeger
 * @email development@b-schwertfeger.de
 * @github https://github.com/ProjectPepperHSB/WebsocketServer
 * /

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * -----> I M P O R T S <----- ----- ----- */

const
    express = require('express'),
    http = require('http'),
    {
        Server
    } = require("socket.io");

const
    app = express(),
    server = http.createServer(app),
    io = new Server(server);

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * -----> S E T T I N G S <----- ----- ----- */

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('static'))

const
    PORT = process.env.PORT || 3000,
    undefined = 'undefined'

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * ----->  R O U T E S <----- ----- ----- */

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
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
    const body = req.body;
    const data = body.data;

    if (typeof data === undefined) res.status(400).end();
    else {
        // if(typeof JSON.parse(data) === undefined
        // try{
        console.log(data)
        io.emit('chat message', JSON.stringify(data))
        res.status(200).end();
        // } catch (e) {
        //     res.json({
        //         message: e,
        //         status_code: 500
        //     }).end();
        // }
    }
});

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * -----> W E B S O C K E T - E V E N T - H A N D L E R <----- ----- ----- */

io.on('connection', (socket) => {
    console.log('A user connected!');

    socket.on('Disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
    });
});

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * -----> RUN APP <----- ----- ----- */

server.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});

/* * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * * 
 * * * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- * * * 
 * * * -----> E O F <----- ----- ----- */