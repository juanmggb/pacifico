import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { TaskBar } from '../BarraTareas/BarraTareas';

/* ============================ Estilos CSS del componente InicioSesion =====================*/

// Estilos de la página //
const Principal = styled.div `
  position: relative;
  width: 100vw;
  height: 100vh;
  background:  
  linear-gradient(rgba(0, 0, 0, 0), 80%, rgba(0, 0, 0, 0.5)),
  url('../imagenes/background1.jpg');
  background-size: 100% 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 8fr;
  grid-template-areas: 'BarraTareas'
                        'InicioSesion';
  align-items: center;
  justify-items: center;
`;



const FormularioContenedor = styled.div `
  grid-area: InicioSesion;
  height: 80%;
  width: 350px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
  grid-template-areas: 'Logo'
                        'Form';
`;

const Logo = styled.div`
  grid-area: Logo;
  display: flex;
  background-image: url('../imagenes/hielo-logo-azul.png');
  background-size: 100% 100%;
  align-items: center;
  justify-content: center;
`

const Form = styled.form `
  grid-area: Form;
  border-radius: 10px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 50px 100px;
  grid-template-areas: 'User'
                       'Password'
                       'Ingresar';
  justify-items: center;
  align-items: center;
`;

const Input = styled.input `
  width: 70%;
  height: 50px;
  text-align: center;
  font-weight: 700;
  background-color: white;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.5);
  &:focus {
    outline: none;
    border: none;
  }
  &:hover {
    border: none;
  }
  &::placeholder{
    opacity: 0.6;
    font-weight: 700;
    text-align: center;
  }
`;

const User = styled(Input) `
  grid-area: User;
`;

const Password = styled(Input) `
  grid-area: Password;
`;

const Ingresar = styled(Input) `
  grid-area: Ingresar;
  background-color: black;
  color: white;
  font-weight: 700;
  
  
  &:hover{
    box-shadow: 0px 2px 5px 4px rgba(255, 255, 255, 0.5);
  }
`;


/*========================= Codigo TSX componente InicioSesion ==============================*/
//Tipo de datos que utiliza el formulario de inicio de sesión


//Funcion de la pagina de Inicio de Sesion

function PaginaInicioSesion () {

  const {register, handleSubmit, watch, reset, formState: { isSubmitSuccessful }} = useForm({
    defaultValues: {
      user: '',
      password: ''
    }});

    const onSubmit = (data) => {
      console.log('usuario: ', data.user);
      console.log('contraseña: ', data.password);
    };

    useEffect(() => {
      reset({
        user: '',
        password: ''
      })
    }, [isSubmitSuccessful]);

    return (
      <Principal>
        <TaskBar className = 'TaskBar' />
        <FormularioContenedor>
          <Logo></Logo>
          <Form  onSubmit = {handleSubmit(onSubmit)} autoComplete = 'off'>
            <User
              {...register('user', {
                required: {
                  value: true,
                  message:'Ingrese el usuario'}
              })}
              placeholder = 'Usuario'>
            </User>
            <Password
              {...register('password', {
                required: {
                  value: true,
                  message: 'Ingrese la contraseña'}
              })}
              placeholder = 'Contraseña'>
            </Password>
            <Ingresar
              type = 'submit'
              value = 'Ingresar'>
            </Ingresar>
          </Form>
        </FormularioContenedor>
      </Principal>
    )

}

export default PaginaInicioSesion