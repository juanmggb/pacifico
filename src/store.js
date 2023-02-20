import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { obtenerProductosReducer } from "./reducers/productoReducers";
import { obtenerClientesReducer } from "./reducers/clienteReducers";

const reducer = combineReducers({
  productosEstado: obtenerProductosReducer,
  clientesEstado: obtenerClientesReducer,
});

const initialState = {};

// This is an array. Here he uses only one value
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
