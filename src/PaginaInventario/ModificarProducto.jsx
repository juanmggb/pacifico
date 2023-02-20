import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import OpcionesProducto from '../componentes/OpcionesProducto';

/*=======================================================================================================*/
/*============================================== Estilos CSS ============================================*/
const Formulario = styled.form`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);

  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 1fr 1fr;
  grid-template-rows: 50px 70px 1fr;
  grid-template-areas: 'Imagen Nombre Nombre'
                       'Imagen Modificacion Modificacion'  
                       'OpcionesProducto OpcionesProducto OpcionesProducto';
`;

const Imagen = styled.img`
  grid-area: Imagen;
  width: 100%;
  height: 100%;

  align-self: center;
  justify-self: center;
`;

const Nombre = styled.div`
  grid-area: Nombre;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
`;

const Modificacion = styled.div`
  grid-area: Modificacion;
  height: 100%;
  width: 100%;

  display: flex;
  column-gap: 4%;
  align-items: flex-start;
  justify-content: center;
`;

const Input = styled.input`
  width: 48%;
  height: 35px;
  background-color: #ffffff;
  font-size: 0.9em;
  color: black;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-weight: 700;

  &:hover:enabled {
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
  }

  &:disabled {
    background-color: #d3d3d3;
  }
`;

const Select = styled.select`
  width: 48%;
  height: 35px;
  background-color: #ffffff;
  font-size: 0.9em;
  color: black;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-weight: 700;

  &:hover:enabled {
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: auto;
  }
`;


/*=======================================================================================================*/
/*==================================== Funcion JSX del componente =======================================*/

function ModificarProducto({producto, eliminarProducto, modificarProducto, modificarEstado, desactivar}){

  // Metodos para el formulario
  const {register, watch} = useForm({defaultValues: {
    OPERACION: 'Agregar'
  }});

  // Variable para guardar el valor actual del tipo de operacion
  const operacion = watch('OPERACION');
  
  // Estado para manejar la cantidad del input
  const [cantidad, setCantidad] = useState('');
  
  // Modificar la cantidad con el nuevo valor ingresado
    const modificarCantidad = (event) => {

      const cantidadActualizada = validarEntrada(event.target.value, producto.CANTIDAD, operacion);

      setCantidad(cantidadActualizada);
  
      event.preventDefault();
    };
  
  // Regresar los valores por defecto cuando se cambie de opcion
  useEffect(() => {
    setCantidad('');
  }, [operacion])

  // Actualizar la operacion del producto al confirmar
  useEffect(() => {
    modificarProducto(cantidad, operacion, producto.ID);
  }, [producto.ESTADO])


  return(
    <Formulario>
      <Nombre>
        {producto.NOMBRE}
      </Nombre>
      <Imagen src={producto.IMAGEN} />
      <Modificacion>
      <Select
        disabled = {producto.ESTADO || desactivar}
        {...register('OPERACION')}>
        <option key = {'Agregar'} value = {'Agregar'}>Agregar</option>
        <option key = {'Eliminar'} value = {'Eliminar'}>Eliminar</option>
      </Select>
      <Input
        disabled = {producto.ESTADO || desactivar}
        type = 'number'
        placeholder = 'Cantidad'
        onChange={modificarCantidad}
        value = {cantidad}/>
      </Modificacion>
      <OpcionesProducto 
          cantidad = {cantidad}
          estado = {producto.ESTADO}
          desactivar = {desactivar}
          modificarEstado = {modificarEstado}
          eliminarProducto = {eliminarProducto}
          ID ={producto.ID}/>
    </Formulario>
  );
};

// Funcion para verificar la cantidad ingresada al input

//Funcion para validar la cantidad ingresada en el teclado  
const validarEntrada = (input, cantidadDisponible, operacion) => {
  
  // Si el numero ingresado es menor a 0 devolver cero
  if(input <= 0) return '';
  
  // Si el valor ingresado es una letra o un valor decimal devolver cero
  if(isNaN(parseInt(input)) || !Number.isInteger(parseFloat(input))) return '';
  
  // Si el valor ingresado es mayor a la cantidad disponible a eliminar devolver la cantidad maxima disponible
  if((parseInt(input)>= cantidadDisponible) && (operacion === 'Eliminar')) return cantidadDisponible;
  
  // Devolver el valor ingresado
  return parseInt(input);
};

export default ModificarProducto;