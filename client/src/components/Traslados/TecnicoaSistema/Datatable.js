import React from 'react';
import DatatableContainer from '../../../containers/StockSistema/Datatable';
import { fetchTechniques } from '../../../controllers/StockTechnique/Datatable';
import Sidebar from '../../../containers/Sidebar';
import ModaltoAdd from '../../Traslados/TecnicoaSistema/ModaltoAdd';

const columns = [
  { title: 'ID', data: 'Id_stocktecnico' },
  { title: 'Nombre Tecnico', data: 'Nombre_tecnico' },
  { title: 'Material', data: 'Nombre_material' },
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

const TecnicoaSistemaTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchTechniques}
      modalComponent={ModaltoAdd} 
      title="TRASLADO TECNICO A SISTEMA"
      isAdmin={false}
      TextoButton={"Traslado Tecnico a Sistema"}
    />
  </>
);

export default TecnicoaSistemaTable;
