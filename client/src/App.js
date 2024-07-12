import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/Login';
import Main from './components/Main';
import StockTable from './components/Stocksistema/DatatableStockSistema';
import TechnicalTable from './components/stockTecnico/DatatableStockTecnico';
import TechniquesTable from './components/techniques/DatatableTechniques';
import RegistroTable from './components/Registro/DatatableRegistros';
import TecnicoaContratoTable from './components/Traslados/TecnicoaContrato/Datatable'
import TecnicoaSistemaTable from './components/Traslados/TecnicoaSistema/Datatable';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/main' element={<Main />} />
        <Route exact path='/datatablestock' element={<StockTable/>} />
        <Route exact path='/datatabletechnical' element={<TechnicalTable/>} />
        <Route exact path='/datatabletechniques' element={<TechniquesTable/>} />
        <Route exact path='/agregarinventario' element={<RegistroTable/>} />
        <Route exact path='/tecnicoacontrato' element={<TecnicoaContratoTable/>} />
        <Route exact path='/tecnicoasistema' element={<TecnicoaSistemaTable/>} />



      </Routes>
    </Router>
  );
}
