import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import FormularioSelect from '../componentes/FormularioSelect';

/*========================================== Estilos CSS ==============================================*/
/*=====================================================================================================*/
const ContenedorFormulario = styled.div`
  width: 100%;
  height: 70%;
  background-color: transparent;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
`;

const Texto = styled.div`
  width: 100%;
  height: 20%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
/*=============================== Funcion JSX del FormularioSalidaRuta ================================*/
/*=====================================================================================================*/

function FormularioSalidaRuta ({productosSelect, 
                                agregarProducto, 
                                clientesSelect, 
                                agregarCliente, 
                                vendedoresSelect, 
                                seleccionarVendedor,
                                vendedor}) 
{
  //  Verificar si ya se seleccionó un vendedor
  const [desactivarSeleccionarVendedor, setDesactivarSeleccionarVendedor] = useState(false);

  useEffect(() => {
    if(vendedor){
      setDesactivarSeleccionarVendedor(true);
    } else{
      setDesactivarSeleccionarVendedor(false)
    }
    
  }, [vendedor]);

  return(
    <>
      <Texto>GENERAR RUTA</Texto>
      <ContenedorFormulario>
        <FormularioSelect
          listaItems={vendedoresSelect}
          agregarItem={seleccionarVendedor}
          textoBoton={'Seleccionar'}
          desactivar={desactivarSeleccionarVendedor}
          />
        <FormularioSelect 
          listaItems={productosSelect} 
          agregarItem={agregarProducto} 
          textoBoton = {'Agregar'}/>
        <FormularioSelect  
          listaItems={clientesSelect} 
          agregarItem={agregarCliente} 
          textoBoton = {'Agregar'}/>
    </ContenedorFormulario>
    </>

  )
}

export default FormularioSalidaRuta;