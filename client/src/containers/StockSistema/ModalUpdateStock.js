import React, { useState } from 'react';

export default function ModalUpdateStock({ onClose }) {
  const [Nombre_material, setNombre_material] = useState('');
  const [Cantidad, setCantidad] = useState(0);
  const [Estado, setEstado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes manejar la lógica para guardar los datos del formulario
    // Por ejemplo, puedes enviar estos datos a una función de guardado o API

    // Después de guardar, cierra el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-xl z-50 w-96">
        <h2 className="text-2xl font-bold mb-4">Modificar Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Nombre_material" className="block text-sm font-medium text-gray-700">Nombre del Material</label>
            <input
              type="text"
              id="Nombre_material"
              name="Nombre_material"
              value={Nombre_material}
              onChange={(e) => setNombre_material(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              id="Cantidad"
              name="Cantidad"
              value={Cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              id="Estado"
              name="Estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Agregar
            </button>
            <button type="button" className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
