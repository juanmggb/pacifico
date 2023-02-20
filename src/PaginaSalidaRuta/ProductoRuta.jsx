import React, { useState, useEffect }from 'react';
import styled from 'styled-components';

// Importar los componenntes
import FormularioCantidad from '../componentes/FormularioCantidad';
import OpcionesProducto from '../componentes/OpcionesProducto';

const ProductoContenedor = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 1.5fr 1.5fr 3fr;
  grid-template-areas: 'ImagenProducto NombreProducto SeleccionadorCantidad OpcionesProducto';
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
`;

const Imagen = styled.img`
  position:absolute;
  width: 90%;
  height: 90%;
`;

const NombreProducto = styled(FlexDiv)`
  grid-area: NombreProducto;
  & p:first-child{
    font-weight: bold;
  }
`;

const SeleccionadorCantidad = styled(FlexDiv)`
  grid-area: SeleccionadorCantidad;
  position: relative;
`;

const Texto = styled.p `
  text-align: center;
  height: 100%;
  width: 100%;
`;



function ProductoRuta ({producto, eliminarProducto, agregarCantidad, modificarEstado}) {
  
  //Hook para manejar el estado de la cantidad de producto seleccionada
  const [cantidad, setCantidad] = useState('');

   // useEffect para actualizar la cantidad ingresada al producto
   useEffect(() => {
    if(producto.ESTADO){
      agregarCantidad(cantidad, producto.ID);
    }
  }, [producto.ESTADO]);
 
  return(
    <>
      <ProductoContenedor>
        <ImagenProducto>
          <Imagen src={producto.IMAGEN}/>
        </ImagenProducto>
        <NombreProducto>
          <Texto>
            Producto
          </Texto>
          <Texto>
            {producto.NOMBRE}
          </Texto>
        </NombreProducto>
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

export default ProductoRuta;