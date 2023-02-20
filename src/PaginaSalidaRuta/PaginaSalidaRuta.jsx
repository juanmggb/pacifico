import React, { useState } from 'react';
import styled from 'styled-components';

// Importar los componentes
import { TaskBar } from '../BarraTareas/BarraTareas';
import ListaProductosRuta from './ListaProductosRuta';
import ListaClientesRuta from './ListaClientesRuta';
import VendedorRuta from './VendedorRuta';
import FormularioSalidaRuta from './FormularioSalidaRuta';
import VentanaEmergente from '../componentes/VentanaEmergente';
import ResumenSalidaRuta from './ResumenSalidaRuta';
import ImprimirTicket from './ImprimirTicket';

/*================================ Estilos CSS ============================================*/
/*=========================================================================================*/
const Principal = styled.div`
  background: linear-gradient(rgb(54, 54, 82), 15%,rgb(84, 106, 144), 60%, rgb(68, 111, 151));
  color: black;
  font-weight: 400;
  border-radius: 0px;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 2fr 5fr 4fr;
  grid-template-rows: 0.5fr 0.8fr 5.7fr 1.5fr;
  grid-template-areas: 'BarraTareas BarraTareas BarraTareas'
                       'PanelControl Encabezado Encabezado'
                       'PanelControl SeccionProductosRuta SeccionClientesRuta'
                       'Herramientas SeccionProductosRuta SeccionClientesRuta';
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
  grid-area: PanelControl;
  background-color: transparent;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 25px 5px 25px 5px;
`;

const Herramientas = styled.div`
  grid-area: Herramientas;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
`;

