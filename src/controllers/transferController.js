const Traslado = require('../crud/transfer/transfer');

exports.getAllTraslado = (req, res) => {
  Traslado.getAll((err, traslados) => {
    if (err) {
      console.error('Error getting traslados:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(traslados);
  });
};

exports.addTraslado = (req, res) => {
  const trasladoData = {
    Sede_origen: req.body.Sede_origen,
    Sede_destino: req.body.Sede_destino,
    Nombre_material: req.body.Nombre_material,
    Cantidad: req.body.Cantidad,
  };

  // Añadir la fecha automáticamente aquí
  trasladoData.Fecha = new Date().toISOString().slice(0, 10); 

  Traslado.add(trasladoData, (err, trasladoId) => {
    if (err) {
      console.error('Error adding traslado:', err);
      res.status(500).json({ error: 'Error adding traslado to database' });
      return;
    }
    res.json({ id: trasladoId, ...trasladoData });
  });
};

exports.updateTraslado = (req, res) => {
  const updatedTraslado = req.body;

  Traslado.update(updatedTraslado)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Traslado not found' });
      }
      res.json({ message: 'Traslado updated' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
