import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/*========================================================================================================*/
/*============================================ Estilos CSS ===============================================*/

// Estilos del Formulario

const Formulario = styled.form`
  width: 100%;
  padding: 20px 50px 20px 50px;

  // Estructura
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 70px repeat(5, 55px) 50px;
  grid-template-areas:'Encabezado Encabezado'
                      'Cliente Cliente'
                      'Contacto Pago'
                      'Correo Telefono'
                      'Direccion Colonia'
                      'Region CP'
                      'Reset Reset';


  @media screen and (max-width: 900px ){
    padding: 10px 20px 20px 20px;
    grid-gap: 15px;
    grid-template-rows: 60px repeat(5, 40px) 40px;
  }
  `;

// Estilos del encabezado de la seccion 'Informacion del cliente'
const Encabezado = styled.div`
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

// Estilos del campo Nombre
const Cliente = styled.div`
  grid-area: Cliente;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Pago
const Pago = styled.div`
  grid-area: Pago;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Contacto
const Contacto = styled.div`
  grid-area: Contacto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Telefono
const Telefono = styled.div`
  grid-area: Telefono;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Correo
const Correo = styled.div`
  grid-area: Correo;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos de la seccion Direccion
const Direccion = styled.div`
  grid-area: Direccion;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'Calle Numero';
  `;

// Estilos de la seccion Region
const Region = styled.div`
  grid-area: Region;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'Ciudad Municipio';
  `;

// Estilos del campo Calle
const Calle = styled.div`
  grid-area: Calle;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 40px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Calle
const Numero = styled.div`
  grid-area: Numero;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Colonia
const Colonia = styled.div`
  grid-area: Colonia;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Ciudad
const Ciudad = styled.div`
  grid-area: Ciudad;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo Ciudad
const Municipio = styled.div`
  grid-area: Municipio;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;
  `;

