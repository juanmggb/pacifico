import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/*========================================================================================================*/
/*============================================ Estilos CSS ===============================================*/

// Estilos del Formulario

const Formulario = styled.form`
  width: 100%;
  padding: 20px 75px 20px 75px;

  // Estructura
  display: grid;
  grid-gap: 30px;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px auto 50px;
  grid-template-areas: 'Encabezado Encabezado'
                        'Precios Precios'
                        'Reset Reset';


  @media screen and (max-width: 900px ){
    padding: 20px 20px 20px 20px;
    grid-gap: 15px;
    grid-template-rows: 60px auto 40px;
  }
  `;

// Estilos del encabezado de la seccion 'Precios de los productos'
const Encabezado= styled.div`
  grid-area: Encabezado;
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: left;

  border-bottom: 3px solid #2e78d2;
  border-radius: 0px;

  font-size: 1.3rem;
  font-weight: bold;
`;

// Estilos para la seccion de precios
const Precios = styled.div`
  grid-area: Precios;
  display: grid;
  grid-gap: 15px;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 55px;
  grid-auto-rows: 55px;

  @media screen and (max-width: 900px ){
    grid-gap: 15px;
    grid-template-rows: 40px;
    grid-auto-rows: 40px;
  }
`;

// Estilos de cada input de Precio
const InputPrecio = styled.div`
  width: 100%;
  height: 100%;


  display: grid;
  grid-gap: 10px;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
`;

// Estilos del Boton para resetear
const Reset = styled.input`
  grid-area: Reset;
  height: 80%;
  width: 150px;
  background-color: #e90000;
  color: white;
  font-weight: bold;

  align-self: center;
  justify-self: center;

  &:hover:enabled {
    background-color: #ff0000;
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

// Estilos del input
const Input = styled.input`
  grid-area: Input;
  width: 60%;
  height: 80%;
  justify-self: left;
  background-color: #efefef;
  border-radius: 0px;
  border-bottom: 3px solid #2e78d2;

  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;

  &:enabled:hover {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }


`;

// Estilos del nombre de los campos
const Texto = styled.div`
  grid-area: Texto;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  background-color: white;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

/*========================================================================================================*/
/*=================================== Funcion JSX del componente =========================================*/

function FormularioPreciosCliente ( { datosCliente, preciosDefault, opcion, submitRef, agregarPrecios } ) {

  // Crear los campos para los precios de cada producto
  let campos = Object.keys(preciosDefault);

  // Funciones de la librería react-hook-form para el formulario
  const {register,
         handleSubmit,
         reset} = useForm({
          defaultValues: {
            ...preciosDefault
          }
         });

  
  // Cambiar los precios por defecto cuando se va a modificar un cliente
  useEffect(() => {
    if(opcion !== 0 && datosCliente){
      // Crear los campos para los precios de cada producto
      const {PRODUCTOS_PRECIOS, ...datos} = datosCliente;
      campos = Object.keys(PRODUCTOS_PRECIOS);

      reset(PRODUCTOS_PRECIOS);
    } 
    else {

      campos = Object.keys(preciosDefault);
      reset(preciosDefault);
    }
  }, [datosCliente, opcion]);

  const onSubmit = (data) => {
    agregarPrecios(data);
  };

  return(
    <>
      <Formulario
      onSubmit = {handleSubmit(onSubmit)}
      autoComplete = 'off'>
      {/*SECCION DE LOS PRECIOS DEL CLIENTE*/}
      {/*ENCABEZADO*/}
      <Encabezado>Precios de los productos</Encabezado>
      {/*INPUTS DE LOS PRECIOS*/}
      <Precios>
        {campos.map((campo, index) => (
          <InputPrecio key={index}>
            <Texto>{campo + ':'}</Texto>
            <Input
              disabled = {opcion === 2}
              type = 'number'
              step = '0.1'
              {...register(campo, {
                required: true,
                min: 0,
                valueAsNumber: true
              })}/>
          </InputPrecio>
        ))}
      </Precios>
      <Reset
        disabled = {opcion === 2}
        type = 'button'
        value = 'Reiniciar formulario'
        onClick = {() => {reset();}}/>
      <input
        style={{display : 'none'}}
        type = 'submit' 
        value = 'Agregar precios'
        ref = {submitRef}/>
    </Formulario>
    </>
    
  )
};

export default FormularioPreciosCliente;