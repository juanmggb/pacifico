import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { TaskBar } from '../BarraTareas/BarraTareas';
import SeleccionadorFormulario from './SeleccionadorFormulario';
import SeleccionarProducto from './SeleccionarProducto';
import FormulariosProductos from './FormulariosProductos';
import VentanaEmergente from '../componentes/VentanaEmergente';
import Resumenes from './Resumenes';



/*======================= Estilos de CSS =====================*/
const Principal = styled.div `
  background: linear-gradient(rgb(54, 54, 82), 15%,rgb(84, 106, 144), 60%, rgb(68, 111, 151));
  color: black;
  font-weight: 400;
  border-radius: 0px;
  width: 100vw;
  height: 100svh;
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: 2.5fr 8fr;
  grid-template-rows: 0.5fr 6.5fr 1.5fr;
  grid-template-areas: 'BarraTareas BarraTareas'
                       'PanelControl ContenidoPrincipal'
                       'Herramientas ContenidoPrincipal';
  `;


const ContenidoPrincipal = styled.div `
  grid-area: ContenidoPrincipal;
  background: white;
  position: relative;

  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

const PanelControl = styled.div `
  position: relative; 
  grid-area: PanelControl;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'Seleccionador'
                        'Opciones';
  align-items: center;
  justify-items: center;
`;

const Herramientas = styled.div `
  grid-area: Herramientas;

  background: #ffffff;
  color: black;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotonOperacion= styled.input`
  width: 60%;
  height: 40%;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

&:hover:enabled {
  background-color: #00a100;
  box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
}

&:disabled {
  background-color: #012b00;
}

@media screen and (max-width: 900px ){
    height: 40%;
  }
`;

// Valores de los estados del formulario

const opcionesFormulario = [
  {opcion: 0, titulo: 'Agregar producto nuevo a la base de datos'},
  {opcion: 1, titulo: 'Modificar inventario de la base de datos'},
  {opcion: 2, titulo: 'Eliminar producto de la base de datos'}
];

function PaginaInventario ({productosIniciales})  {
  
  // Custom Hook para manejar el estado de los productos
  const {
        productos,
        productosSelect,
        agregarProducto,
        modificarProducto,
        modificarEstado,
        seleccionarProducto,
        eliminarProducto,
        verificarEstados,
        resetProductos
      }= useProductos(productosIniciales);
  
  console.log(productos);

  // Custom Hook para manejar el estado de las opciones del formulario
  const {
    formulario,
    seleccionarOperacion
  } = useFormularios(opcionesFormulario);

   // Funcion para desactivar el seleccionador de productos si se va a crear un nuevo producto
   const desactivarProductos = () => {
    return formulario.opcion === 0;
  };

  // Hook para controlar el estado de la ventana emergente
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Variable para activar el boton de activar operacion
  const estadoOperacion = activarOperacion(productos, formulario.opcion, verificarEstados());

  return(
    <Principal>
      {/*BARRA DE NAVEGACION*/}
      <TaskBar/>
      {/* SECCION CON LOS DIFERENTES FORMULARIOS PARA AGREGAR, MODIFICAR Y AGREGAR */}
      <ContenidoPrincipal>
        <FormulariosProductos 
          productos =  {productos}
          opcion = {formulario.opcion}
          agregarProducto = {agregarProducto}
          modificarProducto = {modificarProducto}
          modificarEstado = {modificarEstado}
          eliminarProducto = {eliminarProducto}
          resetProductos = {resetProductos}/>
      </ContenidoPrincipal>
      {/* PANEL PARA SELECCIONAR LOS DIFERENTES TIPOS DE MENU*/}
      <PanelControl>
        <SeleccionadorFormulario 
          seleccionarOperacion = {seleccionarOperacion}
          resetProductos = {resetProductos}
          />
        <SeleccionarProducto 
         listaItems = {productosSelect}
         seleccionar = {seleccionarProducto}
         desactivar = {desactivarProductos()}
         />
      </PanelControl>
       {/*SECCION DONDE SE ENCUENTRA EL BOTON PARA MOSTRAR LA VENTANA EMERGENTE*/}
      <Herramientas>
      <BotonOperacion 
          disabled = {!estadoOperacion}
          value = {'Realizar Operacion'}
          type = {'submit'}
          onClick = {() => setEstadoVentanaEmergente(!estadoVentanaEmergente)}/>
      </Herramientas>
      {/*VENTANA EMERGENTE PARA MOSTRAR EL RESUMEN DE LA OPERACION*/}
      <VentanaEmergente
        operacion = {formulario.titulo}
        estado = {estadoVentanaEmergente}
        cambiarEstado = {setEstadoVentanaEmergente}
        reset = {resetProductos} >
         <Resumenes 
          opcion = {formulario.opcion}
          productos = {productos} />
      </VentanaEmergente>
    </Principal>
  );
};

