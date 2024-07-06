// StocksTable.js

import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import ModalUpdateStock from '../../containers/StockSistema/ModalUpdateStock';
import { fetchStocks } from '../../controllers/StockSistema/Datatable';
import Sidebar from '../../containers/Sidebar';

const columns = [
  { title: 'ID', data: 'Id_stocksistema' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { title: 'Estado', data: 'Estado' }
];

const StocksTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchStocks}
      modalComponent={ModalUpdateStock}
      title="MATERIALES DEL SISTEMA"
      isAdmin={false} // Assuming isAdmin should be true here
    />
  </>
);

export default StocksTable;
