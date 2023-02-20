import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/*========================================================================================================*/
/*========================================= Estilos CSS ==================================================*/
const Formulario = styled.form`
  width: 100%;
  height: 200px;
  padding: 20px;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);

  display: grid;
  grid-gap: 20px;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas: 'Titulo Titulo Titulo'
                       'Nombre Cantidad Imagen'
                       'Botones Botones Botones';
`;

const Titulo = styled.div`
  grid-area: Titulo;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
`;

const Contenedor = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'Texto'
                       'Input';

  align-items: center;
  justify-items: center;
`;

const Nombre = styled(Contenedor)`
  grid-area: Nombre;
`;

const Cantidad = styled(Contenedor)`
  grid-area: Cantidad;
`;

const Imagen = styled(Contenedor)`
  grid-area: Imagen;
`;

const Texto = styled.div`
  grid-area: Texto;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
`;

const Input = styled.input`
  grid-area: Input;
  width: 100%;
  height: 100%;

  font-weight: bold;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 5px;
  text-align: center;
`;

const Botones = styled.div`
  grid-area: Botones;
  width: 50%;
  height: 100%;

  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'Confirmar Reset';

  align-self: center;
  justify-self: center;
`;

const Confirmar = styled.input`
  grid-area: Confirmar;
  width: 100%;
  height: 100%;

  font-weight: bold;
  background-color: green;
  color: white;

  &:hover:enabled {
  background-color: #00a100;
  box-shadow: 0px 2px 5px 1px rgba(0, 161, 0, 0.8);
  }

  &:disabled {
    background-color: #012b00;
  }
`;

const Reset = styled.input`
  grid-area: Reset;
  width: 100%;
  height: 100%;

  font-weight: bold;
  background-color: #c70000;
  color: white;

  &:hover:enabled {
  background-color: #e70000;
  box-shadow: 0px 2px 5px 1px rgba(255, 0, 0, 0.8);
  }

  &:disabled {
    background-color: #a70000;
  }
`;

/*========================================================================================================*/
/*==================================== Funcion JSX del componente ========================================*/

function CrearProducto ({agregarProducto, resetProductos}) {

  // Funciones para manejar el estado del formulario
  const {register, handleSubmit, reset} = useForm({});

 // Funcion para agregar el nuevo producto
 const onSubmit = (data) => {
  agregarProducto(data);
 };

  return(
  <Formulario
    onSubmit = {handleSubmit(onSubmit)}>
    <Titulo>Crear nuevo producto</Titulo>
    <Nombre>
      <Texto>Ingrese el nombre del producto</Texto>
      <Input 
        type = 'text'
        placeholder = 'Nombre'
        {...register('NOMBRE', {
          required: true
        })}/>
    </Nombre>
    <Cantidad>
      <Texto>Ingrese la cantidad</Texto>
      <Input 
        type = 'number'
        placeholder = 'Cantidad'
        {...register('CANTIDAD', {
          required: true,
          valueAsNumber: true,
          validate: {
            esEntero: (value) => Number.isInteger(value),
            esPositivo: (value) => (value > 0),
          }
        })}/>
    </Cantidad>
    <Imagen>
      <Texto>Seleccione la imagen</Texto>
      <Input
        type = 'file'
        accept = 'image/*'
        {...register('IMAGEN', {
          required: true
        })}/>
    </Imagen>
    <Botones>
      <Confirmar 
        type = 'submit'
        value = 'Confirmar'/>
      <Reset
        type = 'button'
        value = 'Reiniciar datos'
        onClick = {() => {
          reset();
          resetProductos();}} />
    </Botones>
  </Formulario>)
}

export default CrearProducto;