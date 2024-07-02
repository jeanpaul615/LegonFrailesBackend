import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ModalUpdateStock from './ModalUpdateStock';
import { fetchStocks, deleteStock } from '../../controllers/Datatable';
import Swal from 'sweetalert2';

const DatatableComponent = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableRef = useRef(null);
  const dataTable = useRef(null); // Ref to store DataTable instance

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
      // Initialize DataTable
      dataTable.current = $(tableRef.current).DataTable({
        data: stocks,
        columns: [
          { title: 'ID', data: 'Id_stocksistema' },
          { title: 'Material', data: 'Nombre_material' },
          { title: 'Cantidad', data: 'Cantidad' },
          { title: 'Estado', data: 'Estado' },
          {
            title: 'Opciones',
            data: null,
            render: function (data, type, row) {
              return `
                <button class="update-btn text-blue-600 hover:text-blue-900 font-bold">Actualizar</button>
                <button class="delete-btn text-red-600 hover:text-red-900 font-bold ml-4">Eliminar</button>
              `;
            }
          }
        ],
        paging: true,
        searching: true,
        responsive: true,
        info: true,
        lengthMenu: [5, 10, 25, 50, 100, 1000],
        autoWidth: true
      });

      // Event listeners for buttons in DataTable
      $(tableRef.current).on('click', '.update-btn', function() {
        const rowData = dataTable.current.row($(this).parents('tr')).data();
        setSelectedStock(rowData);
        setIsModalOpen(true);
      });

      $(tableRef.current).on('click', '.delete-btn', function() {
        const rowData = dataTable.current.row($(this).parents('tr')).data();
        handleDelete(rowData.Id_stocksistema);
      });

      return () => {
        // Cleanup: Destroy DataTable instance
        if (dataTable.current) {
          dataTable.current.destroy(true); // true: Remove from DOM
        }
      };
    }
  }, [stocks]);

  const handleDelete = async (Id_stocksistema) => {
    // Use SweetAlert2 for confirmation
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStock(Id_stocksistema);
          setStocks(prevStocks => prevStocks.filter(stock => stock.Id_stocksistema !== Id_stocksistema));
          Swal.fire(
            '¡Eliminado!',
            'El archivo ha sido eliminado.',
            'success',
          );
          window.location.reload();
        } catch (error) {
          console.error('Error al eliminar el stock:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al intentar eliminar el archivo.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu material no fue eliminado',
          'error'
        );
      }
    });
  };

  const handleUpdate = async (Id_stocksistema, Nombre_material, Cantidad, Estado) => {
    try {
      setStocks(prevStocks =>
        prevStocks.map(stock =>
          stock.Id_stocksistema === Id_stocksistema ? { ...stock, Nombre_material, Cantidad, Estado } : stock
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

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
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.Id_stocksistema}>
              <td>{stock.Id_stocksistema}</td>
              <td>{stock.Nombre_material}</td>
              <td>{stock.Cantidad}</td>
              <td>{stock.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedStock && (
        <ModalUpdateStock
          key={selectedStock.Id_stocksistema}
          onClose={handleCloseModal}
          {...selectedStock}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default DatatableComponent;
