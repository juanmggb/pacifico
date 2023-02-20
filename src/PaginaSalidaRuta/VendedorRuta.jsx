import styled from 'styled-components';
/*==============================================================================================================*/
/*========================================== Estilos CSS =======================================================*/

const EliminarBoton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 100px;
  height: 35px;
  background-color: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.9em;
  user-select: none;
  cursor: pointer;
`;

const Texto = styled.p`
  user-select: none;
  font-weight: bold;
`;

/*=============================================================================================================*/
/*========================================== Funcion JSX del componente =======================================*/
function VendedorRuta({vendedor, eliminarVendedor}){
  if(!vendedor) return<Texto>Seleccione un vendedor</Texto>

  return(
    <>
      <Texto>{vendedor.NOMBRE}</Texto>
      <EliminarBoton onClick={() => eliminarVendedor()}>Eliminar</EliminarBoton>
    </>
  );
};

export default VendedorRuta;