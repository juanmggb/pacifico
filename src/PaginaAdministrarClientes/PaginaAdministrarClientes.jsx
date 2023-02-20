import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { TaskBar } from "../BarraTareas/BarraTareas";
import VentanaEmergente from "../componentes/VentanaEmergente";
import FormularioInformacionCliente from "./FormularioInformacionCliente";
import FormularioPreciosCliente from "./FormularioPreciosCliente";
import SeleccionadorFormulario from "./SeleccionadorFormulario";
import SeleccionarCliente from "./SeleccionarCliente";
import Resumen from "../componentes/Resumen";

/*====================================== Estilos CSS del componente ==========================================================*/

const Principal = styled.div`
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );
  color: black;
  font-weight: 400;
  border-radius: 0px;
  width: 100vw;
  height: 100svh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 2.5fr 8fr;
  grid-template-rows: 0.5fr 6.5fr 1.5fr;
  grid-template-areas:
    "BarraTareas BarraTareas"
    "PanelControl ContenidoPrincipal"
    "Herramientas ContenidoPrincipal";

  @media screen and (max-width: 900px) {
    grid-template-rows: 0.5fr 6fr 2fr;
  }
`;

const PanelControl = styled.div`
  position: relative;
  grid-area: PanelControl;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "Seleccionador"
    "Opciones";
  align-items: center;
  justify-items: center;
`;

const ContenidoPrincipal = styled.div`
  grid-area: ContenidoPrincipal;
  position: relative;

  display: flex;
  flex-direction: column;

  background: white;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Herramientas = styled.div`
  background: #ffffff;
  color: black;
  grid-area: Herramientas;
  padding: 15px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotonOperacion = styled.input`
  width: 60%;
  height: 60%;
  background-color: green;
  color: white;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  border: none;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover:enabled {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
  }

  &:disabled {
    background-color: #012b00;
  }

  @media screen and (max-width: 900px) {
    width: 80%;
    height: 70%;
  }
`;

// Crear los campos de los resumenes

const camposInformacion = {
  NOMBRE: "Cliente:",
  CONTACTO: "Contacto:",
  TIPO_PAGO: "Tipo de pago:",
  CORREO: "Correo:",
  TELEFONO: "Telefono:",
};

const camposDireccion = {
  CALLE: "Calle:",
  NUMERO: "Numero:",
  COLONIA: "Colonia:",
  MUNICIPIO: "Municipio:",
  CIUDAD: "Ciudad",
  CP: "C.P:",
};

/*======================================================================================================*/
/*================================= Funciona JSX del componente ========================================*/

function PaginaAdministrarClientes({ clientesIniciales }) {
  console.log("clientesIniciales", clientesIniciales[0].PRODUCTOS_PRECIOS);

  // Custom Hook para manejar el estado del cliente
  const {
    cliente,
    precios,
    informacion,
    direccion,
    clienteSeleccionado,
    preciosDefault,
    agregarInformacion,
    agregarDireccion,
    agregarPrecios,
    agregarCliente,
    seleccionarCliente,
    resetCliente,
  } = useCliente(clientesIniciales);

  // Hook para controlar el estado de la ventana emergente
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Hook para controlar el estado del formulario seleccionado
  const [formulario, setFormulario] = useState({
    opcion: 0,
    titulo: "Agregar cliente a la base de datos",
  });

  // Referencia para enviar la informacion de los dos formularios a la vez
  const submitPrecio = useRef();
  const submitInformacion = useRef();

  // Funcion para desactivar el seleccionador de clientes
  const desactivarClientes = () => {
    return formulario.opcion === 0;
  };

  // Generar el cliente y activar la ventana emergente
  useEffect(() => {
    if (informacion && direccion && precios) {
      agregarCliente(informacion, direccion, precios);
      setEstadoVentanaEmergente(true);
    }
  }, [informacion, direccion, precios]);

  // Reset function para regresar al estado inicial la página después de realizar la operacion
  const reset = () => {
    resetCliente();
  };

  const camposProductos = crearCamposProductos(
    clientesIniciales[0].PRODUCTOS_PRECIOS
  );

  return (
    <Principal>
      {/* BARRA DE NAVEGACION*/}
      <TaskBar />
      {/* SECCION CON LOS DIFERENTES FORMULARIOS PARA AGREGAR, MODIFICAR Y AGREGAR */}
      <ContenidoPrincipal>
        <FormularioInformacionCliente
          datosCliente={clienteSeleccionado}
          opcion={formulario.opcion}
          submitRef={submitInformacion}
          agregarInformacion={agregarInformacion}
          agregarDireccion={agregarDireccion}
        />
        <FormularioPreciosCliente
          datosCliente={clienteSeleccionado}
          preciosDefault={preciosDefault}
          opcion={formulario.opcion}
          submitRef={submitPrecio}
          agregarPrecios={agregarPrecios}
        />
      </ContenidoPrincipal>
      {/* PANEL PARA SELECCIONAR LOS DIFERENTES TIPOS DE MENU*/}
      <PanelControl>
        <SeleccionadorFormulario
          setFormulario={setFormulario}
          resetCliente={resetCliente}
        />
        <SeleccionarCliente
          listaItems={clientesIniciales}
          seleccionar={seleccionarCliente}
          desactivar={desactivarClientes()}
        />
      </PanelControl>
      {/*SECCION DONDE SE ENCUENTRA EL BOTON PARA MOSTRAR LA VENTANA EMERGENTE*/}
      <Herramientas>
        <BotonOperacion
          type="submit"
          value="Realizar Operacion"
          onClick={() => {
            submitPrecio.current.click();
            submitInformacion.current.click();
          }}
        />
      </Herramientas>
      {/*VENTANA EMERGENTE PARA MOSTRAR EL RESUMEN DE LA OPERACION*/}
      <VentanaEmergente
        operacion={formulario.titulo}
        estado={estadoVentanaEmergente}
        cambiarEstado={setEstadoVentanaEmergente}
        reset={reset}
      >
        <Resumen
          key={"Informacion"}
          datos={informacion}
          listaCampos={camposInformacion}
          encabezado={"Informacion del cliente"}
        />
        <Resumen
          key={"Direccion"}
          datos={direccion}
          listaCampos={camposDireccion}
          encabezado={"Direccion del cliente"}
        />
        <Resumen
          key={"Precios"}
          datos={precios}
          listaCampos={camposProductos}
          encabezado={"Precios del cliente"}
        />
      </VentanaEmergente>
    </Principal>
  );
}

