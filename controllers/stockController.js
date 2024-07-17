const Stock = require('../Models/Stock/Stock');

const StockController = {
  getAllStocks: (req, res) => {
    Stock.getAllStocks((err, data) => {
      if (err) {
        console.error('Error al obtener stocks:', err);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.status(200).json(data);
      }
    });
  },

  addStock: (req, res) => {
    const { Nombre_material, Cantidad, Estado } = req.body;

    if (!Nombre_material || !Cantidad || !Estado) {
      return res.status(400).json({ error: 'Los campos Nombre_material, Cantidad y Estado son requeridos.' });
    }

    Stock.addStocks(Nombre_material, Cantidad, Estado, (err, result) => {
      if (err) {
        console.error('Error al insertar stock:', err);
        return res.status(500).json({ error: 'Error interno al agregar stock' });
      }
      res.status(200).json({ message: 'Stock agregado correctamente', insertId: result.insertId });
    });
  },

  updateStock: (req, res) => {
    const { Id_stocksistema, Nombre_material, Cantidad, Estado } = req.body;
  
    // Verificar si todos los campos requeridos están presentes
    if (!Id_stocksistema || !Nombre_material || !Cantidad || !Estado) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
  
    Stock.updateStock(Id_stocksistema, Nombre_material, Cantidad, Estado, (err, result) => {
      if (err) {
        console.error('Error al actualizar stock:', err);
        return res.status(500).json({ error: 'Error interno al actualizar stock' });
      }
      res.status(200).json({ message: 'Stock actualizado correctamente' });
    });
  },
  
  
  

  getCantidadByNombreMaterial: (req, res) => {
    const { Nombre_material } = req.body;

    if (!Nombre_material) {
      return res.status(400).json({ error: 'Nombre_material es requerido en el cuerpo de la solicitud' });
    }

    Stock.getCantidadByNombreMaterial(Nombre_material, (err, cantidad) => {
      if (err) {
        console.error('Error al obtener cantidad:', err);
        res.status(500).json({ error: 'Error en el servidor' });
      } else if (cantidad === null) {
        res.status(404).json({ error: 'Stock no encontrado' });
      } else {
        res.status(200).json({ cantidad });
      }
    });
  },

  updateStockByTecnico: (req, res) => {
    const { Nombre_material } = req.body;
    const CantidadARestar = parseInt(req.body.Cantidad, 10); // Cantidad a restar
  
    if (!Nombre_material || isNaN(CantidadARestar)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
  
    Stock.getCantidadByNombreMaterial(Nombre_material, (err, cantidadActual) => {
      if (err) {
        console.error('Error al obtener la cantidad del stock:', err);
        return res.status(500).json({ error: 'Error interno al obtener la cantidad del stock' });
      }
  
      if (cantidadActual === null) {
        return res.status(404).json({ error: 'Material no encontrado' });
      }
  
      const nuevaCantidad = cantidadActual - CantidadARestar;
  
      if (nuevaCantidad < 0) {
        return res.status(400).json({ error: 'La cantidad a restar es mayor que la cantidad actual' });
      }
  
      Stock.updateStockByMaterial(Nombre_material, nuevaCantidad, (err, result) => {
        if (err) {
          console.error('Error al actualizar el stock:', err);
          return res.status(500).json({ error: 'Error interno al actualizar el stock' });
        }
  
        res.status(200).json({ message: 'Stock actualizado correctamente' });
      });
    });
  },

  updateStockByDevolucion: (req, res) => {
    const { Nombre_material } = req.body;
    const CantidadARestar = parseInt(req.body.Cantidad, 10); // Cantidad a restar
  
    if (!Nombre_material || isNaN(CantidadARestar)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
  
    Stock.getCantidadByNombreMaterial(Nombre_material, (err, cantidadActual) => {
      if (err) {
        console.error('Error al obtener la cantidad del stock:', err);
        return res.status(500).json({ error: 'Error interno al obtener la cantidad del stock' });
      }
  
      if (cantidadActual === null) {
        return res.status(404).json({ error: 'Material no encontrado' });
      }
  
      const nuevaCantidad = cantidadActual + CantidadARestar;
  
  
      Stock.updateStockByMaterial(Nombre_material, nuevaCantidad, (err, result) => {
        if (err) {
          console.error('Error al actualizar el stock:', err);
          return res.status(500).json({ error: 'Error interno al actualizar el stock' });
        }
  
        res.status(200).json({ message: 'Stock actualizado correctamente' });
      });
    });
  },
};

module.exports = StockController;
