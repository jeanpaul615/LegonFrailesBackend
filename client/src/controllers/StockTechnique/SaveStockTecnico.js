import axios from 'axios';
import qs from 'qs'; // Importa el módulo 'qs' para serializar los datos en formato x-www-form-urlencoded

// Función para guardar los datos en la tabla stocktecnico y actualizar stocksistema
export const SaveStockTecnico = async (Id_stocktecnico, Nombre_material, Cantidad, Nombre_tecnico) => {
  try {
    // Crea un objeto con los datos que quieres enviar
    const formData = {
      Id_stocktecnico,
      Nombre_material,
      Cantidad,
      Nombre_tecnico
    };

    // Guardar en stocktecnico usando x-www-form-urlencoded
    const response = await axios.post('http://localhost:5000/stocktechnique/add-stocktechnique', qs.stringify(formData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    window.location.reload();
    return { success: true, response };
  } catch (error) {
    console.error('Error al guardar en stocktecnico:', error);
    return { success: false, error };
  }
};
