import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchTechniques } from '../../controllers/StockTechnique/Datatable';
import Sidebar from '../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';

const columns = [
  { title: 'Id', data: 'Id_stocktecnico' },
  { title: 'Nombre Material', data: 'Nombre_material' },
  { title: 'Nombre Técnico', data: 'Nombre_tecnico' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Modificación', 
    data: 'Fecha_modificacion',
    render: (data) => {
      // Assuming data is a timestamp, you can format it to dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const TechnicalTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchTechniques}
      modalComponent={ModaltoAdd}
      title="STOCK DEL TÉCNICO"
      isAdmin={false} 
      TextoButton={"Agregar Material al Stock Técnico"}
    />
  </>
);

export default TechnicalTable;
