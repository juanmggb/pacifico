import React from 'react';
import styled from 'styled-components';

/* ============================ Estilos CSS del Resumen de Ventas =================================== */

const ContenedorResumen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cliente = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const ListaProductos = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: 30px;
  grid-template-rows: auto;
  grid-template-areas: 'Producto Cantidad Precio';
  @media screen and (max-width: 500px){
    grid-template-columns: auto 0.7fr 1.2fr;
    grid-template-areas: 'Producto Cantidad Precio';
    @media screen and (max-width: 380px){
      grid-template-columns: auto 1fr auto;
      grid-template-areas: 'Producto Cantidad Precio';
      grid-gap: 10px;
    }
  }
`;

const Producto = styled.div`
  grid-area: Producto;
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Cantidad = styled.div`
  grid-area: Cantidad;
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
  & div:nth-last-child(3){
    font-weight: bold;
    margin-top: 20px;
  }
  & div:nth-last-child(2){
    font-weight: bold;
  }
  
  & div:last-child {
    font-weight: bold;
    margin-top: 25px;
  }
`;

const Monto = styled.div`
  grid-area: Precio;
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  & div:last-child {
    font-weight: bold;
    margin-top: 5px;
  }
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
  @media screen and (max-width: 500px){
    font-size: 14px;
    @media screen and (max-width: 420px){
      font-size: 13.3px;
   }
  }
`;

const Linea = styled.div`
  align-self: left;
  margin: 9px 0px 9px 0px;
  width: 100%;
  height: 2px;
  background-color: black;
`;

/*============================== Funcion JSX del Resumen de ventas ===================================*/
function ResumenVentas ({cliente, productos}) {
  let subtotal = 0;
  for(let i = 0; i < productos.length; i++){
    subtotal += productos[i].CANTIDADSELECCIONADA * productos[i].PRECIO;
  };


  return(
    <>
      <ContenedorResumen>
        <Cliente>{cliente.NOMBRE}</Cliente>
        <ListaProductos>
          <Producto>
            <Texto>Producto</Texto>
            {productos.map(producto => {
              return(<Texto key={producto.ID}>{producto.NOMBRE}</Texto>)
            })}
          </Producto>
          <Cantidad>
            <Texto>Cantidad</Texto>
            {productos.map(producto => {
              return(<Texto key={producto.ID}>{producto.CANTIDADSELECCIONADA}</Texto>)
            })}
            <Texto>Subtotal:</Texto>
            <Texto></Texto>
            <Texto></Texto>
          </Cantidad>
          <Monto>
            <Texto>Monto</Texto>
            {productos.map(producto => {
              return(<Texto key={producto.ID}>$ {(producto.CANTIDADSELECCIONADA * producto.PRECIO).toFixed(2)}</Texto>)
            })}
            <Linea></Linea>
            <Texto>$ {subtotal.toFixed(2)} MXN</Texto>
          </Monto>
        </ListaProductos>
      </ContenedorResumen>
    </>
  )
}

export default ResumenVentas;