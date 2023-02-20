import React from 'react';
import styled from 'styled-components';

/* ============================ Estilos CSS del Resumen de la Modificacion =================================== */

const ContenedorResumen = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
  margin-bottom: 40px;
  text-align: left;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 30px;
  grid-template-rows: auto;
  grid-template-areas: 'Producto Operacion';
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

const Operacion = styled.div`
  grid-area: Operacion;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;


/*============================== Funcion JSX de Resumen de la Modificacion ==================================*/
function ResumenModificacion({productos}){
  return(
    <>
    <ContenedorResumen>
      <Producto>
        <Texto>Producto</Texto>
        {productos.map(producto => {
          return(
            <Texto key={producto.ID}>{producto.NOMBRE}</Texto>
          )
        })}
      </Producto>
      <Operacion>
        <Texto>Operacion</Texto>
        {productos.map(producto =>(
              <Texto key={producto.ID}>{`${producto.OPERACION} ${producto.CANTIDADSELECCIONADA} unidades`}</Texto>)
          )}
      </Operacion>
      
    </ContenedorResumen>
    </>
  )
}

export default ResumenModificacion;