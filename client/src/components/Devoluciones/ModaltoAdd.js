import React, { useState, useEffect } from "react";
import { AddDevolucion } from "../../controllers/Devolver/Datatable";
import { fetchStocks } from "../../controllers/StockSistema/Datatable";

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [materialData, setMaterialData] = useState({
    Nombre_material: "",
    Stock: 0,
    Cantidad: 0,
    Estado: ""
  });

  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    const fetchTechniciansAndMaterials = async () => {
      const mats = await fetchStocks();
      setMaterials(mats || []);
    };

    fetchTechniciansAndMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { Nombre_material, Cantidad, Estado } = materialData;
      const response = await AddDevolucion(Nombre_material, Cantidad, Estado);
      console.log("Operación exitosa:", response);
      onClose(); // Cierra el modal después de agregar
    } catch (error) {
      console.error("Error al realizar la operación:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setMaterialData({
      ...materialData,
      [name]: value
    });

    if (name === "Nombre_material" && value.trim().length > 0) {
      setFilteredMaterials(
        materials.filter((material) =>
          material.Nombre_material.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      // Reset filtered materials if value is empty
      setFilteredMaterials([]);
    }
  };

  const handleMaterialClick = async (material) => {
    setMaterialData({
      ...materialData,
      Nombre_material: material.Nombre_material
    });

    setFilteredMaterials([]); // Cierra la lista filtrada después de seleccionar un material
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Materiales</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Material</label>
            <input
              type="text"
              name="Nombre_material"
              value={materialData.Nombre_material}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredMaterials && filteredMaterials.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
                {filteredMaterials.map((material) => (
                  <li
                    key={material.id}
                    onClick={() => handleMaterialClick(material)}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                  >
                    {material.Nombre_material}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="Stock"
              value={materialData.Stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              name="Cantidad"
              value={materialData.Cantidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              name="Estado"
              value={materialData.Estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModaltoAdd;
