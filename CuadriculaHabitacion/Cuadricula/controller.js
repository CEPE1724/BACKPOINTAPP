
const model = require("./model");
exports.listBDD = async (req, res) => {
  try {
    const listBB = await model.getValUser(req.params.user, req.params.password);
    res.status(200).json({
      message: "List of points, success",
      data: listBB,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
};
exports.listEmpresa = async (req, res) => {
  try {
    const listEmp = await model.getListEmpresa(req.params.idUsuario);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
};

exports.EmpresaUser = async (req, res) => {
  try {
    const listEmp = await model.EmpresaUser(req.params.user, req.params.password, req.params.idempresa);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
};


exports.listBodegaEmpresa = async (req, res) => {
  try {
    const listEmp = await model.getListBodegaEmpresa(req.params.idUsuario, req.params.idempresa);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
} 

exports.listHabitaciones = async (req, res) => {
  try {
    const listEmp = await model.getListHabitaciones(req.params.idBodega, req.params.idempresa);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
}

exports.listGuardias = async (req, res) => {
  try {
    const listEmp = await model.getListGuardias(req.params.idempresa);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }
}

exports.createHabitacion = async (req, res) => {
  try {
    const listEmp = await model.createHabitacion(req.body);
    res.status(200).json({
      message: "List of points, success",
      data: listEmp,
    });
  } catch (error) {

    console.error("Error al obtener datos de la base de datos:", error);
    throw error;
  }

}

