const Contrato = require('../Models/Contrato/Contrato');

exports.getAllContratos = (req, res) => {
  Contrato.getAll((err, contratos) => {
    if (err) {
      console.error('Error getting contratos:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(contratos);
  });
};

exports.addContrato = (req, res) => {
  const { Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad } = req.body;
  if (!Nombre_contrato || !Nombre_tecnico || !Nombre_material || !Cantidad) {
    return res.status(400).json({ error: 'Los campos Nombre_contrato, Nombre_tecnico, Nombre_material, y Cantidad son requeridos.' });
  }
  
  const Fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha y hora actuales en formato 'yyyy-mm-dd hh:mm:ss'
  
  Contrato.addContrato(Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha, (err, result) => {
    if (err) {
      console.error('Error insertando contrato:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(result);
  });
};

exports.updateContrato = (req, res) => {
  const { Id_contrato, Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha } = req.body;

  Contrato.updateContratoById({Id_contrato ,Nombre_contrato, Nombre_tecnico, Nombre_material, Cantidad, Fecha })
    .then(() => {
      res.json({ message: 'Contrato updated' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};