import axios from "axios";
export const getTechnicians = async () => {
  try {
    const response = await fetch('http://localhost:5000/tecnico/tecnicos');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json(); // Corregido para obtener datos JSON
    return data; // Asume que la respuesta es una lista de nombres de técnicos
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    throw error;
  }
};

// Función para obtener la lista de materiales
export const getMaterials = async () => {
  try {
    const response = await fetch('http://localhost:5000/stock/get-stocksistema');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json(); // Corregido para obtener datos JSON
    return data; // Asume que la respuesta es una lista de nombres de materiales
  } catch (error) {
    console.error('Error al obtener materiales:', error);
    throw error;
  }
};

// Función para obtener el stock por material en formato application/json
export const getStockByMaterial = async (Nombre_material, Nombre_tecnico) => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/byname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_material, Nombre_tecnico }) // Convertir el cuerpo de la solicitud a JSON
    });

    if (!response.ok) {
      throw new Error('Error al obtener el stock por material');
    }

    const data = await response.json();
    console.log(data);

    // Asegúrate de que el data contenga la propiedad cantidad
    if (!data || typeof data.cantidad !== 'number') {
      throw new Error('Material no encontrado');
    }

    return data.cantidad; // Devolver solo la cantidad
  } catch (error) {
    console.error('Error al obtener el stock por material:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};

// Función para enviar un contrato
export const submitContrato = async (Nombre_contrato, Nombre_material, Nombre_tecnico, Cantidad, onClose) => {
  try {
    const response = await axios.post('http://localhost:5000/contrato/add-contratos', {
      Nombre_contrato,
      Nombre_tecnico,
      Nombre_material,
      Cantidad,
    });
    console.log('Contrato agregado:', response.data);

    const response2 = await axios.put('http://localhost:5000/stocktechnique/update-cantidad-stocktechnique', {
      Nombre_material,
      Nombre_tecnico,
      Cantidad,
    });
    console.log('Stock actualizado:', response2.data);
    window.location.reload();   
  } catch (error) {
    console.error('Error al agregar contrato:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
