const Contrato = require('../Models/Contrato/Contrato');

exports.getAllContratos = (req, res) => {
  Contrato.getAll((err, Contrato) => {
    if (err) {
      console.error('Error getting Contrato:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(Contrato);
  });
};

