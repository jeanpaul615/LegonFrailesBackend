
import axios from 'axios';

export const UpdateRegistros = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/devolucion/update-devolucion', formData);
      return response;
    } catch (err) {
      console.error("error al actualizar",err)
    }
  };