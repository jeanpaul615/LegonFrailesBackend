import axios from "axios";

// Función encargada de traer los stocks para la datatable del dashboard
export const fetchStocks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/stock/get-stocksistema');
    return response.data; // Retorna los datos recibidos desde la API
  } catch (error) {
    console.error('Error al obtener los stocks:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};


export const deleteStock = async (id) => {
  const response = await fetch(`http://localhost:5000/stock/delete-stocksistema/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error deleting stock');
  }
};

export const updateStock = async (Id_stocksistema, Nombre_material, Cantidad, Estado) => {
  // Verifica que todos los parámetros tengan valores definidos
  if (!Id_stocksistema || !Nombre_material || !Cantidad || !Estado) {
    console.error('Valores no definidos para la actualización de stock');
    return; // O manejar el error de alguna otra forma según tu aplicación
  }

  try {
    const response = await fetch(`http://localhost:5000/stock/update-stocksistema/${Id_stocksistema}/${Nombre_material}/${Cantidad}/${Estado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Id_stocksistema, Nombre_material, Cantidad, Estado })
    });
    
    if (!response.ok) {
      throw new Error('Error updating stock');
    }
    window.location.reload();
    return response;
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
