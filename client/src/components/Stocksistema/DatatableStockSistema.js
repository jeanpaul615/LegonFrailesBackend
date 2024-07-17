// StocksTable.js
import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchStocks } from '../../controllers/StockSistema/Datatable';
import Sidebar from '../../containers/Sidebar';
import ModalUpdate from '../../containers/StockSistema/ModalUpdateStock';

const columns = [
  { title: 'ID', data: 'Id_stocksistema' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { title: 'Estado', data: 'Estado' }
];

const StocksTable = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchStocks}
      modalComponent={null} 
      ModalUpdate={ModalUpdate}
      title="MATERIALES DEL SISTEMA"
      isAdmin={isAdmin} // Pasar la función ApisAdmin como prop isAdmin
    />
  </>
);
}
export default StocksTable;
