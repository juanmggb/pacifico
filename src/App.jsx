import { Routes, Route } from "react-router-dom";
import axios from "axios";
import PaginaInicioSesion from "./PaginaInicioSesion/PaginaInicioSesion";

import PaginaVentas from "./PaginaVentas/PaginaVentas";
import PaginaSalidaRuta from "./PaginaSalidaRuta/PaginaSalidaRuta";
import { PaginaRutaRepartidores } from "./PaginaRutaRepartidores/PaginaRutaRepartidores";

import PaginaInventario from "./PaginaInventario/PaginaInventario";
import PaginaAdministrarClientes from "./PaginaAdministrarClientes/PaginaAdministrarClientes";
import PaginaAdministrarEmpleados from "./PaginaAdministrarEmpleados/PaginaAdministrarEmpleados";

import PaginaListaVentas from "./PaginaListaVentas/PaginaListaVentas";
import PaginaListaProductos from "./PaginaListaProductos/PaginaListaProductos";
import PaginaListaClientes from "./PaginaListaClientes/PaginaListaClientes";
import PaginaListaEmpleados from "./PaginaListaEmpleados/PaginaListaEmpleados";

import { ventas } from "./ventas";
import { clientes } from "./clientes";
import { empleados } from "./empleados";
import { productos as data } from "./productos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { obtenerProductoAccion } from "./acciones/productoAccion";
import { obtenerClientesAccion } from "./acciones/clienteAccion";

function App() {
  const dispatch = useDispatch();

  const productosEstado = useSelector((state) => state.productosEstado);
  const {
    productosLista: productos,
    error: productoError,
    loading: productoLoading,
  } = productosEstado;
  const clientesEstado = useSelector((state) => state.clientesEstado);
  const {
    clientesLista: clientes,
    error: clienteError,
    loading: clienteLoading,
  } = clientesEstado;

  useEffect(() => {
    dispatch(obtenerProductoAccion());
    dispatch(obtenerClientesAccion());
    
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<PaginaInicioSesion />} />

      <Route
        path="ventas"
        element={
          <PaginaVentas
            clientesIniciales={clientes}
            productosIniciales={productos}
          />
        }
      />
      <Route
        path="clientes"
        element={<PaginaAdministrarClientes clientesIniciales={clientes} />}
      />
      <Route
        path="empleados"
        element={<PaginaAdministrarEmpleados empleadosIniciales={empleados} />}
      />
      <Route
        path="productos"
        element={<PaginaInventario productosIniciales={productos} />}
      />
      <Route
        path="adminruta"
        element={
          <PaginaSalidaRuta
            productosIniciales={productos}
            empleadosIniciales={empleados}
            clientesIniciales={clientes}
          />
        }
      />
      <Route
        path="ruta"
        element={
          <PaginaRutaRepartidores
            productosIniciales={productos}
            empleadosIniciales={empleados}
            clientesIniciales={clientes}
          />
        }
      />
      <Route
        path="listaventas"
        element={<PaginaListaVentas ventasIniciales={ventas} />}
      />
      <Route
        path="listaproductos"
        element={<PaginaListaProductos productosIniciales={productos} />}
      />
      <Route
        path="listaclientes"
        element={<PaginaListaClientes clientesIniciales={clientes} />}
      />
      <Route
        path="listaempleados"
        element={<PaginaListaEmpleados empleadosIniciales={empleados} />}
      />
    </Routes>
  );
}

export default App;