/*=======================================================================================================*/
/*====================================== Funciones y custom hooks =======================================*/

// Custom Hook para manejar el estado de los productos

const useProductos = productosIniciales => {

  let productosState = [...productosIniciales];

  // Agregar la propiedad de 'CANTIDADSELECCIONADA' y 'ESTADO' a cada producto
  productosState = productosState.map(producto => {
    producto.CANTIDADSELECCIONADA = 0;
    producto.ESTADO = false;

    return producto;
  });

  // Estado del producto para almacenar la informacion del formulario
  const [productos, setProductos] = useState([]);

  // Estado para almacenar el objeto del producto ser modificado o eliminado
  const [productosSelect, setProductosSelect] = useState(productosState);

  // Funcion para modificar el producto del inventario
  const modificarProducto = (cantidad, operacion,ID) => {

    // Modificar la propiedad CANTIDAD y agregar la propiedad OPCION
    const productosActualizados = productos.map(producto => {
      if(producto.ID === ID){
        return{...producto, CANTIDADSELECCIONADA: cantidad, OPERACION: operacion}
      }
      return producto
    });

    setProductos(productosActualizados);

  };

  // Funcion para crear o eliminar producto de la base de datos
  const agregarProducto = (producto) => {

    const productosActualizados = [producto];

    setProductos(productosActualizados);
  }

   //Modificar el valor de la propiedad 'ESTADO' al dar click a los botones de confirmar y modificar

   const modificarEstado = ID => {

    const productosActualizados  = productos.map(producto => {
      if(producto.ID === ID){
        return {...producto, ESTADO: !producto.ESTADO};
      }
      return producto
    });

    setProductos(productosActualizados);
  };

  // Funcion para agregar el producto seleccionado de las opciones del Select;
  const seleccionarProducto = NOMBRE => {

    // Empleado seleccionado
    const nuevoProducto = productosSelect.filter(producto => producto.NOMBRE === NOMBRE)[0];

    // Array de las propiedades de productos a renderizar
    const productosActualizados = [nuevoProducto, ...productos];

    // Array de las propiedades de los productos disponibles para ser seleccionados
    const productosActualizadosSelect = productosSelect.filter(producto => producto.NOMBRE !== NOMBRE);
    
    // Actualizar los estados
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

   // Actulizar los estados
   setProductosSelect(productosActualizadosSelect);
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
    setProductosSelect(productosState);
    setProductos([]);
  };

  return {
    productos,
    productosSelect,
    agregarProducto,
    modificarProducto,
    modificarEstado,
    seleccionarProducto,
    eliminarProducto,
    verificarEstados,
    resetProductos
  };
};

// Custom Hook para manejar las opciones de los diferentes formularios

const useFormularios = (propiedadesFormulario) => {
 
  // Hook del seleccionador en el panel de control
  const [formulario, setFormulario] = useState(propiedadesFormulario[0]);

  // Seleccionar la operacion a realizar
  const seleccionarOperacion = (opcion) => {

    setFormulario(propiedadesFormulario[opcion])
  };

  return {
    formulario,
    seleccionarOperacion
  };
}

// Funcion para activar el boton para realizar la operacion
const activarOperacion = (productos, opcion, verificarEstados) => {
  switch(opcion){
    case 0:
      return productos.length > 0;
    case 1:
      return verificarEstados;
    case 2:
      return productos.length > 0;
  }
};

export default PaginaInventario;