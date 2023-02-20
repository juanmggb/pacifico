
import React from 'react';
import styled from 'styled-components';
/*============================================================================================================*/
/*================================================ Estilos CSS ===============================================*/
const ClienteContenedor = styled.div`
  height: 100%;
  width: 100%;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: grid;
  padding: 0px 20px 0px 0px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'NombreCliente EliminarBoton';
`;

const NombreCliente = styled.div`
  grid-area: NombreCliente;
  padding: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  user-select: none;
  & p:first-child{
    font-weight: bold;
  }
`;

const EliminarBoton = styled.div`
  grid-area: EliminarBoton;
  align-self: center;
  justify-self: right;
  background-color: red;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  user-select: none;
  cursor: pointer;
`;

const Texto = styled.p `
  text-align: center;
  height: 100%;
  width: 100%;
`;

/*============================================================================================================*/
/*=========================================== Funcion JSX del componente =====================================*/
function ClienteRuta({cliente, eliminarCliente}){

  return(
    <>
      <ClienteContenedor>
        <NombreCliente>
          <Texto>Cliente</Texto>
          <Texto>{cliente.NOMBRE}</Texto>
        </NombreCliente>
        <EliminarBoton onClick = {() => eliminarCliente(cliente.ID)}>Eliminar</EliminarBoton>
      </ClienteContenedor>
    </>
  )
};

export default ClienteRuta;