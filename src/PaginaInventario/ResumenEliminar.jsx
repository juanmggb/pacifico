import React from 'react';
import styled from 'styled-components';

/* ============================ Estilos CSS del Resumen de la Modificacion =================================== */

const ContenedorResumen = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
  margin-bottom: 40px;
  text-align: left;

  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Producto = styled.div`
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Titulo = styled.h3`
  width: 100%;
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;


/*============================== Funcion JSX de Resumen de la Modificacion ==================================*/
function ResumenEliminar({productos}){
  return(
    <>
    <ContenedorResumen>
      <Titulo>Atencion, se eliminarán los siguientes productos de la base de datos:</Titulo>
      <Producto>
        <Texto>Nombre del producto</Texto>
        {productos.map(producto => (
           <Texto key={producto.ID}>{producto.NOMBRE}</Texto>
        ))}
      </Producto>   
    </ContenedorResumen>
    </>
  )
}

export default ResumenEliminar;