import React from "react";
import styled from "styled-components";
import { useState } from "react";

import useTamañoPantalla from "./UseTamañoPantalla";


/*============================== Estilos CSS ======================================*/
/*=================================================================================*/

//Estilos del contenedor del producto
const ClienteContenedor = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  background: #f0f0f0;
  display: grid;
  border-radius: 5px;
  grid-gap: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "ImagenCliente DatosCliente";
  @media screen and (max-width: 900px){
    grid-template-columns: 1fr 4fr;
    grid-template-areas: "ImagenCliente DatosCliente";
    grid-gap: 0;
    height: fit-content;
    min-height: 130px;
}
  }  
`;

//Estilo genérico para div
const FlexDiv = styled.div`
  padding-top: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  user-select: none;
`;

const ImagenClienteDiv = styled(FlexDiv)`
  grid-area: ImagenCliente;
  position: relative;
  padding: 0;
  min-width: 110px;
`;

const Imagen = styled.img`
  position: absolute;
  width: 90%;
  height: 90%;
  max-height: 130px;
  max-width: 140px;
`;

const NombreCliente = styled(FlexDiv)`
  grid-area: NombreCliente;
  height: 100%;
`;

const DireccionCliente = styled(FlexDiv)`
  grid-area: DireccionCliente;
  height: 100%;
`;

const NumeroCliente = styled(FlexDiv)`
  grid-area: NumeroCliente;
  height: 100%;
`;

const NombreResponsable = styled(FlexDiv)`
  grid-area: NombreResponsable;
  height: 100%;
`;

const DatosCliente = styled(FlexDiv)`
    grid-area: DatosCliente;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'NombreCliente NumeroCliente DireccionCliente NombreResponsable';
    grid-gap: 5px;
    height: 100%;
    padding: 5px;
    @media screen and (max-width: 500px){
        display: flex;
        flex-direction: columns;
        justify-content: flex-start;
        align-items: flex-start;
        row-gap: 0;
        height: 100%;
        padding: 5px;
        padding-top: 0;
        margin: 0;
    }
`;

const Texto = styled.p`
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 14px;
  font-weight: ${props => props.negrita ? 'bold':'normal'};
  @media screen and (max-width: 500px){
    font-size: 12.2px;
    text-align: left;
    & span{
        font-weight: normal;
    }
    @media screen and (max-width: 360px){
      font-size: 11.2px;
    }
  }
`;


export const ClienteRutaEmpleado = ({cliente}) => {

  const clienteImagen = '../imagenes/' + cliente.NOMBRE + '.jpg';
  const [imagenCliente, setImagenCliente] = useState(clienteImagen);

  const sinImagen = () => {
    setImagenCliente('../imagenes/ClienteDefecto.png')
  }

  const {ancho, alto} = useTamañoPantalla()

    const NombreClienteRend = () => {
        return(
        <NombreCliente>
            {ancho > 500 ? 
                <><Texto negrita= {true}>Cliente: </Texto>
                  <Texto>{cliente.NOMBRE}</Texto></>
                :
                <><Texto negrita= {true}>Cliente: <span>{cliente.NOMBRE}</span></Texto></>
            }
        </NombreCliente>);
    }

    const DireccionClienteRend = () => {
        return(
        <DireccionCliente>
            {ancho > 500 ? 
                <><Texto negrita= {true}>Dirección: </Texto>
                  <Texto>{cliente.DIRECCION},{cliente.CIUDAD},{cliente.CP}</Texto></>
                :
                <><Texto negrita= {true}>Dirección: <span>{cliente.DIRECCION},{cliente.CIUDAD},{cliente.CP}</span></Texto></>
            }
        </DireccionCliente>);
    }

    const NumeroClienteRend = () => {
        return(
        <NumeroCliente>
            {ancho > 500 ? 
                <><Texto negrita= {true}>Teléfono: </Texto>
                  <Texto>{cliente.TELEFONO}</Texto></>
                :
                <><Texto negrita= {true}>Teléfono: <span>{cliente.TELEFONO}</span></Texto></>
            }
        </NumeroCliente>);
    }    

    const NombreResponsableRend = () => {
        return(
        <NombreResponsable>
            {ancho > 500 ?
                <><Texto negrita= {true}>Nombre del Responsable:</Texto>
                  <Texto>{cliente.CONTACTO}</Texto></>
                :
                <><Texto negrita= {true}>Nombre del Responsable: <span>{cliente.CONTACTO}</span></Texto></>
            }
        </NombreResponsable>);
    }

    return(
        <ClienteContenedor>
            <ImagenClienteDiv>
                <Imagen src= {imagenCliente} onError= {() => {sinImagen()}}/> 
            </ImagenClienteDiv>
            <DatosCliente>
                <NombreClienteRend/>
                <DireccionClienteRend/>
                <NumeroClienteRend/>
                <NombreResponsableRend/>
            </DatosCliente>
        </ClienteContenedor>
    );
}