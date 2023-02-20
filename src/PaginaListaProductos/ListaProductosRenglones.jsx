// Importar componentes
import styled from 'styled-components';
import ProductoRenglon from './ProductoRenglon';
// Estilos //////////////////////////////////////////////////
const ListaProductos= styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  grid-auto-rows: 60px;
  grid-gap: 15px;
`;

// Componente ///////////////////////////////////////////////////////////////
const ListaProductosRenglones = ({ productos }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza en UsersList
	// Si no hay usuarios, regresa el parrafo no hay usuarios
	if (!productos.length) return <p>No hay productos</p>;
	// Si hay usuarios regresa los componentes UserRow por cada uno
	// No usamos return en map si todo se escribe en una linea
	return (
		<ListaProductos>
			{productos.map(producto => (
				<ProductoRenglon key={producto.ID} {...producto} />
			))}
		</ListaProductos>
	);
};

export default ListaProductosRenglones;
