let socketInstance;

function socket(req, res) {
    const io = require('socket.io-client').io;
    const socket = io("http://localhost:9000");
    
    // Armazenar a instância do socket para uso posterior
    socketInstance = socket;

    const id = req.query.id;

    if (id) {
        socket.emit('select_device', { id });

        socket.on('mqtt_message', (data) => {
            console.log("mqtt message: ", data);
        });

        res.send(`Conectado com o dispositivo: ${id}`);
    } else {
        res.send(`Necessário passar informações no parâmetro id ou disconnect`);
    }
}

function disconnect(req, res) {

    if (socketInstance) {
        socketInstance.emit('disconnect-mqtt');

        setTimeout(() => {
            socketInstance.disconnect();
            res.send(`Desconectado do dispositivo`);
        }, 1000);
    } else {
        res.send(`Socket não está conectado`);
    }
    
}

module.exports = {
    socket,
    disconnect
};