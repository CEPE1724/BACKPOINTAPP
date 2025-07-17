const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: [process.env.DOMAIN_PRUEBA, process.env.DOMAIN, 'http://localhost:3000'],
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log('Cliente conectado: ' + socket.id);
        socket.emit('message', 'Bienvenido al servidor de Socket.IO');

        socket.on('disconnect', () => {
            console.log('Cliente desconectado: ' + socket.id);
        });
    });
}

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io no se ha inicializado!');
    }
    return io;
}

module.exports = {
    init: initSocket,
    getIO,
};
