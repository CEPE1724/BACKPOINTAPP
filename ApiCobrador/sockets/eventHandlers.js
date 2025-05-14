const { cp } = require('fs');
const { getIO } = require('./socketio');

const handleNewList = (registros) => {
    getIO().emit('listado', registros);
};

const handleNewLocation = (ubicacion) => {
    getIO().emit('newLocation', ubicacion); // Emitir la nueva ubicación
};

/* Exportar funciones cliente Verificacion Terrena */
const handleNewVT = (registros) => {
    getIO().emit('listadoVT', registros);
};
const handleNewVTCount = (estadosCount) => {
    getIO().emit('listadoVTCount', estadosCount);
}
// **Nueva función para emitir la nueva notificación**
const handleNewNotification = (notification) => {
    console.log('handleNewNotification', notification);
    getIO().emit('newNotification', notification); // Emitir la nueva notificación a los clientes
};
module.exports = {
    handleNewList,
    handleNewLocation,
    handleNewVT,
    handleNewVTCount,
    handleNewNotification  
};
