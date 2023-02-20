import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { TaskBar } from "../BarraTareas/BarraTareas";
import ListaProductos from "./ListaProductos";
import ClienteVenta from "./ClienteVenta";
import FormularioVentas from "./FormularioVentas";
import VentanaEmergente from "../componentes/VentanaEmergente";
import ResumenVentas from "./ResumenVentas";
import ImprimirTicket from "./ImprimirTicket";
import useTamañoPantalla from "../PaginaRutaRepartidores/UseTamañoPantalla";
import InformacionVenta from "./InformacionVenta";

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
  height: 100vh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 2.5fr 8fr;
  grid-template-rows: 0.5fr 0.8fr 5.7fr 1.5fr;
  grid-template-areas:
    "BarraTareas BarraTareas"
    "PanelControl Encabezado"
    "PanelControl ContenidoPrincipal"
    "Herramientas ContenidoPrincipal";

  @media screen and (max-width: 1200px) {
    grid-template-columns: 2.5fr 8fr;
    grid-template-rows: 0.5fr 0.5fr 7.5fr;
    grid-template-areas:
      "BarraTareas BarraTareas"
      "Encabezado Encabezado"
      "ContenidoPrincipal ContenidoPrincipal";
  }
`;

const Encabezado = styled.div`
  grid-area: Encabezado;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelControl = styled.div`
  position: relative;
  grid-area: PanelControl;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media screen and (max-width: 1200px) {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(220, 220, 220, 0.9);
    top: 7.8%;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    left: 0px;
    transition: 0.3s ease-in all;
    transform: ${(props) =>
      props.estado ? "translate(0%)" : "translate(-180%)"};
    align-items: start;
    padding-top: 5px;
  }
`;

const ContenidoPrincipal = styled.div`
  background: white;
  grid-area: ContenidoPrincipal;
  overflow: auto;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 15px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
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
  @media screen and (max-width: 1200px) {
    position: absolute;
    width: 95%;
    height: 8vh;
    z-index: 1800;
    top: 88vh;
    box-shadow: none;
    transition: 0.3s ease-in all;
    background: none;
    transform: ${(props) =>
      props.estado ? "translate(0%)" : "translate(-180%)"};
  }
`;

const BotonVenta = styled.input`
  width: 75%;
  height: 60%;
  background-color: green;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  &:hover:enabled {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
  }
  &:disabled {
    background-color: #012b00;
  }
  @media screen and (max-width: 1200px) {
    max-width: 150px;
  }
  @media screen and (max-height: 500px) {
    height: 35px;
  }
`;

const BotonPanelMovil = styled.div`
  z-index: 1900;
  display: none;
  background-color: none;
  justify-content: center;
  align-items: center;
  & i {
    color: ${(props) =>
      props.estado ? "rgba(240,0,0,0.85)" : "rgba(10,0,180,0.85)"};
    font-size: ${(props) => (props.alto < 480 ? "35px" : "50px")};
    transform: ${(props) =>
      props.estado
        ? "translate(0,-84vh) rotate(45deg) scale(0.7)"
        : "rotate(0) translate(0)"};
    transition: 0.8s ease all;
  }
  @media screen and (max-width: 1200px) {
    display: inline-block;
    position: fixed;
    height: 50px;
    width: 50px;
    cursor: pointer;
    align-self: end;
    justify-self: end;
    margin: 3px;
  }
`;

