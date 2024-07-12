// Función encargada de obtener materiales por técnico
export const getMaterials = async (stockData) => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/materials-by-tecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockData)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los materiales:', error);
    throw error;
  }
};

// Función para obtener la lista de técnicos
export const getTechnicians = async () => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/get-tecnicosstock');
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

// Función para obtener el stock por material en formato application/json
export const getStockByMaterial = async (Nombre_material, Nombre_tecnico) => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/cantidad-by-tecnico-material', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_material, Nombre_tecnico })
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