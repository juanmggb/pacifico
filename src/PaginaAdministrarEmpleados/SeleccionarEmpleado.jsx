import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'; 

/*=========================================== Estilos CSS =============================================*/
/*=====================================================================================================*/
const Formulario = styled.form`
  grid-area: Opciones;
  width: 100%;
  height: 100px;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'Opciones'
                       'Seleccionar';
  align-items: center;
  justify-items: center;
`;

const InputCliente = styled.input`
  grid-area: Opciones;
  width: 70%;
  height: 40px;
  background-color: white;
  color: rgb(50, 50, 50);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;

  &:hover:enabled {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
  }

  &:disabled {
    background: transparent;
    color: transparent;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0);
    border: none;
  }
`;

const Seleccionar = styled.input`
  grid-area: Seleccionar;
  width: 70%;
  height: 40px;
  background-color: #dcdcdc;
  font-size: 0.9em;
  color: black;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-weight: 700;
  border: solid 2px white;

  &:hover:enabled {
    background-color: white;
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
  }

  &:disabled {
    background: transparent;
    color: transparent;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0);
    border: none;
  }
`;

/*=================================== Funcion JSX del Formulario ======================================*/
/*=====================================================================================================*/

function SeleccionarEmpleado ({listaItems, seleccionar, desactivar}) {
 
  // Metodos que se utilizaran de react-hook-form
  const {register, 
        handleSubmit,  
        reset} = useForm({defaultValues: {
          NOMBRE: listaItems[0].NOMBRE
        }});


  // Funcion para generar el objeto que contiene toda la informacion relacionada con el item seleccionado
  // y ejecutar las funciones de actualizacion definidas anteriormente

  const onSubmit = (data) => {
    seleccionar(data.NOMBRE)
  };

  return(
    <Formulario
      autoComplete = 'off' 
      onSubmit={handleSubmit(onSubmit)}>
      <InputCliente
          type = 'text'
          list = 'Opciones-empleado'
          disabled = {desactivar}
          {...register('NOMBRE')} />
        <datalist id = 'Opciones-empleado'>
            {listaItems.map( (item) => (
              <option
                key = {item.ID} 
                value = {item.NOMBRE}></option>
            ))}
        </datalist>
      <Seleccionar
        disabled = {desactivar}
        value = 'Seleccionar'
        type = 'submit' />
    </Formulario>
  )
};

export default SeleccionarEmpleado;