import React from 'react';

import CrearProducto from './CrearProducto';
import ListaProductos from './ListaProductos';

/*=======================================================================================================*/
/*================================== Funcion JSX del componente =========================================*/

function FormulariosProductos ({opcion,
                                productos, 
                                agregarProducto, 
                                modificarProducto,
                                modificarEstado,
                                eliminarProducto,
                                resetProductos}) {
  
  switch(opcion){

    case 0:
      return(
        <CrearProducto 
          agregarProducto = {agregarProducto}
          resetProductos = {resetProductos}/> 
      )
    case 1: 
      return(
        <ListaProductos 
        productos = {productos}
        modificarProducto  = {modificarProducto}
        modificarEstado = {modificarEstado}
        eliminarProducto = {eliminarProducto}/>
      )
    case 2:
      return(
        <ListaProductos
        desactivar = {true} 
        productos = {productos}
        modificarProducto  = {modificarProducto}
        modificarEstado = {modificarEstado}
        eliminarProducto = {eliminarProducto}/>
      )
  }
};

export default FormulariosProductos;