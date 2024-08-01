const Stock = require('../crud/salescheck/salescheck');

const SalesCheckController = {
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
    const { Codigo_factura, Proveedor_factura,Observacion_factura,Valor_factura, Fecha_factura } = req.body;

    if (!Codigo_factura, !Proveedor_factura, !Observacion_factura || !Valor_factura || !Fecha_factura) {
      return res.status(400).json({ error: 'Los campos Observacion_factura,Valor_factura y Fecha_factura son requeridos.' });
    }
    
    Stock.addStocks(Codigo_factura,Proveedor_factura, Observacion_factura,Valor_factura, Fecha_factura, (err, result) => {
      if (err) {
        console.error('Error al agregar stock:', err);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.status(201).json(result);
      }
    });
  }
}

module.exports = SalesCheckController;
