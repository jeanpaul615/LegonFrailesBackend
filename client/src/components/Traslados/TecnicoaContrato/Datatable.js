import React from 'react';
import DatatableContainer from '../../../containers/StockSistema/Datatable';
import { fetchContrato } from '../../../controllers/Contrato/Datatable';
import Sidebar from '../../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';

const columns = [
  { title: 'ID', data: 'Id_contrato' },
  { title: 'N° Contrato', data: 'Nombre_contrato' },
  { title: 'Nombre Tecnico', data: 'Nombre_tecnico' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Instalación', 
    data: 'Fecha',
    render: (data) => {
      // Assuming data is a timestamp, you can format it to dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const TecnicoaContratoTable = () => {
  return(
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchContrato}
      modalComponent={ModaltoAdd} 
      title="TRASLADO TECNICO A CONTRATO"
      isAdmin={false}
      TextoButton={"Registrar Nuevo Traslado"}
    />
  </>
)};

export default TecnicoaContratoTable;
