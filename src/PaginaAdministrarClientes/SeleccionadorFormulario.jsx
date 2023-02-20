import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

/*======================================== Estilos CSS del componente =====================================================*/
const SelectFormulario = styled.select `
  grid-area: Seleccionador;
  width: 70%;
  height: 40px;
  font-weight: bold;
  background-color: white;
  justify-self: center;
  text-align: center;
  margin-bottom: 50px;

  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
`;

// Valores de los estados del formulario

const propiedadesFormulario = [
  {opcion: 0, titulo: 'Agregar cliente a la base de datos'},
  {opcion: 1, titulo: 'Modificar cliente de la base de datos'},
  {opcion: 2, titulo: 'Eliminar cliente de la base de datos'}
];

/*===============================================================================================================*/
/*================================ Funcion JSX del Seleccionador del formulario =================================*/

function SeleccionadorFormulario ({setFormulario, resetCliente}) {

  const {register, watch} = useForm({ defaultValues: {Formulario: 0}});

  const watchOpcion = watch('Formulario');

  // Resetear la informacion del cliente cuando se cambia de formulario para no guardar informacion
  // por error
  useEffect(() => {
    setFormulario(propiedadesFormulario[watchOpcion]);
    resetCliente();
  }, [watchOpcion]);

  return(
      <SelectFormulario
      {...register('Formulario', {
        valueAsNumber: true
      })}>
      <option 
        key ={0} 
        value= {0} >Agregar Cliente</option>
      <option 
        key ={1} 
        value= {1} >Modificar Cliente</option>
      <option 
        key ={2} 
        value= {2} >Eliminar Cliente</option>
    </SelectFormulario>
  );
};

export default SeleccionadorFormulario;