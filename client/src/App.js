import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/Login';
import Main from './components/Main';
import StockTable from './components/Stocksistema/DatatableStockSistema';
import TechnicalTable from './components/stockTecnico/DatatableStockTecnico';
import TechniquesTable from './components/techniques/DatatableTechniques';
import RegistroTable from './components/Registro/DatatableRegistros';
import TecnicoaContratoTable from './components/Traslados/TecnicoaContrato/Datatable';
import TecnicoaSistemaTable from './components/Traslados/TecnicoaSistema/Datatable';
import EntreSedesTable from './components/Traslados/EntreSedes/Datatable';
import ProtectedRoute from './ProtectedRoute'; // Importa el componente ProtectedRoute

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/main' element={<ProtectedRoute element={Main} />} />
        <Route exact path='/datatablestock' element={<ProtectedRoute element={StockTable} />} />
        <Route exact path='/datatabletechnical' element={<ProtectedRoute element={TechnicalTable} />} />
        <Route exact path='/datatabletechniques' element={<ProtectedRoute element={TechniquesTable} />} />
        <Route exact path='/agregarinventario' element={<ProtectedRoute element={RegistroTable} />} />
        <Route exact path='/tecnicoacontrato' element={<ProtectedRoute element={TecnicoaContratoTable} />} />
        <Route exact path='/entresedes' element={<ProtectedRoute element={EntreSedesTable} />} />
        <Route exact path='/tecnicoasistema' element={<ProtectedRoute element={TecnicoaSistemaTable} />} />
      </Routes>
    </Router>
  );
}
