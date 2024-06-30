import axios from "axios";

// Función encargada de agregar un nuevo stock
export const addStock = async (stockData) => {
  console.log(stockData);
  const body =  {
    Nombre_material: stockData.Nombre_material,
    Cantidad: stockData.Cantidad,
    Estado: stockData.Estado
}
  try {
    const response = await axios.post('http://localhost:5000/stock/add-stocksistema',body);
    console.log(response.data);
    return response.data; // Retorna los datos recibidos desde la API después de agregar el stock
  } catch (error) {
    console.error('Error al agregar el stock:', error);
    throw error; // Propaga el error para ser manejado en un nivel superior
  }
};
