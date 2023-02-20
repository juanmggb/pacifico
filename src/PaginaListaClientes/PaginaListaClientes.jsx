// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import { TaskBar } from '../BarraTareas/BarraTareas';
import ColumnasLista from '../componentes/ColumnasLista';
import FiltroListaClientes from './FiltroListaClientes';
import ListaClientesRenglones from './ListaClientesRenglones';
import VentanaEmergenteDetallesCliente from './VentanaEmergenteDetallesCliente';

// Estilos //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
	grid-template-rows: 0.5fr 0.9fr 5.1fr 2fr;
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
	padding: 15px;
	justify-content: center;
	border-radius: 5px;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15); 
	

	-ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar{
      display: none;
    }
`;

const Herramientas = styled.div`
  background: #ffffff;
  color: black;
  grid-area: Herramientas;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Estilo para el boton de descargar clientes

const Button = styled.button`
     width: 70%;
	 height: 50px;
	 background-color: green;
	 color: white;
	 font-weight: bold;
	 box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

	&:hover{
	background-color: #00a100;
	box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
	}
`;

// Constantes
const NombresColumnas = [
	'ID',
	'CLIENTE',
	'CONTACTO'
];


// Componente ///////////////////////////////////////////////////////////////////////
const PaginaListaClientes = ({ clientesIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente
	// Custom Hook para crear el estado filters y destructurar sus componentes y su handleFilters
	const { buscar, filtrarPor, ordenarPor, manejarFiltros } = useFiltros();

	// Hook para guardar al empleado seleccionado para mostrar
	// sus detalles
	const [clienteDetalles, setClienteDetalles] = useState({});
	// Custom hook para mostrar los detalles del empleado
	const {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesCliente
	} = useVentanaEmergente(setClienteDetalles);
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Llamar funciones para modificar la lista de usuarios a partir de los datos del formulario
	// 1. Filtrar usuarios por nombre
	let clientesFiltrados = filtrarProductosPorNombre(
		clientesIniciales,
		filtrarPor,
		buscar
	);

	// 3. Ordenar usuarios
	clientesFiltrados = ordenarClientes(clientesFiltrados, ordenarPor);
    
	// Crear los campos de los productos
	const camposProductos = crearCamposProductos(clientesIniciales[0].PRODUCTOS_PRECIOS);

	// Parte 3. Crear el HTML que se va a renderizar en App
	return (
		// Un estilo para todo el componente
		<Principal>
			{/* BARRA DE NAVEGACION */}
			<TaskBar/>
			{/* DESCRIPCION DE LA LISTA */}
			<ColumnasLista NombresColumnas={NombresColumnas}/>
			{/* FILTRO DE USUARIOS */}
			<PanelControl>
				<FiltroListaClientes manejarFiltros={manejarFiltros} />
			</PanelControl>

			{/* LISTA DE USUARIOS */}
			<ContenidoPrincipal>
				<ListaClientesRenglones
					clientes={clientesFiltrados}
					mostrarDetallesCliente={mostrarDetallesCliente}
				/>
			</ContenidoPrincipal>
			{/* HERRAMIENTAS */}
			<Herramientas>
				{/* BOTON PARA DESCARGAR LA LISTA DE CLIENTES */}
				<Button type='submit'>Descargar lista de clientes</Button>
			</Herramientas>
			{/* VENTANA EMERGENTE CON DETALLES DEl CLIENTE*/}
			<VentanaEmergenteDetallesCliente
				estado={estadoVentanaEmergente}
				cambiarEstado={setEstadoVentanaEmergente}
				clienteDetalles={clienteDetalles}
				camposProductos = {camposProductos}
			/>
		</Principal>
	);
};
// Funciones /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parte 4. Crear las funciones que generan los custom hooks
// Funcion para crear estado filtros y su API
const useFiltros = () => {
	const [filtros, setFiltros] = useState({
		buscar: '',
		filtrarPor: 0,
		ordenarPor: 0
	});
	const manejarFiltros = (buscar, filtrarPor, ordenarPor) => {
		setFiltros({ buscar, filtrarPor, ordenarPor });
	};

	return {
		...filtros,
		manejarFiltros
	};
};

// Funcion para crear estado users y su API

// Parte 5. Crear las funciones que manipulan los estados
// Funcion para filtrar usuarios por nombre
const filtrarProductosPorNombre = (clientes, campo, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...clientes];
	// Pasa el nombre a buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();

	switch (campo) {
		// Filtrar usuarios por nombre del cliente
		case 0:
			return clientes.filter(cliente =>
				cliente.NOMBRE.toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por tipo de venta
		case 1:
			return clientes.filter(cliente =>
				cliente.CONTACTO.toLowerCase().startsWith(minusculaBusqueda)
			);
	}
};

// Función para ordenar los usuarios
const ordenarClientes = (clientes, ordenarPor) => {
	const clientesOrdenados = [...clientes];
	switch (ordenarPor) {
		case 1:
			return clientesOrdenados.sort((a, b) => {
				if (a.NOMBRE > b.NOMBRE) return 1;
				if (a.NOMBRE < b.NOMBRE) return -1;
				return 0;
			});
		case 2:
			return clientesOrdenados.sort((a, b) => {
				if (a.CONTACTO > b.CONTACTO) return 1;
				if (a.CONTACTO < b.CONTACTO) return -1;
				return 0;
			});
		default:
			return clientesOrdenados;
	}
};

// Funcion para crear estado estadoVentanaEmergente y su API
const useVentanaEmergente = setClienteDetalles => {
	// Crear estado
	const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

	// Funcion para cambiar detalles de venta y mostrar los detalles de venta
	const mostrarDetallesCliente = cliente => {
		// El cliente completo se establece como clienteDetalles
		setClienteDetalles(cliente);

		// Cambiar para mostrar ventana emergente
		setEstadoVentanaEmergente(true);
	};

	return {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesCliente
	};
};

const crearCamposProductos = (productos) => {

	const listaProductos = Object.keys(productos);
	const objetoProductos = {...productos};
  
	listaProductos.map((producto) => {
	  objetoProductos[producto] = producto;
	});
  
	return objetoProductos;
  }

export default PaginaListaClientes;
