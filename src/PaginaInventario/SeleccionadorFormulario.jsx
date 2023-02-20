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

/*===============================================================================================================*/
/*================================ Funcion JSX del Seleccionador del formulario =================================*/

function SeleccionadorFormulario ({seleccionarOperacion, resetProductos}) {

  const {register, watch} = useForm({ defaultValues: {Operacion: 0}});

  const watchOpcion = watch('Operacion');
  
  useEffect(() => {
    seleccionarOperacion(watchOpcion);
    resetProductos();
  }, [watchOpcion]);

  return(
      <SelectFormulario
      {...register('Operacion', {
        valueAsNumber: true
      })}>
      <option 
        key ={0} 
        value= {0} >Crear producto</option>
      <option 
        key ={1} 
        value= {1} >Modificar Inventario</option>
      <option 
        key ={2} 
        value= {2} >Eliminar producto</option>
    </SelectFormulario>
  );
};

export default SeleccionadorFormulario;