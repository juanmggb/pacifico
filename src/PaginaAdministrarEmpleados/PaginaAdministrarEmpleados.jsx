import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { TaskBar } from "../BarraTareas/BarraTareas";
import VentanaEmergente from "../componentes/VentanaEmergente";
import FormularioInformacionEmpleado from "./FormularioInformacionEmpleado";
import SeleccionadorFormulario from "./SeleccionadorFormulario";
import SeleccionarEmpleado from "./SeleccionarEmpleado";
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

// Lista de campos
const camposInformacion = {
  NOMBRE: "Nombre:",
  PUESTO: "Puesto:",
  TIPO_EMPLEO: "Tipo de empleo:",
  ACCESO_SISTEMA: "Acceso al sistema:",
  FECHA_INGRESO: "Fecha de ingreso:",
  TELEFONO: "Telefono:",
  MOVIL: "Movil:",
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

function PaginaAdministrarEmpleados({ empleadosIniciales }) {
  // Custom Hook para manejar el estado del cliente
  const {
    empleado,
    informacion,
    direccion,
    empleadoSeleccionado,
    agregarEmpleado,
    agregarDireccion,
    agregarInformacion,
    seleccionarEmpleado,
    resetEmpleado,
  } = useEmpleado(empleadosIniciales);

  // Hook para controlar el estado de la ventana emergente
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Hook para controlar el estado del formulario seleccionado
  const [formulario, setFormulario] = useState({
    opcion: 0,
    titulo: "Agregar empleado a la base de datos",
  });

  // Referencia para enviar la informacion de los dos formularios a la vez
  const submitInformacion = useRef();

  // Funcion para desactivar el seleccionador de empleados
  const desactivarEmpleados = () => {
    return formulario.opcion === 0;
  };

  // Generar el empleado y activar la ventana emergente
  useEffect(() => {
    if (informacion && direccion) {
      agregarEmpleado(informacion, direccion);
      setEstadoVentanaEmergente(true);
    }
  }, [informacion, direccion]);

  // Reset function para regresar al estado inicial la página después de realizar la operacion
  const reset = () => {
    resetEmpleado();
  };

  return (
    <Principal>
      {/* BARRA DE NAVEGACION*/}
      <TaskBar />
      {/* SECCION CON LOS DIFERENTES FORMULARIOS PARA AGREGAR, MODIFICAR Y AGREGAR */}
      <ContenidoPrincipal>
        <FormularioInformacionEmpleado
          datosEmpleado={empleadoSeleccionado}
          opcion={formulario.opcion}
          submitRef={submitInformacion}
          agregarDireccion={agregarDireccion}
          agregarInformacion={agregarInformacion}
        />
      </ContenidoPrincipal>
      {/* PANEL PARA SELECCIONAR LOS DIFERENTES TIPOS DE MENU*/}
      <PanelControl>
        <SeleccionadorFormulario
          setFormulario={setFormulario}
          resetEmpleado={resetEmpleado}
        />
        <SeleccionarEmpleado
          listaItems={empleadosIniciales}
          seleccionar={seleccionarEmpleado}
          desactivar={desactivarEmpleados()}
        />
      </PanelControl>
      {/*SECCION DONDE SE ENCUENTRA EL BOTON PARA MOSTRAR LA VENTANA EMERGENTE*/}
      <Herramientas>
        <BotonOperacion
          type="submit"
          value="Realizar Operacion"
          onClick={() => {
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
          encabezado={"Datos del empleado"}
        />
        <Resumen
          key={"Direccion"}
          datos={direccion}
          listaCampos={camposDireccion}
          encabezado={"Direccion del empleado"}
        />
      </VentanaEmergente>
    </Principal>
  );
}

/*=======================================================================================================*/
/*===================================== Funciones y Custom Hooks ========================================*/

// Custom Hook para manejar el estado del empleado

const useEmpleado = (empleadosIniciales) => {
  // Estado del empleado para almacenar la informacion del formulario
  const [empleado, setEmpleado] = useState();

  // Estado para almacenar los datos del empleado
  const [informacion, setInformacion] = useState();

  // Estado para almacenar la direccion del empleado
  const [direccion, setDireccion] = useState();

  // Estado para almacenar el objeto del empleado a ser modificado o eliminado
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();

  // Funcion para agregar los datos del empleado
  const agregarInformacion = (informacion) => {
    setInformacion(informacion);
  };

  // Funcion para agregar los datos del empleado
  const agregarDireccion = (direccion) => {
    setDireccion(direccion);
  };

  // Funcion para agregar la informacion de los dos formularios al nuevo empleado
  const agregarEmpleado = (informacion, direccion) => {
    const nuevoEmpleado = { ...informacion, DIRECCION: direccion };
    setEmpleado(nuevoEmpleado);
  };

  // Funcion para agregar el empleado seleccionado de las opciones del Select;
  const seleccionarEmpleado = (NOMBRE) => {
    // Empleado seleccionado
    const empleado = empleadosIniciales.filter(
      (empleado) => empleado.NOMBRE === NOMBRE
    )[0];

    setEmpleadoSeleccionado(empleado);
  };

  // Funcion para resetear el empleado al estado inicial
  const resetEmpleado = () => {
    setEmpleado();
    setDireccion();
    setInformacion();
    setEmpleadoSeleccionado();
  };

  return {
    empleado,
    informacion,
    direccion,
    empleadoSeleccionado,
    agregarEmpleado,
    agregarInformacion,
    agregarDireccion,
    seleccionarEmpleado,
    resetEmpleado,
  };
};

export default PaginaAdministrarEmpleados;
