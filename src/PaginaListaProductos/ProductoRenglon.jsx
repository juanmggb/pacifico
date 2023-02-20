// Importar modulos
import styled from 'styled-components';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const ProductoRenglonEstilo = styled.div`
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
const ProductoRenglon = ({ ID, NOMBRE, CANTIDAD }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza en UserListRows
	return (
		// Estilo del componente
		<ProductoRenglonEstilo>
			<div><span>{Math.floor(ID / 1e31)}</span></div>
			<div><span>{NOMBRE}</span></div>
			<div><span>{CANTIDAD}</span></div>
			<div><span>{Math.floor(CANTIDAD / 24)}</span></div>
		</ProductoRenglonEstilo>
	);
};

export default ProductoRenglon;
