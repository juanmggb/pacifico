import axios from "axios";
import {
  GET_PRODUCTOS_REQUEST,
  GET_PRODUCTOS_SUCCESS,
  GET_PRODUCTOS_FAIL,
} from "../constantes/productoConstantes";

export const obtenerProductoAccion = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTOS_REQUEST });

  try {
    const response = await axios.get("http://127.0.0.1:8000/productos/");

    dispatch({ type: GET_PRODUCTOS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTOS_FAIL, payload: error });
  }
};
