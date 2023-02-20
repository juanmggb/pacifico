import styled from 'styled-components';
import ProductoRuta from './ProductoRuta';

/*=============================================================================================================*/
/*============================================== Estilos CSS ==================================================*/
const ListaProductos= styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px;
  grid-auto-rows: 120px;
  grid-gap: 15px;
`;

const Mensaje = styled.p`
  user-select: none;
  font-weight: bold;
`;

/*=============================================================================================================*/
/*========================================= Componente JSX ====================================================*/
function ListaProductosRuta({productos, eliminarProducto, agregarCantidad, modificarEstado}){

  // Si no hay productos seleccionados mostrar el siguiente texto
  if(!productos.length) return <Mensaje>No hay productos agregados</Mensaje>

  return(
    <ListaProductos>
      {productos.map(producto => (
        <ProductoRuta 
          key={producto.ID} 
          producto={producto} 
          eliminarProducto={eliminarProducto} 
          agregarCantidad={agregarCantidad}
          modificarEstado={modificarEstado}/>
      ))}
    </ListaProductos>
  )
}

export default ListaProductosRuta