const Devolucion = require('../Models/Devolucion/Devolucion');

exports.getAllDevoluciones = (req, res) => {
  Devolucion.getAll((err, devoluciones) => {
    if (err) {
      console.error('Error getting devoluciones:', err);
      res.status(500).json({ error: 'Error querying database' });
      return;
    }
    res.json(devoluciones);
  });
};

exports.createDevolucion = (req, res) => {
  const { Nombre_material, Cantidad, Estado } = req.body;

  if (!Nombre_material || !Cantidad || !Estado) {
    return res.status(400).json({ error: 'Nombre_material, Cantidad, and Estado are required' });
  }

  const newDevolucion = { Nombre_material, Cantidad, Estado };

  Devolucion.create(newDevolucion, (err, result) => {
    if (err) {
      console.error('Error creating devolucion:', err);
      res.status(500).json({ error: 'Error inserting into database' });
      return;
    }
    res.status(201).json({ message: 'Devolucion created successfully', id: result.insertId });
  });
};


exports.updateDevolucion = (req, res) => {
  const { Nombre_material, Cantidad, Estado } = req.body;

  if (!Nombre_material || !Cantidad || !Estado) {
    return res.status(400).json({ error: 'Nombre_material, Cantidad, and Estado are required' });
  }

  const Devolucion = { Nombre_material, Cantidad, Estado };

  Devolucion.create(Devolucion, (err, result) => {
    if (err) {
      console.error('Error creating devolucion:', err);
      res.status(500).json({ error: 'Error inserting into database' });
      return;
    }
    res.status(201).json({ message: 'Devolucion created successfully', id: result.insertId });
  });
};
