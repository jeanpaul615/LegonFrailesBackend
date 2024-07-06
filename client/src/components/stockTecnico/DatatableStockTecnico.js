import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import ModalUpdateStock from '../../containers/StockSistema/ModalUpdateStock';
import { fetchTechniques } from '../../controllers/StockTechnique/Datatable';
import Sidebar from '../../containers/Sidebar';
import { format } from 'date-fns';

const columns = [
  { title: 'Id', data: 'id' },
  { title: 'Nombre Material', data: 'nombreMaterial' },
  { title: 'Nombre Técnico', data: 'nombreTecnico' },
  { title: 'Cantidad', data: 'cantidad' },
  { 
    title: 'Fecha de Modificación', 
    data: 'fechaModificacion',
    render: (date) => format(new Date(date), 'dd/MM/yyyy') // Formato dd/mm/aaaa
  }
];

const TechnicalTable = () => (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchTechniques}
      modalComponent={ModalUpdateStock}
      title="STOCK DEL TÉCNICO"
      isAdmin={false} // Assuming isAdmin should be true here
    />
  </>
);

export default TechnicalTable;
