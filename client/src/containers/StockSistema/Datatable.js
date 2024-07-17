import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const DatatableContainer = ({ columns, fetchData, title, isAdmin, TextoButton, ModalComponent, ModalUpdate, update }) => {
  const [data, setData] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const tableRef = useRef(null);
  const dataTable = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, [fetchData]);

  useEffect(() => {
    if ($.fn.DataTable && data.length > 0) {
      if (dataTable.current) {
        dataTable.current.destroy(true);
      }

      const columnsWithOptions = isAdmin ? [
        ...columns,
        {
          title: 'Opciones',
          data: null,
          render: function (data, type, row) {
            return '<button class="update-btn text-blue-600 hover:text-blue-900 font-bold">Actualizar</button>';
          }
        }
      ] : columns;

      dataTable.current = $(tableRef.current).DataTable({
        data,
        columns: columnsWithOptions,
        paging: true,
        searching: true,
        responsive: true,
        info: true,
        lengthMenu: [5, 10, 25, 50, 100, 1000],
        autoWidth: true
      });

      $('#datatable').on('click', 'button.update-btn', function () {
        const row = dataTable.current.row($(this).parents('tr')).data();
        setSelectedRow(row);
        setIsModalUpdateOpen(true);
      });

      return () => {
        if (dataTable.current) {
          dataTable.current.destroy(true);
        }
      };
    }
  }, [data, columns, isAdmin]);

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#datatable' });
    doc.save('data.pdf');
  };

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('datatable'));
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  const handleAddStock = () => {
    setSelectedRow(null);
    setIsModalAddOpen(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalAddOpen(false);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdateOpen(false);
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
        {ModalComponent && (
          <button onClick={handleAddStock} className="md:ml-96 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {TextoButton}
          </button>
        )}
      </div>
      <h1 className="text-center text-2xl font-bold mr-28">{title}</h1>
      <table id="datatable" ref={tableRef} className="table-auto w-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">{column.title}</th>
            ))}
            {isAdmin && <th scope="col">Opciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={isAdmin ? item.Id_stocksistema : item.id}>
              {columns.map((column, colIndex) => (
                <td key={`${isAdmin ? item.Id_stocksistema : item.id}-${colIndex}`}>{item[column.data]}</td>
              ))}
              {isAdmin && (
                <td>
                  <button className="update-btn text-blue-600 hover:text-blue-900 font-bold">Actualizar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalAddOpen && ModalComponent && (
        <ModalComponent
          isOpen={isModalAddOpen}
          onClose={handleCloseModalAdd}
        />
      )}

      {isModalUpdateOpen && ModalUpdate && (
        <ModalUpdate
          isOpen={isModalUpdateOpen}
          onClose={handleCloseModalUpdate}
          rowData={selectedRow}
          update={update}
        />
      )}
    </div>
  );
};

export default DatatableContainer;
