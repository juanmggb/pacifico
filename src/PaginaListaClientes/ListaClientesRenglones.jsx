// Importar modulo
import styled from 'styled-components';

// Importar componente
import ClienteRenglon from './ClienteRenglon';

// Estilos //////////////////////////////////////////////////
// Estilos para el contenedor de las ventas
const ListaClientes = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  grid-auto-rows: 60px;
  grid-gap: 15px;
`;

// Componente ///////////////////////////////////////////////////////////////
const ListaClientesRenglones = ({ clientes, mostrarDetallesCliente }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza
	// Si no hay clientes, regresa el parrafo no hay clientes
	if (!clientes.length) return <p>No hay clientes</p>;
	// Si hay clientes regresa los componentes ClienteRenglon por cada uno

	return (
		<ListaClientes>
			{clientes.map(cliente => (
				<ClienteRenglon
					key={cliente.ID}
					cliente={cliente}
					mostrarDetallesCliente={mostrarDetallesCliente}
				/>
			))}
		</ListaClientes>
	);
};

export default ListaClientesRenglones;
