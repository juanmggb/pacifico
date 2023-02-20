import axios from "axios";
import {
  GET_CLIENTES_REQUEST,
  GET_CLIENTES_SUCCESS,
  GET_CLIENTES_FAIL,
} from "../constantes/clienteConstantes";

export const obtenerClientesAccion = () => async (dispatch) => {
  dispatch({ type: GET_CLIENTES_REQUEST });

  try {
    const response = await axios.get("http://127.0.0.1:8000/clientes/");

    const clientesFromBackend = response.data.map((cliente) => {
      cliente.DIRECCION = {
        CALLE: "CALZ. LA HUERTA",
        NUMERO: 729,
        COLONIA: " MORELOS ",
        CIUDAD: " MORELIA ",
        MUNICIPIO: "URUAPAN",
        CP: 580300,
      };
      cliente.PRODUCTOS_PRECIOS = {
        "Bolsa de 5kg": 360.0,
        "Costal de 15kg gourmet": 355.0,
        "Bolsa de 5kg gourmet": 350.0,
        "Bolsa de 2kg": 345.0,
        "Costal de 15kg": 340.0,
        "Barra de 75kg": 335.0,
        "Costal de 35kg": 330.0,
        "Barra de 50kg": 325.0,
        "Bolsa de 3kg": 320.0,
      };

      return cliente;
    });

    dispatch({ type: GET_CLIENTES_SUCCESS, payload: clientesFromBackend });
  } catch (error) {
    dispatch({ type: GET_CLIENTES_FAIL, payload: error });
  }
};
