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
module.exports = {
    handleNewList,
    handleNewLocation,
    handleNewVT,
    handleNewVTCount
};
