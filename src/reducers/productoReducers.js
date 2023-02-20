import {
  GET_PRODUCTOS_REQUEST,
  GET_PRODUCTOS_SUCCESS,
  GET_PRODUCTOS_FAIL,
} from "../constantes/productoConstantes";

export const obtenerProductosReducer = (
  state = { productosLista: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTOS_REQUEST:
      return { productosLista: [], loading: true };

    case GET_PRODUCTOS_SUCCESS:
      return { productosLista: action.payload, loading: false };

    case GET_PRODUCTOS_FAIL:
      return { productosLista: [], error: action.payload, loading: true };

    default:
      return state;
  }
};
