import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const DatatableContainer = ({ columns, fetchData, modalComponent: ModalComponent, title, isAdmin }) => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      $(tableRef.current).on('click', '.update-btn', function () {
        const rowData = dataTable.current.row($(this).parents('tr')).data();
        setSelectedData(rowData);
        setIsModalOpen(true);
      });

      return () => {
        if (dataTable.current) {
          dataTable.current.destroy(true);
        }
      };
    }
  }, [data, columns, isAdmin]);

  const handleUpdate = async (updatedData) => {
    try {
      if (isAdmin) {
        // Lógica específica para actualizar datos de StockSistema
        setData(prevData =>
          prevData.map(item =>
            item.Id_stocksistema === updatedData.Id_stocksistema ? updatedData : item
          )
        );
      } else {
        // Lógica específica para actualizar datos de StockTecnico (si es diferente)
        setData(prevData =>
          prevData.map(item =>
            item.Id_stocktecnico === updatedData.Id_stocktecnico ? updatedData : item
          )
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
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
            <tr key={isAdmin ? item.Id_stocksistema : item.Id_stocktecnico}> {/* Usar la clave adecuada para cada tipo */}
              {columns.map((column, colIndex) => (
                <td key={`${isAdmin ? item.Id_stocksistema : item.Id_stocktecnico}-${colIndex}`}>{item[column.data]}</td>
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

      {isModalOpen && selectedData && (
        <ModalComponent
          key={isAdmin ? selectedData.Id_stocksistema : selectedData.Id_stocktecnico} // Asegúrate de que sea único y constante
          onClose={handleCloseModal}
          {...selectedData}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default DatatableContainer;