const SeccionProductosRuta = styled.div`
  grid-area: SeccionProductosRuta;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  overflow: auto;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const SeccionClientesRuta = styled.div`
  grid-area: SeccionClientesRuta;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 1px 5px 5px 2px rgba(0, 0, 0, 0.5);
  overflow: auto;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const BotonOperacion = styled.input`
  width: 60%;
  height: 40px;
  background-color: green;
  color: white;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  border: none;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  user-select: none;
&:hover:enabled {
  background-color: #00a100;
  box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
  cursor: pointer;
}
&:disabled {
  background-color: #012b00;
}
`;
/*=========================================================================================*/
/*====================== Funcion JSX del componente PaginaSalidaRuta ======================*/
function PaginaSalidaRuta ({productosIniciales,  empleadosIniciales, clientesIniciales}) {
 
  //Custom Hook para manejar el estado de los productos
  const {
    productosSelect,
    productos,
    agregarProducto,
    eliminarProducto,
    agregarCantidad,
    modificarEstado,
    verificarEstados,
    resetProductos
  } = useProductos(productosIniciales);

  //Custom Hook para manejar el estado de los clientes
  const {
    clientesSelect,
    clientes,
    agregarCliente,
    eliminarCliente,
    resetClientes
  } = useClientes(clientesIniciales);

  //Custom Hook para manejar el estado del vendedor
  const {
    vendedoresSelect,
    vendedor,
    seleccionarVendedor,
    eliminarVendedor,
    verificarVendedor,
    resetVendedores
  } = useVendedor(empleadosIniciales);

  //Custom Hook para manejar el estado de la rusta
  const {
    ruta,
    generarRuta,
    resetRuta
  } = useSalidaRuta();

  // Hook para controlar el estado de la ventana emergente
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Variable para activar y desactivar el boton de 'Realizar Operacion'
  const estadoOperacion = activarOperacion(verificarEstados(), verificarVendedor());

  // Hook para controlar el estado de la ventana para imprimir el ticket
  const [imprimirTicket, setImprimirTicket] = useState(false);
 
  // Funcion para imprimir el ticket al cerrar la ventana del resumen
  const activarImprimir = () => {
    setImprimirTicket(!imprimirTicket);
    generarRuta(vendedor, productos, clientes);
  };

  // Funcion reset para todos los hooks
  const reset = () => {
    resetProductos();
    resetClientes();
    resetVendedores();
    setImprimirTicket(!imprimirTicket);
  };


  return(
    <Principal>
      {/* BARRA DE NAVEAGACION */}
      <TaskBar/>
      {/* ENCABEZADO PARA MOSTRAR EL VENDEDOR ENCARGADO DE LA RUTA*/}
      <Encabezado>
        <VendedorRuta vendedor={vendedor} eliminarVendedor={eliminarVendedor}/>
      </Encabezado>
      {/* SECCION CON LOS PRODUCTOS Y CLIENTES SELECCIONADOS PARA LA RUTA */}

        {/* SECCION DE LOS PRODUCTOS DE LA RUTA */}
        <SeccionProductosRuta>
          <ListaProductosRuta 
            productos={productos} 
            eliminarProducto={eliminarProducto} 
            agregarCantidad={agregarCantidad}
            modificarEstado={modificarEstado}/>
        </SeccionProductosRuta>
        {/* SECCION DE LOS CLIENTES DE LA RUTA*/}
        <SeccionClientesRuta>
          <ListaClientesRuta 
            clientes={clientes} 
            eliminarCliente={eliminarCliente}/>
        </SeccionClientesRuta>
  
      {/* PANEL PARA SELECCIONAR EL VENDEDOR, CLIENTE Y RUTA*/}
      <PanelControl>
        <FormularioSalidaRuta 
          productosSelect = {productosSelect} 
          agregarProducto={agregarProducto}
          clientesSelect={clientesSelect}
          agregarCliente={agregarCliente}
          vendedoresSelect={vendedoresSelect}
          seleccionarVendedor={seleccionarVendedor}
          vendedor={vendedor}/>
      </PanelControl>
      {/*SECCION DONDE SE ENCUENTRA EL BOTON PARA MOSTRAR LA VENTANA EMERGENTE*/}
      <Herramientas>
        <BotonOperacion
        disabled = {!estadoOperacion}
          value = {'Realizar Operacion'}
          type = {'submit'}
          onClick = {() => setEstadoVentanaEmergente(!estadoVentanaEmergente)}/>
      </Herramientas>
      {/*VENTANA EMERGENTE CON EL RESUMEN DE LA VENTA*/}
      <VentanaEmergente
        operacion = {'Resumen de la salida a ruta'}
        estado = {estadoVentanaEmergente}
        cambiarEstado = {setEstadoVentanaEmergente}
        reset = {activarImprimir}>
          {/*RESUMEN DE LA SALIDA A RUTA CON EL NOMBRE DEL EMPLEADO, LA CANTIDAD DE PRODUCTOS Y LOS CLIENTES*/}
          <ResumenSalidaRuta 
            vendedor={vendedor} 
            productos={productos}  
            clientes={clientes}/>
      </VentanaEmergente>
      {/*VENTANA EMERGENTE PARA IMPRIMIR EL TICKET DE LA SALIDA A RUTA*/}
      <ImprimirTicket 
        estado = {imprimirTicket}
        datosSalidaRuta = {ruta}
        reset = {reset}/>
    </Principal>
  )
}


/*============================================================================================================*/
/*============================================== Funciones y Custom Hooks ===================================================*/

