import {
  GET_CLIENTES_REQUEST,
  GET_CLIENTES_SUCCESS,
  GET_CLIENTES_FAIL,
} from "../constantes/clienteConstantes";

export const obtenerClientesReducer = (
  state = { clientesLista: [] },
  action
) => {
  switch (action.type) {
    case GET_CLIENTES_REQUEST:
      return { clientesLista: [], loading: true };
    case GET_CLIENTES_SUCCESS:
      return { clientesLista: action.payload, loading: false };

    case GET_CLIENTES_FAIL:
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};
