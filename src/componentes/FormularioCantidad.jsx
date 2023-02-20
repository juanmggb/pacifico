import React from 'react';
import styled from 'styled-components';
import useTamañoPantalla from '../PaginaRutaRepartidores/UseTamañoPantalla';

/*===============================================================================*/
/*=============================== Estilos CSS ===================================*/
const CantidadContenedor = styled.form `
  position:relative;
  width: 100%;
  min-width: 80px;
  height: 100%;
  color: black;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 4fr;
  grid-template-areas:'Texto Texto Texto'
                      'BotonMenos InputCantidad BotonMas';
  grid-gap: 2.5%;
  justify-items: center;
  align-items: center;
`;

const Texto = styled.p`
  grid-area: Texto;
  font-weight: bold;
  display: ${props => props.ocultar ? 'none':'inline'};
`

const FlexDiv = styled.button `
  position: absolute;
  width: 80%;
  height: 50%;
  background-color: white;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);
  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: auto;
  }
  @media screen and (max-width: 600px){
    height: 100%;
  }
`;

const BotonMenos = styled(FlexDiv) `
  grid-area: BotonMenos;
`;

const BotonMas = styled(FlexDiv) `
  grid-area: BotonMas;
`;

const InputCantidad = styled.input `
  width: 80%;
  height: 50%;
  text-align: center;
  font-size: 1em;
  position: absolute;
  grid-area: InputCantidad;
  background: rgb(255, 255, 255);
  outline: none;
  border: none;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);
  &:disabled {
    background-color: #d3d3d3;
  }
  @media screen and (max-width: 600px){
    height: 100%;
  }
`;


/*================================================================================*/
/*=========== Funcion de JSX del componente FormularioCantidad ===================*/

function FormularioCantidad({estado, cantidad, setCantidad, cantidadDisponible, aumento, decremento}) {

  // Aumentar cantidad con el boton de suma
  const aumentarCantidad = (event) => {
    const cantidadActualizada = validarSuma(aumento, cantidad, cantidadDisponible);
    setCantidad(cantidadActualizada);

    event.preventDefault();
  };

  // Disminuir cantidad con el boton de resta
  const disminuirCantidad = (event) => {
    const cantidadActualizada = validarResta(decremento, cantidad);
    setCantidad(cantidadActualizada);

    event.preventDefault();
  };

  // Modificar la cantidad con el nuevo valor ingresado
  const modificarCantidad = (event) => {
    const cantidadActualizada = validarEntrada(event.target.value, cantidadDisponible);
    setCantidad(cantidadActualizada);

    event.preventDefault();
  };

  //Hook para usar el tamaño de la pantalla
  const {ancho, alto} = useTamañoPantalla();

  return (
    <CantidadContenedor>
      <Texto ocultar= {ancho <= 600}>Cantidad</Texto>
      <BotonMenos 
        onClick={disminuirCantidad} 
        disabled = {estado}>
           - 
      </BotonMenos>
      <InputCantidad
        className='input-cantidad'
        type='number'
        onChange={modificarCantidad}
        disabled = {estado}
        required 
        value = {cantidad}>
      </InputCantidad>
      <BotonMas
        onClick={aumentarCantidad}
        disabled = {estado} >
        +
      </BotonMas>
    </CantidadContenedor>
  );
};

/*=============================================================================================================*/
/*========================================= Funciones del componente ==========================================*/


//Funcion para validar la cantidad ingresada en el teclado  
const validarEntrada = (input, cantidadDisponible) => {
  
  // Si el numero ingresado es menor a 0 devolver cero
  if(input <= 0) return '';
  
  // Si el valor ingresado es una letra o un valor decimal devolver cero
  if(isNaN(parseInt(input)) || !Number.isInteger(parseFloat(input))) return '';
  
  // Si el valor ingresado es mayor a la cantidad disponible devolver la cantidad maxima disponible
  if(parseInt(input)>= cantidadDisponible) return cantidadDisponible;
  
  // Devolver el valor ingresado
  return parseInt(input);
};

//Funcion para aumentar la cantidad de producto con el boton '+'
const validarSuma = (aumento, cantidad, cantidadDisponible) => {

  // Si el valor actual es indefinido devolver el aumento
  if(isNaN(parseInt(cantidad))) return aumento;

  // Si el nuevo valor es mayor a la cantidad disponible retornar la cantidad disponible
  if(parseInt(cantidad) + aumento >= cantidadDisponible) return cantidadDisponible;
  
  // Devolver la cantidad actual más el aumento
  return parseInt(cantidad) + aumento;
  };

//Funcion para disminuir la cantidad de producto con el boton '-'
const validarResta = (decremento, cantidad) => {

  //Si el nuevo valor es menor que cero devolver cero
  if((parseInt(cantidad) - decremento) <= 0) return '';
  
  // Si el nuevo valor es indefinido devolver cero
  if (isNaN(parseInt(cantidad) - decremento)) return '';
  
  // Devolver la cantidad actual menos el decremento
  return parseInt(cantidad) - decremento;
};

export default FormularioCantidad;