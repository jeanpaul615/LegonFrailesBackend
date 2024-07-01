import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ModalUpdateStock from './ModalUpdateStock'; // Ajusta la ruta según la ubicación de tu componente
import { fetchStocks } from '../../controllers/Datatable';

const DatatableComponent = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null); // Estado para almacenar el stock seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

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
        ],
        paging: true,
        searching: true,
        info: true,
        lengthMenu: [5, 10, 25, 50, 100, 1000, 10000],
        responsive: true,
        autoWidth: true
      });

      // Manejar el clic en una fila para abrir el modal
      $(tableRef.current).on('click', 'tbody tr', function() {
        const rowData = dataTable.row(this).data();
        setSelectedStock(rowData); // Guardar los datos del stock seleccionado
        setIsModalOpen(true); // Abrir el modal al hacer clic en la fila
      });

      // Limpiar DataTable al desmontar el componente para evitar memory leaks
      return () => {
        dataTable.destroy();
      };
    }
  }, [stocks]);

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#datatable' });
    doc.save('inventario.pdf');
  };

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('datatable'));
    XLSX.utils.book_append_sheet(workbook, ws, 'Hoja1');
    XLSX.writeFile(workbook, 'inventario.xlsx');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="mx-auto mt-36 mb-8 px-4 md:px-8 md:pl-72 rounded-lg border-2 border-gray-300 p-4 overflow-hidden shadow-lg font-semibold text-left">
      <div>
        <button onClick={handlePrintPDF} className="md:mr-12 m-4 mr-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Imprimir PDF
        </button>
        <button onClick={handleExportExcel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Exportar a Excel
        </button>
      </div>
      <h1 className="text-center text-2xl font-bold mr-28">MATERIALES DEL SISTEMA</h1>
      <table id="datatable" ref={tableRef} className="table-auto w-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Material</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map(stock => (
            <tr key={stock.Id_stocksistema} className="hover:bg-gray-100 cursor-pointer">
              <td>{stock.Id_stocksistema}</td>
              <td>{stock.Nombre_material}</td>
              <td>{stock.Cantidad}</td>
              <td>{stock.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal para actualizar stock */}
      {isModalOpen && selectedStock && (
        <ModalUpdateStock
          key={selectedStock.Id_stocksistema} // Asegura la renderización del modal al cambiar el stock seleccionado
          Nombre_material={selectedStock.Nombre_material}
          Cantidad={selectedStock.Cantidad}
          Estado={selectedStock.Estado}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DatatableComponent;
