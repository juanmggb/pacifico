import React from 'react';
import Producto from './Producto';
import styled from 'styled-components';

/*===================================================================================*/
/*==================== Estilos de CSS para la lista de productos ====================*/
const Productos = styled.div `
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 125px;
  grid-auto-rows: 125px;
  grid-gap: 15px;
  @media screen and (max-width: 500px){
    grid-auto-rows: 140px;
    grid-template-rows: 140px;
  }
`;

const Mensaje = styled.p`
  user-select: none;
  font-weight: bold;
`;

/*====================================================================================*/
/*=============================Funcion de Lista de productos JSX ======================*/
function ListaProductos( {productos, eliminarProducto,  agregarCantidad, modificarEstado} ) {

  //Si la lista de productos tiene al menos un producto retornar el siguiente script:
  if(!productos.length) return <Mensaje>No hay productos agregados</Mensaje>

  return (
      <Productos>
        {
          productos.map (producto => {
            return(
              <Producto 
              key = {producto.ID}
              producto = {producto}
              eliminarProducto = {eliminarProducto}
              agregarCantidad = {agregarCantidad}
              modificarEstado = {modificarEstado}
              />
           )})}
      </Productos>
  )}

export default ListaProductos;