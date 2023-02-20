// Importar modulos
import styled from 'styled-components';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const VentaRenglonEstilo = styled.div`
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
const VentaRenglon = ({ venta, mostrarDetallesVenta }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Obtener valores en ventas y modificar nombre si es necesario
	const {
		ID,
		CLIENTE,
		FECHA,
		HORA,
		'TIPO DE VENTA': TIPO_VENTA,
		REPARTIDOR,
		ATIENDE,
		'TIPO DE PAGO': TIPO_PAGO,
		STATUS
	} = venta;

	// Guardar valores en array para usar map
	const ValoresRenglon = [
		Math.floor(ID / 1e31),
		CLIENTE,
		FECHA,
		HORA,
		TIPO_VENTA,
		REPARTIDOR,
		ATIENDE,
		TIPO_PAGO,
		STATUS
	];

	// Funcion para mostrar los detalles de la venta seleccionada
	const llamarMostrarDetallesVenta = venta => {
		// Obtener valores de venta para informacion detallada
		const {
			PRODUCTOS: productos,
			'MONTO TOTAL': total,
			OBSERVACION: observacion
		} = venta;

		// Llamar a la funcion para mostrar los detalles de la venta
		mostrarDetallesVenta({ productos, total, observacion });
	};

	// Parte 2. HTML que se renderiza
	return (
		<VentaRenglonEstilo onClick={() => llamarMostrarDetallesVenta(venta)}>
			{ValoresRenglon.map((ValorRenglon, index) => (
				<div key={index}>
					<span>{ValorRenglon}</span>
				</div>
			))}
		</VentaRenglonEstilo>
	);
};

export default VentaRenglon;
