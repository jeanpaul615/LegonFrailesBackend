import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchDevolucion } from '../../controllers/Devolucion/Datatable';
import Sidebar from '../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';

const columns = [
  { title: 'ID', data: 'Id_devolucion' },
  { title: 'Nombre del Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Registro', 
    data: 'Fecha',
    render: (data) => {
      // Assuming data is a timestamp, you can format it to dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const RegistroTable = () => {
  // Obtener el estado de isAdmin desde localStorage
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <Sidebar />
      <DatatableContainer
        columns={columns}
        fetchData={fetchDevolucion}
        modalComponent={ModaltoAdd} 
        TextoButton={"Agregar Materiales al Stock"}
        title="AGREGAR MATERIALES AL STOCK"
        isAdmin={isAdmin} // Pasa el estado de isAdmin como prop
      />
    </>
  );
};

export default RegistroTable;
