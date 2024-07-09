import React, { useState, useEffect } from "react";
import { getTechnicians, getMaterials, getStockByMaterial } from "../../../controllers/Contrato/addStock"; // Ajusta la ruta según sea necesario

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [contractData, setContractData] = useState({
    Numero_contrato: "",
    Nombre_tecnico: "",
    Nombre_material: "",
    Stock: 0,
    Cantidad: 0,
    Fecha: ""
  });

  const [technicians, setTechnicians] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    const fetchTechniciansAndMaterials = async () => {
      const techs = await getTechnicians();
      const filteredTechs = techs.filter((tech) => tech.Estado === 1); // Filtrar técnicos activos
      setTechnicians(filteredTechs || []);
      const mats = await getMaterials();
      setMaterials(mats || []);
    };

    fetchTechniciansAndMaterials();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setContractData({
      ...contractData,
      [name]: value
    });

    if (name === "Nombre_material" && value.trim().length > 0 && contractData.Nombre_tecnico.trim().length > 0) {
      try {
        const stock = await getStockByMaterial(value, contractData.Nombre_tecnico);
        setContractData({
          ...contractData,
          Stock: stock,
        });
      } catch (error) {
        console.error("Error al obtener el stock por material:", error);
        setContractData({
          ...contractData,
          Stock: 0,
          Cantidad: 0
        });
      }
    }

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

    if (name === "Nombre_tecnico" && value.trim().length > 0) {
      setFilteredTechnicians(
        technicians.filter((technician) =>
          technician.Nombre.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      // Reset filtered technicians if value is empty
      setFilteredTechnicians([]);
    }
  };

  const handleMaterialClick = async (material) => {
    setContractData({
      ...contractData,
      Nombre_material: material.Nombre_material
    });

    setFilteredMaterials([]); // Cierra la lista filtrada después de seleccionar un material
  };

  const handleTechnicianClick = (technician) => {
    setContractData({
      ...contractData,
      Nombre_tecnico: technician.Nombre
    });
    setFilteredTechnicians([]); // Cierra la lista filtrada después de seleccionar un técnico
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Contrato</h2>
        <form onSubmit={""}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Número de Contrato</label>
            <input
              type="text"
              name="Numero_contrato"
              value={contractData.Numero_contrato}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Técnico</label>
            <input
              type="text"
              name="Nombre_tecnico"
              value={contractData.Nombre_tecnico}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredTechnicians && filteredTechnicians.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
                {filteredTechnicians.map((technician) => (
                  <li
                    key={technician.id}
                    onClick={() => handleTechnicianClick(technician)}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                  >
                    {technician.Nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Material</label>
            <input
              type="text"
              name="Nombre_material"
              value={contractData.Nombre_material}
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
              value={contractData.Stock}
              onChange={handleChange} // Asegúrate de que esta función maneje el cambio en el campo Stock si es necesario
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
              value={contractData.Cantidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              name="Fecha"
              value={contractData.Fecha}
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
