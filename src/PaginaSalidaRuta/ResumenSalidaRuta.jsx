import styled from 'styled-components';

/*==========================================================================================================*/
/*=================================== Estilos CSS del componente ===========================================*/
const ContenedorResumen = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const Vendedor = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Productos = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'Nombre Cantidad';
  margin: 10px 0px 10px 0px;
`;

const Nombre = styled.div`
  grid-area: Nombre;
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Cantidad = styled.div`
  grid-area: Cantidad;
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Clientes = styled.div`
  display: flex;
  flex-direction: column;
  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;


/*============================================================================================================*/
/*=============================== Funcion JSX del componente 'ResumenSalidaRuta' =============================*/
function ResumenSalidaRuta({vendedor, productos, clientes}){
  return(
    <>
      <ContenedorResumen>
        <Vendedor>
          {vendedor.NOMBRE}
        </Vendedor>
        <Productos>
          <Nombre>
            <Texto>Producto</Texto>
            {productos.map(producto => {
              return(<Texto key = {producto.ID}>{producto.NOMBRE}</Texto>)
            })}
          </Nombre>
          <Cantidad>
            <Texto>Cantidad</Texto>
            {productos.map(producto => {
              return(<Texto key = {producto.ID}>{producto.CANTIDADSELECCIONADA}</Texto>)
            })}
          </Cantidad>
        </Productos>
        <Clientes>
          <Texto>Clientes</Texto>
          {clientes.map(cliente => {
            return(<Texto key = {cliente.ID}>{cliente.NOMBRE}</Texto>)
          })}
        </Clientes>
      </ContenedorResumen>
    </>
  );
};

export default ResumenSalidaRuta;