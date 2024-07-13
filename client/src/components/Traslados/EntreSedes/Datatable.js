import React from 'react';
import DatatableContainer from '../../../containers/StockSistema/Datatable';
import { fetchContrato } from '../../../controllers/Contrato/Datatable';
import Sidebar from '../../../containers/Sidebar';
import ModaltoAdd from './ModalToAdd';

const columns = [
  { title: 'ID', data: 'Id_traslado' },
  { title: 'Sede', data: 'Sede' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Traslado', 
    data: 'Fecha',
    render: (data) => {
      // Assuming data is a timestamp, you can format it to dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const EntreSedesTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchContrato}
      modalComponent={ModaltoAdd} 
      title="TRASLADO ENTRE SEDES"
      isAdmin={false}
      TextoButton={"Registrar Nuevo Traslado"}
    />
  </>
);

export default EntreSedesTable;