// Custom Hook para manejar el estado de los productos
const useProductos = productosIniciales => {
  
  let productosState = [...productosIniciales];

  // Agregar la propiedad de 'CANTIDADSELECCIONADA' y 'ESTADO' a cada producto
  productosState = productosState.map(producto => {
    producto.CANTIDADSELECCIONADA = 0;
    producto.ESTADO = false;

    return producto;
  });

  // Estado de los productos del select
  const [productosSelect, setProductosSelect] = useState(productosState);
  
  // Estado de los productos a renderizar
  const [productos, setProductos] = useState([]);
   
  //  Agregar el producto seleccionado
  const agregarProducto = ID => {
    // Producto seleccionado por el ID
    const nuevoProducto = productosSelect.filter(producto => producto.ID === ID)[0];
    // Array de las propiedades de productos a renderizar
    const productosActualizados = [nuevoProducto, ...productos];
    // Array de las propiedades de los productos disponibles para ser seleccionados
    const productosActualizadosSelect = productosSelect.filter(producto => producto.ID !== ID);

    setProductosSelect(productosActualizadosSelect);
    setProductos(productosActualizados);
  };

  
  // Eliminar producto y devolverlo al formulario
  const eliminarProducto = ID => {
     // Producto eliminado por el ID
    const productoEliminado = productosState.filter(producto => producto.ID === ID)[0];
    // Array de las propiedades de productos a renderizar
    const productosActualizados = productos.filter(producto => producto.ID !== ID);
    // Array de las propiedades de los productos disponibles para ser seleccionados
    const productosActualizadosSelect = [productoEliminado, ...productosSelect];

    setProductosSelect(productosActualizadosSelect);
    setProductos(productosActualizados);
  };

  // Actualizar la 'CANTIDADSELECCIONADA' de producto al confirmar producto
  const agregarCantidad = (cantidad, ID) => {

    // Modificar la propiedad 'CANTIDADSELECCIONADA' del producto con ID === productoID
    const productosActualizados = productos.map(producto => {
      if(producto.ID === ID){
        return{...producto, CANTIDADSELECCIONADA: cantidad}
      }
      return producto
    });

    setProductos(productosActualizados);
  };

  //Modificar el valor de la propiedad 'ESTADO' al dar click a los botones de confirmar y modificar

  const modificarEstado = ID => {

    //Modificar la propiedad 'ESTADO'
    const productosActualizados  = productos.map(producto => {
      if(producto.ID === ID){
        return {...producto, ESTADO: !producto.ESTADO};
      }
      return producto
    });

    setProductos(productosActualizados);
  };

  // Funcion para verificar si todos los productos fueron confirmados

  const verificarEstados = () => {

    if(!productos.length) return false;

    const estados = productos.filter(producto => producto.ESTADO === false);
    if(estados.length) return false;

    return true;
  };

  // Funcion para resetear los productos al estado inicial
  const resetProductos = () => {
    setProductos([]);
    setProductosSelect(productosState);
  };


  return {productosSelect, 
          productos,  
          agregarProducto,
          eliminarProducto,
          agregarCantidad,
          modificarEstado,
          verificarEstados,
          resetProductos};
};

// Custom Hook para manejar el estado de los clientes
const useClientes = clientesIniciales => {
  
  // Estado de los clientes del select
  const [clientesSelect, setClientesSelect] = useState(clientesIniciales);
  
  // Estado de los clientes a renderizar
  const [clientes, setClientes] = useState([]);
  
  //  Agregar el cliente seleccionado
  const agregarCliente = ID => {
    // Cliente seleccionado por el ID
    const nuevoCliente = clientesSelect.filter(cliente => cliente.ID === ID)[0];
    // Array de las propiedades de clientes a renderizar
    const clientesActualizados = [nuevoCliente, ...clientes];
    // Array de las propiedades de los clientes disponibles para ser seleccionados
    const clientesActualizadosSelect = clientesSelect.filter(cliente => cliente.ID !== ID);

    setClientesSelect(clientesActualizadosSelect);
    setClientes(clientesActualizados);
  };

  
  // Eliminar cliente y devolverlo al formulario
  const eliminarCliente = ID => {
     // Cliente eliminado por el ID
    const clienteEliminado = clientesIniciales.filter(cliente => cliente.ID === ID)[0];
    // Array de las propiedades de clientes a renderizar
    const clientesActualizados = clientes.filter(cliente => cliente.ID !== ID);
    // Array de las propiedades de los clientes disponibles para ser seleccionados
    const clientesActualizadosSelect = [clienteEliminado, ...clientesSelect];

    setClientesSelect(clientesActualizadosSelect);
    setClientes(clientesActualizados);
  };

  // Funcion para resetear losclientes al estado inicial
  const resetClientes = () => {
    setClientes([]);
    setClientesSelect(clientesIniciales);
  };

  return {clientesSelect, 
          clientes,  
          agregarCliente,
          eliminarCliente,
          resetClientes};
};

