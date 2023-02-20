import React from 'react';
import styled from 'styled-components';

import ModificarProducto from './ModificarProducto';

/*========================================================================================================*/
/*============================================ Estilos CSS ===============================================*/

const Productos = styled.div`
  position: relative;
  width: 100%;
  
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

/*========================================================================================================*/
/*==================================Funcion de Lista de productos JSX ====================================*/
function ListaProductos({productos, eliminarProducto, modificarProducto, modificarEstado, desactivar = false}) {

  //Si la lista de productos tiene al menos un producto retornar el siguiente componente:
  if(productos.length){
    return(
    <Productos>
      {productos.map( producto => {
        return(
          <ModificarProducto
            key = {producto.ID}
            desactivar = {desactivar}
            producto = {producto}
            eliminarProducto = {eliminarProducto}
            modificarProducto = {modificarProducto}
            modificarEstado = {modificarEstado}/>
    )})}
    </Productos>
  )}};

export default ListaProductos;

