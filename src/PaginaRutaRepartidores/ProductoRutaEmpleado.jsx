import React from "react";
import styled from "styled-components";
import useTamañoPantalla from "./UseTamañoPantalla";

/*============================== Estilos CSS ======================================*/
/*=================================================================================*/

//Estilos del contenedor del producto
const ProductoContenedor = styled.div `
  position: relative;
  width: 100%;
  height: 130px;
  background: #f0f0f0;
  display: grid;
  border-radius: 5px;
  grid-gap: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "ImagenProducto DatosProducto";
  @media screen and (max-width: 900px){
    height: fit-content;
    min-height: 120px;
    @media screen and (max-width: 500px){
      grid-template-columns: 1fr 4fr;
      grid-template-areas: "ImagenProducto DatosProducto";
      grid-gap: 0;
    }
  }  
`;

//Estilo genérico para div
const FlexDiv = styled.div `
  padding-top: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  user-select: none;
`;

const ImagenProductoDiv = styled(FlexDiv)`
  grid-area: ImagenProducto;
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

const NombreProducto = styled(FlexDiv)`
  grid-area: NombreProducto;
  height: 100%;
`;

const PrecioProducto = styled(FlexDiv)`
  grid-area: PrecioProducto;
  height: 100%;
`;

const CantidadProducto = styled(FlexDiv)`
  grid-are: CantidadProducto;
  height: 100%;
`;

const DatosProducto = styled(FlexDiv)`
    grid-area: DatosProducto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'NombreProducto CantidadProducto PrecioProducto';
    grid-gap: 5px;
    height: 100%;
    padding: 5px;
    @media screen and (max-width: 499px){
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
    font-size: 14px;
    text-align: left;
    & span{
        font-weight: normal;
    }
    @media screen and (max-width: 350px){
      font-size: 13px;
    }
  }
`;

export const ProductoRutaEmpleado = ({producto}) => {

    const {ancho, alto} = useTamañoPantalla();

    const NombreProductoRend = () => {
        return(<NombreProducto>
            {ancho >= 500 ? 
                <><Texto negrita= {true}>Producto: </Texto>
                  <Texto>{producto.NOMBRE}</Texto></>
                :
                <><Texto negrita= {true}>Producto: <span>{producto.NOMBRE}</span></Texto></>
            }
        </NombreProducto>);
    }

    const PrecioProductoRend = () => {
        return(
        <PrecioProducto>
            {ancho >= 500 ? 
                <><Texto negrita= {true}>Precio Público: </Texto>
                  <Texto>{`$ ${producto.PRECIO}`}</Texto></>
                :
                <><Texto negrita= {true}>Precio Público: <span>{`$ ${producto.PRECIO}`}</span></Texto></>
            }
        </PrecioProducto>);
    }

    const CantidadProductoRend = () => {
        return(
        <CantidadProducto>
            {ancho >= 500 ? 
                <><Texto negrita= {true}>Cantidad: </Texto>
                  <Texto>{producto.CANTIDAD}</Texto></>
                :
                <><Texto negrita= {true}>Cantidad: <span>{producto.CANTIDAD}</span></Texto></>
            }
        </CantidadProducto>);
    }

    return(
        <ProductoContenedor>
            <ImagenProductoDiv>
                <Imagen src={producto.IMAGEN}/>            
            </ImagenProductoDiv>
            <DatosProducto>
                <NombreProductoRend/>
                <PrecioProductoRend/>
                <CantidadProductoRend/>
            </DatosProducto>
        </ProductoContenedor>
    );
}