function PaginaVentas({ productosIniciales, clientesIniciales }) {
  // Custom Hook para manejar el estado de los productos

  // Se genera una copia de los productos iniciales
  console.log("PRODUCTOS INICIALES 1", productosIniciales);
  const {
    productosSelect,
    productos,
    agregarProducto,
    eliminarProducto,

    agregarCantidad,
    agregarPrecio, // productosSelect
    modificarEstado,
    verificarEstados,
    resetProductos,
  } = useProductos(productosIniciales);

  // Custom Hook para manejar el estado de los clientes
  const {
    clientesSelect,
    cliente,
    seleccionarCliente,
    verificarCliente,
    resetClientes,
  } = useCliente(clientesIniciales);

  // Custom Hook para crear la venta
  const { venta, crearVenta, resetVenta } = useVenta();

  // useEffect para mantener el precio del producto asociado del cliente cuando se elimina un producto
  useEffect(() => {
    if (productosSelect.length && cliente) {
      agregarPrecio(cliente.PRODUCTOS_PRECIOS);
    }
  }, [productos]);

  // Hook para controlar el estado de la ventana emergente
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Hook para controlar el estado de la ventana para imprimir el ticket
  const [imprimirTicket, setImprimirTicket] = useState(false);

  // Variable para activar y desactivar el boton de 'Realizar Operacion'
  const estadoOperacion = activarOperacion(
    verificarEstados(),
    verificarCliente()
  );

  // Funcion para resetear la pagina a su estado inicial
  const reset = () => {
    resetClientes();
    resetProductos();
    resetVenta();
    setImprimirTicket(!imprimirTicket);
  };

  //Hook para desplegar el panel de control en la versión móvil
  const [estadoBotPM, setEstadoBotPM] = useState(false);

  //Hook para usar el tamaño de la pantalla
  const { ancho, alto } = useTamañoPantalla();

  return (
    <Principal>
      {/* BARRA DE NAVEGACION*/}
      <TaskBar />
      {/* ENCABEZADO PARA MOSTRAR AL CLIENTE SELECCIONADO DE LA VENTA*/}
      <Encabezado>
        <ClienteVenta
          cliente={cliente}
          resetClientes={resetClientes}
          resetProductos={resetProductos}
        />
      </Encabezado>
      {/* SECCION CON LOS PRODUCTOS Y CLIENTES SELECCIONADOS PARA LA RUTA */}
      <ContenidoPrincipal>
        <ListaProductos
          productos={productos}
          eliminarProducto={eliminarProducto}
          agregarCantidad={agregarCantidad}
          modificarEstado={modificarEstado}
          cliente={cliente}
        />
      </ContenidoPrincipal>
      {/* PANEL PARA SELECCIONAR EL CLIENTE, PRODUCTOS Y DESCUENTOS DE LA VENTA*/}
      <PanelControl estado={estadoBotPM}>
        <FormularioVentas
          productosSelect={productosSelect}
          agregarProducto={agregarProducto}
          agregarPrecio={agregarPrecio}
          clientesSelect={clientesSelect}
          seleccionarCliente={seleccionarCliente}
          cliente={cliente}
        />
      </PanelControl>
      {/*SECCION DONDE SE ENCUENTRA EL BOTON PARA MOSTRAR LA VENTANA EMERGENTE*/}
      <Herramientas estado={estadoBotPM}>
        <BotonVenta
          disabled={!estadoOperacion}
          value={"Realizar Operacion"}
          type={"submit"}
          onClick={() => setEstadoVentanaEmergente(!estadoVentanaEmergente)}
        />
      </Herramientas>
      {/*VENTANA EMERGENTE CON EL RESUMEN DE LA VENTA*/}
      <VentanaEmergente
        operacion={"Resumen de la venta"}
        desactivarBoton={true}
        estado={estadoVentanaEmergente}
        cambiarEstado={setEstadoVentanaEmergente}
      >
        {/*RESUMEN DE LA CANTIDAD DE PRODUCTOS Y EL MONTO TOTAL DE LA VENTA*/}
        <ResumenVentas cliente={cliente} productos={productos} />
        {/*FORMULARIO PARA AGREGAR INFORMACION ADICIONAL A LA VENTA: DESCUENTO, TIPO_PAGO, OBSERVACIONES*/}
        <InformacionVenta
          activarTicket={setImprimirTicket}
          desactivarVentana={setEstadoVentanaEmergente}
          cliente={cliente}
          productos={productos}
          crearVenta={crearVenta} // cliente, productos, informacionVenta
          enviarVenta={() => console.log("hi")}
        />
      </VentanaEmergente>
      {/*VENTANA EMERGENTE PARA IMPRIMIR EL TICKET DE LA VENTA*/}
      <ImprimirTicket
        estado={imprimirTicket}
        datosVenta={venta}
        reset={reset}
      />
      <BotonPanelMovil
        estado={estadoBotPM}
        onClick={() => setEstadoBotPM(!estadoBotPM)}
        alto={alto}
      >
        <i className="fa-solid fa-circle-plus" />
      </BotonPanelMovil>
    </Principal>
  );
}

/*=======================================================================================================*/
/*===================================== Funciones y Custom Hooks ========================================*/

