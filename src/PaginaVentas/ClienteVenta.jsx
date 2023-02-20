import styled from 'styled-components';
import UseTamañoPantalla from '../PaginaRutaRepartidores/UseTamañoPantalla'
/*==============================================================================================================*/
/*========================================== Estilos CSS =======================================================*/

const ClienteVentaDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${props => (props.ancho < 460) ? '20%':'40%'};
  padding-right: 1px;
`;

const EliminarBoton = styled.div`
  position: relative;
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
function ClienteVenta({cliente, resetClientes, resetProductos}){
  
  //Hook para obtener el tamaño de la pantalla
  const {ancho, alto} = UseTamañoPantalla();
  
  if(!cliente) return<Texto>Seleccione un cliente</Texto>

  return(
    <ClienteVentaDiv ancho= {ancho}>
      <Texto>{cliente.NOMBRE}</Texto>
      <EliminarBoton onClick={() => {resetClientes(); resetProductos()}}>
        Eliminar
      </EliminarBoton>
    </ClienteVentaDiv>
  );
};

export default ClienteVenta;