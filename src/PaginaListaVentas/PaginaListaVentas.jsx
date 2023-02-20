// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import { TaskBar } from '../BarraTareas/BarraTareas';
import ColumnasLista from '../componentes/ColumnasLista';
import FiltroListaVentas from './FiltroListaVentas';
import ListaVentasRenglones from './ListaVentasRenglones';
import VentanaEmergenteDetallesVenta from './VentanaEmergenteDetallesVenta';
import VentanaEmergenteResumenVentas from './VentanaEmergenteResumenVentas';

// Estilos ///////////////////////////////////////////////////////////////////////
// Estilo para el componente completo
const Principal = styled.div`
	background: linear-gradient(rgb(54, 54, 82), 15%,rgb(84, 106, 144), 60%, rgb(68, 111, 151));
    color: black;
    font-weight: 400;
	border-radius: 0px;
	width: 100vw;
    height: 100vh;
    padding: 10px;
	/* Estilo del layout */
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 3fr 7fr;
    grid-template-rows: 0.5fr 0.9fr 5.6fr 1.5fr;
	grid-template-areas:
	    'BarraTareas BarraTareas'
		'PanelControl Columnas'
		'PanelControl ContenidoPrincipal'
		'Herramientas ContenidoPrincipal';
`;

// Estilos para el formulario de filtrado
const PanelControl = styled.div`
	grid-area: PanelControl;
	position: relative;
	display: flex;
	justify-content: center;
	border-radius: 5px;
`;

// Estilos para los renglones de productos
const ContenidoPrincipal = styled.div`
	grid-area: ContenidoPrincipal;
	background-color: white;
	position: relative;
	overflow: auto;
	padding: 10px;
	justify-content: center;
	border-radius: 5px;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15); 
	

	-ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar{
      display: none;
    }
`;

// Estilos para la seccion de resumen de ventas y exportar tablas
const Herramientas = styled.div`
  background: white;
  color: black;
  grid-area: Herramientas;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'Resumen'
  					   'Exportar';
  align-items: center;
  justify-items: center;
`;

// Estilo para los botones
const Button = styled.button`
     width: 60%;
	 height: 35px;
	 background-color: green;
	 color: white;
	 font-weight: bold;
	 box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

	&:hover{
	background-color: #00a100;
	box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
	}
`;

// Estilo para el boton de resumen
const BotonResumen = styled(Button)`
	grid-area: Resumen;
`;

// Estilo para el boton de exportar
const BotonExportar = styled(Button)`
	grid-area: Exportar;
`;

// Constantes
const NombresColumnas = [
	'ID',
	'CLIENTE',
	'FECHA',
	'HORA',
	'TIPO DE VENTA',
	'REPARTIDOR',
	'ATIENDE',
	'TIPO DE PAGO',
	'STATUS'
];