// Custom Hook para manejar el estado de los productos
const useProductos = (productosIniciales) => {
  const productosState = productosIniciales.map((producto) => ({
    ...producto,
    // Agregar la propiedad de 'CANTIDADSELECCIONADA' y 'ESTADO' a cada producto
    CANTIDADSELECCIONADA: 0,
    ESTADO: false,
  }));

  // Estado de los productos del select
  const [productosSelect, setProductosSelect] = useState(productosState);
  console.log("productosState", productosState);
  console.log("productosSelect", productosSelect);

  // Estado de los productos a renderizar
  const [productos, setProductos] = useState([]);

  //  Agregar el producto seleccionado
  const agregarProducto = (ID) => {
    // Producto seleccionado por el ID
    const nuevoProducto = productosSelect.find(
      (producto) => producto.ID === ID
    );
    // Array de las propiedades de productos a renderizar
    // const productosActualizados = [nuevoProducto, ...productos];

    // Array de las propiedades de los productos disponibles para ser seleccionados
    // const productosActualizadosSelect = productosSelect.filter(
    //   (producto) => producto.ID !== ID
    // );

    // setProductosSelect(productosActualizadosSelect);
    // setProductos(productosActualizados);

    // Puedes usar la función setState en lugar de asignar directamente a las variables, para asegurarte de que los cambios se realizan de manera asíncrona y segura.
    // No usar la variable productosSelect sino prevProductosSelect
    setProductosSelect((prevProductosSelect) =>
      prevProductosSelect.filter((producto) => producto.ID !== ID)
    );
    // No usar la variable productos sino preProductos
    setProductos((prevProductos) => [nuevoProducto, ...prevProductos]);
  };

  // Eliminar producto y devolverlo al formulario
  const eliminarProducto = (ID) => {
    // Producto eliminado por el ID
    const productoEliminado = productosState.find(
      (producto) => producto.ID === ID
    );
    // Array de las propiedades de productos a renderizar
    // const productosActualizados = productos.filter(
    //   (producto) => producto.ID !== ID
    // );

    // Array de las propiedades de los productos disponibles para ser seleccionados
    // const productosActualizadosSelect = [productoEliminado, ...productosSelect];

    // setProductosSelect(productosActualizadosSelect);
    // setProductos(productosActualizados);

    setProductosSelect((prevProductosSelect) => [
      productoEliminado,
      ...prevProductosSelect,
    ]);

    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.ID !== ID)
    );
  };

  const agregarCantidad = (cantidad, ID) => {
    const productoActualizado = productos.find(
      (producto) => producto.ID === ID
    );

    productoActualizado.CANTIDADSELECCIONADA = cantidad;

    setProductos([...productos]);
  };

  const agregarPrecio = (precio) => {
    setProductosSelect((prevProductosSelect) =>
      prevProductosSelect.map((producto) => {
        return { ...producto, PRECIO: precio[producto.NOMBRE] };
      })
    );
  };

  const modificarEstado = (ID) => {
    const productoActualizado = productos.find(
      (producto) => producto.ID === ID
    );
    productoActualizado.ESTADO = !productoActualizado.ESTADO;
    setProductos([...productos]);
  };

  // Funcion para verificar si todos los productos fueron confirmados
  const verificarEstados = () => {
    return productos.length && productos.every((producto) => producto.ESTADO);
  };

  // Funcion para resetear los productos al estado inicial
  const resetProductos = () => {
    setProductos([]);
    setProductosSelect(productosState);
  };

  return {
    productosSelect,
    productos,
    agregarProducto,
    eliminarProducto,
    agregarCantidad,
    agregarPrecio,
    modificarEstado,
    verificarEstados,
    resetProductos,
  };
};

// Custom Hook para manejar el estado de los clientes
const useCliente = (clientesIniciales) => {
  // Estado de los clientes del select
  const [clientesSelect, setClientesSelect] = useState(clientesIniciales);

  // Estado del cliente a renderizar
  const [cliente, setCliente] = useState();

  //  Agregar el cliente seleccionado
  const seleccionarCliente = (ID) => {
    // Cliente seleccionado por el ID
    // const nuevoCliente = clientesSelect.filter(cliente => cliente.ID === ID)[0];
    const nuevoCliente = clientesSelect.find((cliente) => cliente.ID === ID);

    // Array de las propiedades de los clientes disponibles para ser seleccionados
    // const clientesActualizadosSelect = clientesSelect.filter(
    //   (cliente) => cliente.ID !== ID
    // );
    // setClientesSelect(clientesActualizadosSelect);
    setClientesSelect((prevClientesSelect) =>
      prevClientesSelect.filter((cliente) => cliente.ID !== ID)
    );
    setCliente(nuevoCliente);
  };

  // Verificar que hay un cliente seleccionado
  const verificarCliente = () => (cliente ? true : false);

  // Funcion para resetear los clientes al estado inicial
  const resetClientes = () => {
    setClientesSelect(clientesIniciales);
    setCliente();
  };

  return {
    clientesSelect,
    cliente,
    seleccionarCliente,
    verificarCliente,
    resetClientes,
  };
};

