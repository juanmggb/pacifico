import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'; 

/*=========================================== Estilos CSS =============================================*/
/*=====================================================================================================*/
const Formulario = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 3fr 1.5fr;
  grid-template-areas: 'Selector BotonAgregar';
  align-items: center;
  justify-items: center;
`;

const Selector = styled.select`
  grid-area: Selector;
  width: 100%;
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
  &:disabled{
    color: rgba(50, 50, 50, 0.5);
  }
`;

const BotonAgregar = styled.input`
  grid-area: BotonAgregar;
  width: 100%;
  height: 40px;
  background-color: green;
  color: #ffffff;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  &:hover:enabled {
    background-color: #02aa02;
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
  }
`;

/*=================================== Funcion JSX del Formulario ======================================*/
/*=====================================================================================================*/

function FormularioSelect ({listaItems, agregarItem, textoBoton, desactivar, descuentoActivo = false, setID}) {
 
  // Metodos que se utilizaran de react-hook-form
  const {register, handleSubmit, setValue, resetField, watch} = useForm({
  });
 
  // Conocer el valor del ID del producto en el select
  const watchID = watch('ID');

  useEffect(() => {
    if(descuentoActivo){
      setID(watchID);
    }
  }, [watchID]);

  useEffect(() => {
    if(listaItems.length && !descuentoActivo){
      setValue('ID', listaItems[0].ID)
    }
  }, [listaItems])

  // Funcion para generar el objeto que contiene toda la informacion relacionada con el item seleccionado
  // y ejecutar las funciones de actualizacion definidas anteriormente

  const onSubmit = (data) => {
    agregarItem(data.ID)
    resetField('ID');
  };

  return(
    <Formulario onSubmit={handleSubmit(onSubmit)}>
      <Selector
        {...register('ID', {valueAsNumber: true, disabled: (listaItems.length === 0  || desactivar) && !descuentoActivo})}>
          {listaItems.map( (item) => (
            <option key = {item.ID} value = {item.ID}>{item.NOMBRE}</option>
          ))}
      </Selector>
      <BotonAgregar
        value={textoBoton}
        type = 'submit'
        disabled = {(listaItems.length === 0 || desactivar) || descuentoActivo}/>
    </Formulario>
  )
};

export default FormularioSelect;