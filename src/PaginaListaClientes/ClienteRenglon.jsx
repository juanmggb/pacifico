// Importar modulos
import styled from 'styled-components';

// Estilos para el componente completo
const ClienteRenglonEstilo = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 0px;
	border-bottom: 2px solid black;
	user-select: none;
	transition: none;

	&:hover {
		align-self: center;
		border-bottom: 3px solid #2e78d2;
		cursor: pointer;

		span{
			font-weight: bold;
		}
	}

	> div {
		width: 100%;
		text-align: center;
	}

	span {
		font-weight: normal;
		font-size: 12px;
		transition: none;
	}
`;

// Componente ////////////////////////////////////////////////////
const ClienteRenglon = ({ cliente, mostrarDetallesCliente }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE
	const { ID, NOMBRE, CONTACTO } = cliente;
	const llamarMostrarDetallesCliente = () => {
		mostrarDetallesCliente(cliente);
	};

	// Parte 2. HTML que se renderiza en UserListRows
	return (
		// Estilo del componente
		<ClienteRenglonEstilo onClick={llamarMostrarDetallesCliente}>
			<div><span>{Math.floor(ID / 1e31)}</span></div>
			<div><span>{NOMBRE}</span></div>
			<div><span>{CONTACTO}</span></div>
		</ClienteRenglonEstilo>
	);
};

export default ClienteRenglon;