// Custom Hook para crear la venta
const useVenta = () => {
  // Hook para manejar el estado de la venta
  const [venta, setVenta] = useState();

  // Funcion para crear el array con los productos de la venta
  const crearProductos = (productos) => {
    const productosVenta = productos.map((producto) => {
      return {
        ID: producto.ID,
        NOMBRE: producto.NOMBRE,
        CANTIDAD: producto.CANTIDADSELECCIONADA,
        PRECIO: producto.PRECIO,
      };
    });

    return productosVenta;
  };

  // Funcion para calcular el subtotal de la venta
  const calcularSubtotal = (productos) => {
    const subtotal = productos.reduce((acumulador, producto) => {
      return acumulador + producto.CANTIDAD * producto.PRECIO;
    }, 0);

    return subtotal.toFixed(2);
  };

  // Funcion para calcular el total de la venta
  const calcularTotal = (productos, servicioExtra, descuento) => {
    const subtotal = calcularSubtotal(productos);

    const total = (subtotal + servicioExtra) * (1 - descuento / 100);

    return total.toFixed(2);
  };

  // // Funcion para calcular la fecha y hora
  // const obtenerFecha = () => {
  //   const datosFecha = new Date();

  //   // Crear el formato de fecha adecuado
  //   const fecha = `${datosFecha.getFullYear()}-${
  //     datosFecha.getMonth() + 1
  //   }-${datosFecha.getDate()}`;

  //   // Crear el formato de la hora
  //   const getTime = (factor) => {
  //     if (factor < 10) {
  //       return "0" + factor;
  //     } else {
  //       return factor;
  //     }
  //   };

  //   // Crear la hora
  //   const hora = `${getTime(datosFecha.getHours())}:${getTime(
  //     datosFecha.getMinutes()
  //   )}`;

  //   return { fecha, hora };
  // };
  const obtenerFecha = () => {
    const datosFecha = new Date();

    // Obtener la fecha y hora en un formato legible
    const fecha = datosFecha.toLocaleDateString();
    const hora = datosFecha.toLocaleTimeString();

    return { fecha, hora };
  };

  // Funcion para crear la venta
  const crearVenta = (cliente, productos, informacionVenta) => {
    // Desestructurar la informacion de la venta
    const { descuento, observaciones, tipoPago, recibido } = informacionVenta;

    // Direccion de la tienda
    const direccion = {
      CALLE: "CULVER CITY",
      NUMERO: "3",
      COLONIA: "BARRIO DE SANTO SANTIAGO",
      MUNICIPIO: "URUAPAN",
      ESTADO: "MICH",
      CP: "60030",
      RFC: "OIGA7111194F1",
    };

    // Obtener los productos de la venta
    // OBTENER LOS IDS DE LOS PRODUCTOS
    const productosVenta = crearProductos(productos);

    // Calcular el subtotal de la venta
    const subtotal = calcularSubtotal(productosVenta);

    // Calcular el monto total de la venta
    const montoTotal = calcularTotal(productosVenta, 0, descuento);

    // Crear la fecha
    const { fecha, hora } = obtenerFecha();

    // Crear el JSON con los datos de la venta
    // ESTE JSON SERA PARA EL TICKET
    const nuevaVenta = {
      CLIENTE: {
        ID: cliente.ID,
        NOMBRE: cliente.NOMBRE,
      },

      FECHA: fecha,
      HORA: hora,
      TIPO_VENTA: "MOSTRADOR",
      REPARTIDOR: {
        NOMBRE: "",
      },

      ATIENDE: {
        NOMBRE: "SARA RODRÍGUEZ",
      },
      TIPO_PAGO: tipoPago,
      STATUS: "PAGADO",
      MONTO_TOTAL: montoTotal,
      OBSERVACIONES: observaciones,

      DESCUENTO: descuento,
      DIRECCION: direccion,

      PRODUCTOS_VENTA: productosVenta,
      RECIBIDO: recibido,
      SERVICIO_EXTRA: 0,
      SUBTOTAL: subtotal,
    };

    setVenta(nuevaVenta);

    // ESTE JSON ES PARA EL BACKEND
    const ventaToBackend = {
      CLIENTE_ID: cliente.ID,
      TIPO_VENTA: "MOSTRADOR",
      REPARTIDOR_ID: 1, // aqui ira la info de la session
      ATIENDE_ID: 2,
      TIPO_PAGO: tipoPago,
      STATUS: "PAGADO",
      MONTO_TOTAL: montoTotal,
      OBSERVACIONES: observaciones,
    };
    console.log(ventaToBackend);
    console.log("ENVIANDO VENTA AL BAKCEND");

    const enviarVenta = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/ventas/",
        ventaToBackend
      );

      console.log("RESPUESTA DEL BACKEND", response.data);
    };

    enviarVenta();
  };

  // Resetear la venta
  const resetVenta = () => {
    setVenta();
  };

  return {
    venta,
    crearVenta,
    resetVenta,
  };
};

// Funcion para activar el boton de realizar operacion
const activarOperacion = (estadoProductos, estadoCliente) => {
  return estadoProductos && estadoCliente;
};

export default PaginaVentas;
