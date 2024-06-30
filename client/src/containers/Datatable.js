import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { fetchStocks } from '../controllers/Datatable'; // Ajusta la ruta según sea necesario

const DatatableComponent = () => {
  const [stocks, setStocks] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksData = await fetchStocks();
        setStocks(stocksData);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if ($.fn.DataTable && stocks.length > 0) {
      const dataTable = $(tableRef.current).DataTable({
        data: stocks,
        columns: [
          { title: 'ID', data: 'Id_stocksistema' },
          { title: 'Material', data: 'Nombre_material' },
          { title: 'Cantidad', data: 'Cantidad' },
          { title: 'Estado', data: 'Estado' }
          // Agrega más columnas según sea necesario
        ],
        paging: true,
        searching: true,
        info: true,
        lengthMenu: [5, 10, 25, 50, 100],
        responsive: true,
        autoWidth: true
      });

      // Limpiar DataTable al desmontar el componente para evitar memory leaks
      return () => {
        dataTable.destroy();
      };
    }
  }, [stocks]);

  return (
<div className="mx-auto mt-36 mb-8 px-4 md:px-8 md:pl-72 rounded-lg border-2 border-gray-300 p-4 overflow-hidden shadow-lg font-semibold text-left">
      
      <h1 className='text-center text-2xl font-bold'>MATERIALES DEL SISTEMA</h1>
  <table ref={tableRef} className="table-auto w-auto">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th scope="col" className="">ID</th>
        <th scope="col" className="">Nombre</th>
        <th scope="col" className="">Cantidad</th>
        <th scope="col" className="">Estado</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {stocks.map(stock => (
        <tr key={stock.Id_stocksistema} className="hover:bg-gray-100">
        <td>{stock.Id_stocksistema}</td>
        <td>{stock.Nombre_material}</td>
        <td>{stock.Cantidad}</td>
        <td>{stock.Estado}</td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default DatatableComponent;
