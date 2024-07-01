import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/Login';
import Main from './components/Main';
import Datatable from './containers/StockSistema/Datatable'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/main' element={<Main />} />
        <Route exact path='/datatable' element={<Datatable />} />
      </Routes>
    </Router>
  );
}
