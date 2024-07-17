import React, { useEffect, useState } from "react";

const ModalUpdate = ({ isOpen, onClose, rowData, update }) => {
  const [formData, setFormData] = useState(rowData || {});

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(formData);
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Actualizar
          </button>
          <button onClick={onClose} className="ml-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