/*=======================================================================================================*/
/*===================================== Funciones y Custom Hooks ========================================*/

// Custom Hook para manejar el estado del cliente

const useCliente = (clientesIniciales) => {
  // Obtener los precios por defecto
  const preciosDefault = clientesIniciales.find(
    (cliente) => cliente.NOMBRE === "MOSTRADOR"
  ).PRODUCTOS_PRECIOS;

  // Estado del cliente para almacenar la informacion del formulario
  const [cliente, setCliente] = useState();

  // Estado para almacenar el precio del cliente
  const [precios, setPrecios] = useState();

  // Estado para almacenar los datos del cliente
  const [informacion, setInformacion] = useState();

  // Estado para almacenar la direccion del cliente
  const [direccion, setDireccion] = useState();

  // Estado para almacenar el objeto del cliente a ser modificado o eliminado
  const [clienteSeleccionado, setClienteSeleccionado] = useState();

  // Funcion para agregar los datos del cliente
  const agregarInformacion = (informacion) => {
    setInformacion(informacion);
  };

  // Funcion para agregar los datos del cliente
  const agregarDireccion = (direccion) => {
    setDireccion(direccion);
  };

  // Funcion para agregar la propiedad 'PRECIO' con el array de precios de cada producto
  const agregarPrecios = (listaPrecios) => {
    setPrecios(listaPrecios);
  };

  // Funcion para agregar la informacion de los dos formularios al nuevo cliente
  const agregarCliente = (informacion, direccion, precios) => {
    const nuevoCliente = {
      ...informacion,
      DIRECCION: direccion,
      PRODUCTOS_PRECIOS: precios,
    };

    setCliente(nuevoCliente);
  };

  // Funcion para agregar el cliente seleccionado de las opciones del Select;
  const seleccionarCliente = (NOMBRE) => {
    // Cliente seleccionado
    const cliente = clientesIniciales.filter(
      (cliente) => cliente.NOMBRE === NOMBRE
    )[0];

    setClienteSeleccionado(cliente);
  };

  // Funcion para resetear el cliente al estado inicial
  const resetCliente = () => {
    setCliente();
    setInformacion();
    setDireccion();
    setPrecios();
    setClienteSeleccionado();
  };

  return {
    cliente,
    precios,
    informacion,
    direccion,
    clienteSeleccionado,
    preciosDefault,
    agregarInformacion,
    agregarDireccion,
    agregarPrecios,
    agregarCliente,
    seleccionarCliente,
    resetCliente,
  };
};

// Crear los campos a partir de los nombres de los productos

const crearCamposProductos = (productos) => {
  const listaProductos = Object.keys(productos);
  const objetoProductos = { ...productos };

  listaProductos.map((producto) => {
    objetoProductos[producto] = producto;
  });

  return objetoProductos;
};

export default PaginaAdministrarClientes;
