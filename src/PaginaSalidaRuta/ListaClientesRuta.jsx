import styled from 'styled-components';
import ClienteRuta from './ClienteRuta';

/*=============================================================================================================*/
/*============================================== Estilos CSS ==================================================*/
const ListaClientes= styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px;
  grid-auto-rows: 100px;
  grid-gap: 15px;
`;

const Mensaje = styled.p`
  user-select: none;
  font-weight: bold;
`;

/*=============================================================================================================*/
/*========================================= Componente JSX ====================================================*/
function ListaClientesRuta({clientes, eliminarCliente}){

  // Si no hay productos seleccionados mostrar el siguiente texto
  if(!clientes.length) return <Mensaje>No hay clientes agregados</Mensaje>

  return(
    <ListaClientes>
      {clientes.map(cliente => (
        <ClienteRuta key={cliente.ID} cliente = {cliente} eliminarCliente = {eliminarCliente} />
      ))}
    </ListaClientes>
  )
}

export default ListaClientesRuta;