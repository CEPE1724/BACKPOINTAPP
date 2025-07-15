const database = require("../../CuadriculaHabitacion/Config/db");
exports.obtenerDatos = async () => {
    const data = await database.obtenerDatos();
    return data;
};


exports.getValUser = async (user, password) => {
    const data = await database.ValUser(user, password);
    return data;
}

exports.getListEmpresa = async (idUsuario) => {
    const data = await database.getListEmpresa(idUsuario);
    return data;
}

exports.EmpresaUser = async (user, password, idempresa) => {
    const data = await database.EmpresaUser(user, password, idempresa);
    return data;
}

exports.getListBodegaEmpresa = async (idUsuario, idempresa) => {
    const data = await database.getListBodegaEmpresa(idUsuario, idempresa);
    return data;
}


exports.getListHabitaciones = async (idBodega, idempresa) => {
    const data = await database.getListHabitaciones(idBodega, idempresa);
    return data;
}


exports.getListGuardias = async (idempresa) => {
    const data = await database.getListGuardias(idempresa);
    return data;
}

exports.createHabitacion = async (body) => {
    const data = await database.createHabitacion(body);
    return data;
}
