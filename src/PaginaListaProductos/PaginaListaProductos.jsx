// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import { TaskBar } from '../BarraTareas/BarraTareas';
import ColumnasLista from '../componentes/ColumnasLista';
import FiltroListaProductos from './FiltroListaProductos';
import ListaProductosRenglones from './ListaProductosRenglones';


// Estilos //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo para el componente completo
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
	'NOMBRE',
	'ALMACEN',
	'CARGADO'
];
// Componente ///////////////////////////////////////////////////////////////////////
const PaginaListaProductos = ({ productosIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente
	// Custom Hook para crear el estado filters y destructurar sus componentes y su handleFilters
	const { buscar, ordenarPor, manejarFiltros } = useFiltros();

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Llamar funciones para modificar la lista de usuarios a partir de los datos del formulario
	// 1. Filtrar usuarios por nombre
	let productosFiltrados = filtrarProductosPorNombre(
		productosIniciales,
		buscar
	);

	// 3. Ordenar usuarios
	productosFiltrados = ordenarProductos(productosFiltrados, ordenarPor);

	// Parte 3. Crear el HTML que se va a renderizar en App
	return (
		// Un estilo para todo el componente
		<Principal>
			{/* BARRA DE NAVEGACION */}
			<TaskBar/>
			{/* DESCRIPCION DE LA LISTA */}
			<ColumnasLista NombresColumnas={NombresColumnas}/>
			
			{/* CONTENIDO PRINCIPAL */}
			{/* FILTRO DE USUARIOS */}
			<PanelControl>
				<FiltroListaProductos
					manejarFiltros={manejarFiltros}
					productosFiltrados={productosFiltrados}
				/>
			</PanelControl>
			{/* Usamos un ProductoContext para pasar la funcion toggleUsuarioActivo a ProductoEstado */}

			{/* LISTA DE USUARIOS */}
			<ContenidoPrincipal>
				<ListaProductosRenglones productos={productosFiltrados} />
			</ContenidoPrincipal>
			<Herramientas>
				<Button type='submit'>Descargar lista de productos</Button>
			</Herramientas>
		</Principal>
	);
};
// Funciones /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parte 4. Crear las funciones que generan los custom hooks
// Funcion para crear estado filtros y su API
const useFiltros = () => {
	const [filtros, setFiltros] = useState({
		buscar: '',
		ordenarPor: 0
	});
	const manejarFiltros = (buscar, ordenarPor) => {
		setFiltros({ buscar, ordenarPor });
	};

	return {
		...filtros,
		manejarFiltros
	};
};

// Funcion para crear estado users y su API

// Parte 5. Crear las funciones que manipulan los estados
// Funcion para filtrar usuarios por nombre
const filtrarProductosPorNombre = (productos, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...productos];
	// Pasa el nombre a buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();
	console.log(minusculaBusqueda);
	// Filtra los usuarios con el nombre de busqueda
	const productosFiltrados = productos.filter(producto =>
		producto.NOMBRE.toLowerCase().startsWith(minusculaBusqueda)
	);

	return productosFiltrados;
};

// Función para ordenar los usuarios
const ordenarProductos = (productos, ordenarPor) => {
	const productosOrdenados = [...productos];
	switch (ordenarPor) {
		case 1:
			return productosOrdenados.sort((a, b) => {
				if (a.NOMBRE > b.NOMBRE) return 1;
				if (a.NOMBRE < b.NOMBRE) return -1;
				return 0;
			});
		default:
			return productosOrdenados;
	}
};

export default PaginaListaProductos;
