import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchStocks } from '../../controllers/StockSistema/Datatable';
import Sidebar from '../../containers/Sidebar';

const columns = [
  { title: 'ID', data: 'Id_devolucion' },
  { title: 'N° Remision', data: 'Remision' },
  { title: 'Cantidad', data: 'Cantidad' },
  { title: 'Nombre del Material', data: 'Nombre_material' },
  { title: 'Fecha', data: 'Fecha de Devolucion' }
];

const StocksTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchStocks}
      modalComponent={null} 
      title="MATERIALES DEL SISTEMA"
      isAdmin={false}
    />
  </>
);

export default StocksTable;