// Custom Hook para manejar el estado de los vendedores
const useVendedor = vendedoresIniciales => {
  
  // Estado de los vendedores del select
  const [vendedoresSelect, setVendedoresSelect] = useState(vendedoresIniciales);
  
  // Estado del vendedor a renderizar
  const [vendedor, setVendedor] = useState();
  
  //  Agregar el vendedor seleccionado
  const seleccionarVendedor = ID => {
    // Vendedor seleccionado por el ID
    const nuevoVendedor = vendedoresSelect.filter(vendedor => vendedor.ID === ID)[0];
  
    // Array de las propiedades de los vendedores disponibles para ser seleccionados
    const vendedoresActualizadosSelect = vendedoresSelect.filter(vendedor => vendedor.ID !== ID);

    setVendedoresSelect(vendedoresActualizadosSelect);
    setVendedor(nuevoVendedor);
  };

  
  // Eliminar vendedor y devolverlo al formulario
  const eliminarVendedor = () => {
    setVendedoresSelect(vendedoresIniciales);
    setVendedor();
  };

  // Verificar que hay un vendedor seleccionado
  const verificarVendedor = () => {
    // Si ya se seleccionó un vendedor devolver true
    if(vendedor) return true
    // Caso contrario false
    return false
  };

  // Funcion para resetear los vendedores al estado inicial
  const resetVendedores = () => {
    setVendedoresSelect(vendedoresIniciales);
    setVendedor();
  };

  return {vendedoresSelect, 
          vendedor,  
          seleccionarVendedor,
          eliminarVendedor,
          verificarVendedor,
          resetVendedores};
};

// Custom Hook para generar la salida a ruta
const useSalidaRuta = () =>{

  // Hook para manejar el estado de la salida a ruta
  const [ruta, setRuta] = useState();

  // Funcion para crear el array de los clientes de la ruta
  const crearClientes = clientes => {

    if(clientes.length > 0){
      const clientesRuta = clientes.map(cliente => {
        return {ID: cliente.ID, 
                NOMBRE: cliente.NOMBRE}
    });
    return clientesRuta;
    }

    return 'Sin clientes';
  };

  // Funcion para crear el array con los productos de la ruta
  const crearProductos = (productos) => {

    const productosRuta = productos.map(producto => {
      return {ID: producto.ID,
              CLAVE: producto.NOMBRE, 
              NOMBRE: producto.NOMBRE, 
              CANTIDAD: producto.CANTIDADSELECCIONADA}
    });

    return productosRuta;
  };

  // Funcion para calcular la fecha y hora 
  const obtenerFecha = () => {

    const datosFecha = new Date();
    
    // Crear el formato de fecha adecuado
    const fecha = `${datosFecha.getFullYear()}-${datosFecha.getMonth() + 1}-${datosFecha.getDate()}`;
    
    // Crear el formato de la hora
    const getTime = (factor) => {
      if(factor < 10){
         return '0' + factor;
      }
      else{
          return factor;
      }
    }

    // Crear la hora
    const hora = `${getTime(datosFecha.getHours())}:${getTime(datosFecha.getMinutes())}`;

    return {fecha, hora};
  };

  // Funcion para generar la salida a ruta
  const generarRuta = (vendedor, productos, clientes) => {

    // Crear los productos de la ruta
    const productosRuta = crearProductos(productos);

    // Crear los clientes de la ruta
    const clientesRuta = crearClientes(clientes);

    // Obtener la fecha y hora
    const {fecha, hora} = obtenerFecha();

    // Crear el objeto con los datos de la salida a ruta
    const nuevaRuta = {
      ATIENDE: {
        NOMBRE: 'Carlos Heredia',
        PUESTO: 'ADMINISTRADOR'
      },
      CLIENTES: clientesRuta,
      FECHA: fecha,
      HORA: hora,
      REPARTIDOR: {
        ID: vendedor.ID,
        NOMBRE: vendedor.NOMBRE,
        PUESTO: vendedor.PUESTO
      },
      PRODUCTOS: productosRuta,
      STATUS: 'REALIZADO'
    };

    setRuta(nuevaRuta);
  };

  // Funcion para resetear la ruta

  const resetRuta = () => {
    setRuta();
  };

  return{
    ruta,
    generarRuta,
    resetRuta
  }
};

// Funcion para activar el boton de realizar operacion
const activarOperacion = (estadoProductos, estadoVendedor) => {
 
  return estadoProductos && estadoVendedor;
};



export default PaginaSalidaRuta;