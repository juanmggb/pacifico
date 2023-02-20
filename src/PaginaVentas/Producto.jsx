import React from 'react';
import FormularioCantidad from '../componentes/FormularioCantidad';
import OpcionesProducto from '../componentes/OpcionesProducto';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTamañoPantalla from '../PaginaRutaRepartidores/UseTamañoPantalla';


/*============================== Estilos CSS ======================================*/
/*=================================================================================*/

/*=================== Estilos del contenedor del producto =========================*/

const ProductoContenedor = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 120px 2.8fr 1fr 3.2fr;
  grid-template-areas: 'ImagenProducto DatosProducto SeleccionadorCantidad OpcionesProducto';
  @media screen and (max-width: 700px){
    grid-template-columns: 120px 3.4fr 1.2fr 2.4fr;
    grid-template-areas: 'ImagenProducto DatosProducto SeleccionadorCantidad OpcionesProducto';    
    @media screen and (max-width: 600px){
      grid-template-columns: 120px 1fr 0.4fr;
      grid-template-rows: 55px 65px;
      grid-template-areas: "ImagenProducto DatosProducto OpcionesProducto"
                            "ImagenProducto SeleccionadorCantidad OpcionesProducto";
      grid-gap: 5px;
      @media screen and (max-width: 500px){
        grid-template-columns: 120px 1fr;
        grid-template-rows: 65px 35px 40px;
        grid-template-areas: "ImagenProducto DatosProducto"
                             "ImagenProducto SeleccionadorCantidad"
                             "OpcionesProducto OpcionesProducto";
        grid-gap: 0;
      }
    }
  }
`;

/*========================= Estilos genericos del div =====================================*/
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

const ImagenProducto = styled(FlexDiv)`
  grid-area: ImagenProducto;
  position:  relative;
  padding: 0px;
  
  @media screen and (max-width: 500px){
    height: 110px;
  }
`;

const Imagen = styled.img`
  position:absolute;
  width: 90%;
  height: 90%;
`;

const DatosProducto =  styled(FlexDiv)`
  grid-area: DatosProducto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  column-gap: 20px;
  padding: 0;
  @media screen and (max-width: 1200px){
    padding-right: 5px;
    align-self: center;
    height: 100%;
    @media screen and (max-width: 600px){
      flex-direction: column;
      height: 70%;
      justify-items: left;
      align-self: start;
      padding-top: 10px;
    }
  }
`;

const NombreProducto = styled(FlexDiv)`
  grid-area: NombreProducto;
  height: 100%;
  & p:first-child{
    font-weight: bold;
  }
  @media screen and (max-width: 600px){
    height: 75%;
    width: 100%;
    @media screen and (max-width: 500px){
      height: 100%;
      padding-top: 5px; 
    }
  }
`;

const PrecioProducto = styled(FlexDiv) `
  grid-area: PrecioProducto;
  height: 100%;
  & p:first-child{
    font-weight: bold;
  }
  @media screen and (max-width: 600px){
    height: 100%;
    width: 100%;
    @media screen and (max-width: 500px){
      padding-top: 0px;
      height: 100%;
    }
  }
`;

const SeleccionadorCantidad = styled(FlexDiv)`
  grid-area: SeleccionadorCantidad;
  position: relative;
  @media screen and (max-width: 600px){
    align-content: start;
    padding: 0;
    height: 65%;
    width: 70%;
    justify-self: center;  
    @media screen and (max-width: 500px){
      height: 35px;
      width: 70%;
      top: -30%;
      left: 10%; 
      justify-self: left;
    }
  }
`;

const Texto = styled.p `
  text-align: center;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 600px){
    text-align: left;
    padding-left: 0;
    font-size: 16px;
    & span{
      font-weight: 400;
    }
    @media screen and (max-width: 500px){
      font-size: 14.5px;
      @media screen and (max-width: 400px){
        font-size: 13.5px;
      }
    }
  }
`;

/*=================================================================================*/
/*================= Funcion JSX del componente Producto ===========================*/
function Producto ({producto, eliminarProducto, agregarCantidad, modificarEstado}) {
  
  //Hook para manejar el estado de la cantidad de producto seleccionada
  const [cantidad, setCantidad] = useState('');

   // useEffect para actualizar la cantidad ingresada al producto
   useEffect(() => {
    if(producto.ESTADO){
      agregarCantidad(cantidad, producto.ID);
    }
  }, [producto.ESTADO]);
 
  //Hook para hacer uso del tamaño de la pantalla
  const {ancho, alto} = useTamañoPantalla();

  return(
    <>
      <ProductoContenedor>
        <ImagenProducto>
          <Imagen src={producto.IMAGEN}/>
        </ImagenProducto>
        <DatosProducto>
          <NombreProducto>
            { (ancho > 600) ?
              <><Texto>Producto</Texto>
              <Texto>{producto.NOMBRE}</Texto></> :
              <><Texto>Producto: <span>{producto.NOMBRE}</span></Texto></>
            }
          </NombreProducto>
          <PrecioProducto>
            { (ancho > 600)  ?
              <><Texto>Precio</Texto>
              <Texto>{`$ ${producto.PRECIO.toFixed(2)}`}</Texto></>:
              <><Texto>Precio: <span>{`$ ${producto.PRECIO.toFixed(2)}`}</span></Texto></>
            }
          </PrecioProducto>
        </DatosProducto>
        <SeleccionadorCantidad>
          <FormularioCantidad 
            estado = {producto.ESTADO}
            cantidad = {cantidad}
            setCantidad = {setCantidad}
            cantidadDisponible = {producto.CANTIDAD}
            aumento = {2}
            decremento = {2} />
        </SeleccionadorCantidad>
        <OpcionesProducto 
          cantidad = {cantidad}
          estado = {producto.ESTADO}
          modificarEstado = {modificarEstado}
          eliminarProducto = {eliminarProducto}
          ID ={producto.ID}/>
      </ProductoContenedor>
    </>
  )
}

export default Producto;