// Estilos del campo CP
const CP = styled.div`
  grid-area: CP;
  display: grid;

  grid-gap: 5px;
  grid-template-columns: 70px 1fr;
  grid-template-areas: 'Texto Input';

  align-items: center;
  justify-items: center;

  > input{
    width: 50%;
    justify-self: left;
  }
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
  width: 100%;
  height: 80%;
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

// Estilos del select
const Selector = styled.select`
  grid-area: Input;
  width: 100%;
  height: 80%;
  background-color: #efefef;
  border-radius: 0px;
  border-bottom: 3px solid #2e78d2;

  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;

  &:enabled:hover{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
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
  justify-content: left;
  align-items: center;
`;

// Valores por defecto:

const formValues = {
  NOMBRE: '',
  TIPO_PAGO: 'EFECTIVO',
  CONTACTO: '',
  TELEFONO: NaN,
  CORREO: '',
  CALLE: '',
  NUMERO: NaN,
  COLONIA: '',
  CIUDAD: '',
  MUNICIPIO: 'URUAPAN',
  CP: NaN
};


/*========================================================================================================*/
/*=================================== Funcion JSX del componente =========================================*/

function FormularioInformacionCliente ({datosCliente, opcion, submitRef, agregarInformacion, agregarDireccion}) {

  // Funciones de la librería react-hook-form para el formulario
  const {register,
         handleSubmit,
         reset} = useForm({
          defaultValues: {
            ...formValues
         }});

  // Cambiar los valores por defecto cuando se va a modificar la informacion de un cliente
  useEffect(() => {

    // Si se va a modificar o eliminar un cliente cambiar los valores por defecto del formulario
    // a la informacion del cliente
    if(opcion !== 0 && datosCliente){

      // Crear los campos para los precios de cada producto
      const {ID, DIRECCION, PRODUCTOS_PRECIOS, ...Informacion} = datosCliente;

      reset({...DIRECCION, ...Informacion});
    } 
    else{

      reset({...formValues});
    }
  }, [datosCliente, opcion]);


  // Funcion para enviar los datos del formulario al estado de cliente
  const onSubmit = (data) => {

    const{CALLE, NUMERO, COLONIA, CIUDAD, MUNICIPIO, CP, ...Informacion} = data;
    
    const Direccion = {CALLE, NUMERO, COLONIA, CIUDAD, MUNICIPIO, CP};
    
    agregarInformacion(Informacion);
    agregarDireccion(Direccion);
  };

  // Resetear el formulario cuando ya se realizó la operacion


  return(
    <>
      <Formulario
      onSubmit = {handleSubmit(onSubmit)}
      autoComplete = 'off'>
      {/*SECCION DE LOS DATOS DEL CLIENTE*/}
      <Encabezado>Informacion del cliente:</Encabezado>
      {/*NOMBRE DE LA EMPRESA*/}
      <Cliente>
        <Texto>Cliente:</Texto>
        <Input
            disabled = {opcion === 2}
            type = 'text'
            {...register('NOMBRE', {
              required: true,
              minLength: 4,
        })}/>
      </Cliente>
      {/*TIPO DE PAGO DEL CLIENTE*/}
      <Pago>
        <Texto>Tipo de pago:</Texto>
        <Selector disabled = {opcion === 2} {...register('TIPO_PAGO')}>
          <option key = 'EFECTIVO' value = 'EFECTIVO'>Efectivo</option>
          <option key = 'CREDITO' value = 'CREDITO'>Credito</option>
        </Selector>
      </Pago>
      {/*NOMBRE DE LA PERSONA ENCARGADA*/}
      <Contacto>
        <Texto>Contacto:</Texto>
        <Input 
          disabled = {opcion === 2}
          type = 'text'
          {...register('CONTACTO', {
            required: true,
            minLength: 8
          })}/>
      </Contacto>
      {/*NUMERO TELEFONO DEL CONTACTO*/}
      <Telefono>
        <Texto>Telefono:</Texto>
        <Input 
          disabled = {opcion === 2}
          type = 'number'
          {...register('TELEFONO', {
            required: true
          })}/>
      </Telefono>
      {/*CORREO DE LA EMPRESA*/}
      <Correo>
        <Texto>Correo:</Texto>
        <Input 
          disabled = {opcion === 2}
          type = 'text'
          {...register('CORREO', {
            required: true
          })}/>
      </Correo>
      {/*CALLE Y NUMERO DE LA EMPRESA*/}
      <Direccion>
      <Calle>
          <Texto>Calle:</Texto>
          <Input
            disabled = {opcion === 2}
            type = 'text'
            {...register('CALLE', {
              required: true
            })}/>
        </Calle>
        <Numero>
          <Texto>Numero:</Texto>
          <Input
            disabled = {opcion === 2}
            type = 'number'
            {...register('NUMERO')}/>
        </Numero>
      </Direccion>
      {/*COLONIA DE LA EMPRESA*/}
      <Colonia>
        <Texto>Colonia:</Texto>
        <Input
          disabled = {opcion === 2} 
          type = 'text'
          {...register('COLONIA', {
            required: true
          })}/>
      </Colonia>
      <Region>
        {/*CIUDAD DEL EMPLEADO*/}
        <Ciudad>
          <Texto>Ciudad:</Texto>
          <Input
            disabled = {opcion === 2}
            type = 'text'
            {...register('CIUDAD', {
              required: true
            })}/>
        </Ciudad>
        {/*MUNICIPIO DEL EMPLEADO*/}
        <Municipio>
          <Texto>Municipio:</Texto>
          <Selector Selector disabled = {opcion === 2} {...register('MUNICIPIO')}>
          <option key = 'URUAPAN' value = 'URUAPAN'>Uruapan</option>
          <option key = 'LAZARO' value = 'LAZARO'>Lazaro Cardenas</option>
          <option key = 'MORELIA' value = 'MORELIA'>Morelia</option>
        </Selector>
        </Municipio>
      </Region>
      {/*C.P DE LA EMPRESA*/}
      <CP>
        <Texto>C.P:</Texto>
        <Input
          disabled = {opcion === 2}
          type = 'number'
          {...register('CP', {
            required: true,
            minLength: 5,
            maxLength: 5
          })}/>
      </CP>
      <Reset
        disabled = {opcion === 2}
        type = 'button'
        value = 'Reiniciar formulario'
        onClick = {() => {reset();}}/>
      <input
        style={{display : 'none'}} 
        type = 'submit' 
        value = 'Agregar informacion'
        ref = {submitRef}/>
    </Formulario>
    </>
    
  )};

export default FormularioInformacionCliente;