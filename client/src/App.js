import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/Login';
import Main from './components/Main';
import StockTable from './components/Stocksistema/DatatableStockSistema';
import TechnicalTable from './components/stockTecnico/DatatableStockTecnico';
import TechniquesTable from './components/techniques/DatatableTechniques';
import DevolucionTable from './components/Devoluciones/DatatableDevoluciones';
import TecnicoaContratoTable from './components/Traslados/TecnicoaContrato/Datatable'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/main' element={<Main />} />
        <Route exact path='/datatablestock' element={<StockTable/>} />
        <Route exact path='/datatabletechnical' element={<TechnicalTable/>} />
        <Route exact path='/datatabletechniques' element={<TechniquesTable/>} />
        <Route exact path='/datatabledevolucion' element={<DevolucionTable/>} />
        <Route exact path='/tecnicoacontrato' element={<TecnicoaContratoTable/>} />


      </Routes>
    </Router>
  );
}
