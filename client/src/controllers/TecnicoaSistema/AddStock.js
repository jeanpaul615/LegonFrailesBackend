import axios from "axios";

// Función encargada de obtener materiales por técnico
export const getMaterials = async (Nombre_tecnico) => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/materials-by-tecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_tecnico })
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los materiales:', error);
    throw error;
  }
};

// Función para obtener la lista de técnicos
export const getTechnicians = async () => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/all-tecnicos');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data; // Asume que la respuesta es una lista de nombres de técnicos
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    throw error;
  }
};

// Función para obtener el stock por material en formato application/json
export const getStockByMaterial = async (Nombre_material, Nombre_tecnico) => {
  try {
    const response = await fetch('http://localhost:5000/stocktechnique/stock-by-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Nombre_material, Nombre_tecnico })
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener el stock por material:', error);
    throw error;
  }
};

// Función para guardar el stock técnico
export const SaveStockTecnico = async (Nombre_material, Cantidad, Nombre_tecnico) => {
  try {
    const response = await axios.put('http://localhost:5000/stocktechnique/update-cantidad-stocktechnique', {
      Nombre_material,
      Nombre_tecnico,
      Cantidad,
    });

    if (!response.data) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Realizar la actualización en el stock general (stock sistema)
    const responseStockSistema = await axios.post('http://localhost:5000/stock/update-stockbydevolucion', {
      Nombre_material,
      Cantidad,
    });

    if (!responseStockSistema.data) {
      throw new Error(`Error en la solicitud de actualización del stock sistema: ${responseStockSistema.statusText}`);
    }

    // No se necesita response.json() ya que axios ya maneja la respuesta JSON automáticamente

    // Opcional: Recargar la página después de la actualización (esto puede mejorarse dependiendo de la arquitectura de tu aplicación)
    window.location.reload();
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    console.error('Error al guardar el stock técnico:', error);
    throw error;
  }
};