// Componente ///////////////////////////////////////////////////////////////////////
const PaginaListaVentas = ({ ventasIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente

	// Custom Hook para crear el estado filtros y destructurar sus componentes y su manejarFiltros
	const {
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal,
		manejarFiltros
	} = useFiltros();

	// Hook para guardar los detalles de la venta
	const [ventaDetalles, setVentaDetalles] = useState({});

	// Hook para mostrar el resumen de venta
	const [mostrarResumen, setMostrarResumen] = useState(false);

	// Custom hook para mostrar los detalles de la venta
	const {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesVenta
	} = useVentanaEmergente(setVentaDetalles);

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. LLamar a las funciones que modifican los estados

	// 1. Filtrar ventas por campo seleccionado
	let ventasFiltradas = filtrarVentasPorCampo(
		ventasIniciales,
		filtrarPor,
		buscar
	);

	// 2. Filtrar ventas por fecha
	ventasFiltradas = filtrarVentasPorFecha(
		ventasFiltradas,
		fechaInicio,
		fechaFinal
	);

	// 3. Filtrar ventas por hora
	ventasFiltradas = filtrarVentasPorHora(
		ventasFiltradas,
		horaInicio,
		horaFinal
	);

	// 4. Ordenar ventas por campo seleccionado
	ventasFiltradas = ordenarVentas(ventasFiltradas, ordenarPor);

	// Parte 3. HTML que se renderiza
	return (
		// Un estilo para todo el componente
		<Principal>
			{/* BARRA DE NAVEGACION */}
			<TaskBar/>
			{/* CONTENIDO PRINCIPAL */}
			{/* FILTRO DE USUARIOS */}
			<PanelControl>
				<FiltroListaVentas
					manejarFiltros={manejarFiltros}
					setMostrarResumen={setMostrarResumen}
				/>
			</PanelControl>
			
            {/* DESCRIPCION DE LA LISTA */}
			<ColumnasLista NombresColumnas={NombresColumnas}/>

			{/* LISTA DE USUARIOS */}
			<ContenidoPrincipal>
				<ListaVentasRenglones
					ventas={ventasFiltradas}
					mostrarDetallesVenta={mostrarDetallesVenta}
				/>
			</ContenidoPrincipal>

			{/* HERRAMIENTAS */}
			<Herramientas>
				{/* EXPORTAR VENTAS */}
				<BotonExportar type='submit'>Descargar tabla de ventas</BotonExportar>

				{/* MOSTRAR RESUMEN DE VENTAS */}
				<BotonResumen onClick={setMostrarResumen} type='submit'>
					Mostrar resumen de ventas
				</BotonResumen>
			</Herramientas>

			{/* VENTANA EMERGENTE CON DETALLES DE VENTA */}
			<VentanaEmergenteDetallesVenta
				estado={estadoVentanaEmergente}
				cambiarEstado={setEstadoVentanaEmergente}
				ventaDetalles={ventaDetalles}
			/>

			{/* VENTANA EMERGENTE CON RESUMEN DE VENTAS */}
			<VentanaEmergenteResumenVentas
				mostrarResumen={mostrarResumen}
				setMostrarResumen={setMostrarResumen}
				ventas={ventasFiltradas}
			/>
		</Principal>
	);
};

// Parte 4. Crear las funciones que generan los custom hooks

// Función para crear estado filter y su API
const useFiltros = () => {
	// Crear estado filtros
	const [filtros, setFiltros] = useState({
		buscar: '',
		filtrarPor: 0,
		ordenarPor: 0,
		fechaInicio: '',
		fechaFinal: '',
		horaInicio: '',
		horaFinal: ''
	});

	// Funcion para modificar el estado filtros
	const manejarFiltros = (
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	) => {
		setFiltros({
			buscar,
			filtrarPor,
			ordenarPor,
			fechaInicio,
			fechaFinal,
			horaInicio,
			horaFinal
		});
	};

	return {
		...filtros,
		manejarFiltros
	};
};

// Funcion para crear estado estadoVentanaEmergente y su API
const useVentanaEmergente = setVentaDetalles => {
	// Crear estado
	const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

	// Funcion para cambiar detalles de venta y mostrar los detalles de venta
	const mostrarDetallesVenta = detallesVenta => {
		// Cambiar detallesVenta
		setVentaDetalles(detallesVenta);
		// Cambiar para mostrar ventana emergente
		setEstadoVentanaEmergente(true);
	};

	return {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesVenta
	};
};

// Parte 5. Crear las funciones que manipulan los estados

// Funcion para filtrar usuarios por campo seleccionado
const filtrarVentasPorCampo = (ventas, campo, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...ventas];
	// Pasa el valor de buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();

	// Filtra ventas por el campo seleccionado y el valor de busqueda
	switch (campo) {
		// Filtrar usuarios por nombre del cliente
		case 0:
			return ventas.filter(venta =>
				venta.CLIENTE.toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por tipo de venta
		case 1:
			return ventas.filter(venta =>
				venta['TIPO DE VENTA'].toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por tipo de pago
		case 2:
			return ventas.filter(venta =>
				venta['TIPO DE PAGO'].toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por status
		case 3:
			return ventas.filter(venta =>
				venta.STATUS.toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por nombre del repartidor
		case 4:
			return ventas.filter(venta =>
				venta.REPARTIDOR.toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por nombre del que atiende
		case 5:
			return ventas.filter(venta =>
				venta.ATIENDE.toLowerCase().startsWith(minusculaBusqueda)
			);
	}
};

// Funcion para filtrar ventas por fecha
const filtrarVentasPorFecha = (ventas, fechaInicio, fechaFinal) => {
	// Si no hay fechas seleccionadas regresa todas las ventas
	if (!fechaInicio || !fechaFinal) return [...ventas];

	// Utilizar la funcion estaEntreFechas para filtrar cada fecha
	return ventas.filter(venta =>
		estaEntreFechas(venta.FECHA, fechaInicio, fechaFinal)
	);
};

// Funcion para saber si una fecha se encunetra dentro de un rango de fechas
const estaEntreFechas = (fechaStr, fechaInicioStr, fechaFinalStr) => {
	// Convertir el str fecha a un objeto Date
	const [dia, mes, anio] = fechaStr.split('/');
	const fecha = new Date(+anio, +mes - 1, +dia);
	// En el caso de fechaInicio y fechaFinal el formato de str permite convertirlas directamente a Date
	const fechaInicio = new Date(fechaInicioStr);
	const fechaFinal = new Date(fechaFinalStr);

	// Provar si la fecha esta en el rango de fechas
	return fechaFinal > fecha && fecha > fechaInicio;
};

// Funcion para filtrar ventas por hora
const filtrarVentasPorHora = (ventas, horaInicio, horaFinal) => {
	// Si no hay horas seleccionadas regresa todas las ventas
	if (!horaInicio || !horaFinal) return [...ventas];

	// Regresar las ventas con hora entre el rango de horas
	return ventas.filter(
		venta => horaInicio < venta.HORA && venta.HORA < horaFinal
	);
};

// Función para ordenar las ventas
const ordenarVentas = (ventas, ordenarPor) => {
	// Crear copia de ventas
	const ventasOrdenadas = [...ventas];
	switch (ordenarPor) {
		// Ordenar tabla de ventas por nombre de cliente
		case 1:
			return ventasOrdenadas.sort((a, b) => {
				if (a.CLIENTE > b.CLIENTE) return 1;
				if (a.CLIENTE < b.CLIENTE) return -1;
				return 0;
			});

		// Ordenar tabla de ventas por fecha
		case 2:
			return ventasOrdenadas.sort((a, b) => {
				const [diaA, mesA, anioA] = a.FECHA.split('/');
				const fechaA = new Date(+anioA, +mesA - 1, +diaA);
				const [diaB, mesB, anioB] = b.FECHA.split('/');
				const fechaB = new Date(+anioB, +mesB - 1, +diaB);
				if (fechaA > fechaB) return 1;
				if (fechaA < fechaB) return -1;
				return 0;
			});

		// Ordenar tabla de ventas por hora
		case 3:
			return ventasOrdenadas.sort((a, b) => {
				if (a.HORA > b.HORA) return 1;
				if (a.HORA < b.HORA) return -1;
				return 0;
			});

		// Ordenar tabla de ventas por nombre de repartidor
		case 4:
			return ventasOrdenadas.sort((a, b) => {
				if (a.REPARTIDOR > b.REPARTIDOR) return 1;
				if (a.REPARTIDOR < b.REPARTIDOR) return -1;
				return 0;
			});

		// Ordenar tabla de ventas por nombre del que atiende
		case 5:
			return ventasOrdenadas.sort((a, b) => {
				if (a.ATIENDE > b.ATIENDE) return 1;
				if (a.ATIENDE < b.ATIENDE) return -1;
				return 0;
			});
		default:
			return ventasOrdenadas;
	}
};

export default PaginaListaVentas;
