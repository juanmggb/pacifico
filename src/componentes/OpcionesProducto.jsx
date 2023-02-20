import styled from 'styled-components';
import useTamañoPantalla from '../PaginaRutaRepartidores/UseTamañoPantalla';

const OpcionesProductoDiv = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  grid-area: OpcionesProducto;
  display: grid;
  grid-gap: ${props => (props.ancho > 930) ?  '15px': (props.ancho > 690) ? '8px':'2px'};
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "Confirmar Modificar Eliminar";
  padding: 0;
  padding-right: 4px;
  @media screen and (max-width: 600px){
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: "Confirmar"
                         "Modificar"
                         "Eliminar";
    height: 85%;
    width: 70%;
    justify-self: center;
    padding-top: 0;
    margin-right: 15px;
    align-self: center;
    @media screen and (max-width: 500px){
      height: 75%;
      width: 70%;
      justify-self: center;
      padding: 0;
      align-self: end;
      position: static;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: "Confirmar Modificar Eliminar";
    }
  }
`;

const Boton = styled.button`
 width: 99%;
 height: 30px;
 color: white;
 align-self: center;
 border: none;
 border-radius: 5px;
 font-weight: bold;
 font-size: 0.8em;
 &:hover:enabled {
  height: 35px;
  cursor: pointer;
 }
 @media screen and (max-width: 690px){
  width: 95%;
  font-size: 1.1em;
  @media screen and (max-width: 500px){
    height: 25px;
  }
 }
`;

const Confirmar = styled(Boton)`
  grid-area: Confirmar;
  background-color: green;
  &:disabled {
    background-color: #014000;
  }
`;

const Modificar = styled(Boton)`  
  grid-area: Modificar;
  background-color: #1900ff;
  &:disabled {
    background-color: #030036;
  }
`;

const Eliminar = styled(Boton)`
  grid-area: Eliminar;
  background-color: red;
`;

/*==============================================================================================================*/
/*======================================== Funcion JSX del componente ==========================================*/
function OpcionesProducto ({cantidad, estado, modificarEstado, eliminarProducto, ID, desactivar = false}){
  
  //Hook para usar el tamaño de la pantalla
  const {ancho, alto} = useTamañoPantalla();
  
  return(
    <OpcionesProductoDiv  ancho = {ancho}>
      <Confirmar 
        type = 'button' 
        disabled = {(estado || !cantidad) || desactivar}
        onClick = {() => {
          modificarEstado(ID)
        }}>
          {(ancho > 690) ? <>Confirmar</>:<i className="fa-solid fa-check"/>}
        </Confirmar>
      <Modificar 
        type = 'button'  
        disabled = {!estado || desactivar}
        onClick = {() => {
          modificarEstado(ID)
        }}>
          {(ancho > 690) ? <>Modificar</>:<i className="fa-solid fa-pen-to-square"/>}
        </Modificar>
      <Eliminar 
        type = 'button' 
        onClick={() => {
          eliminarProducto(ID)
        }}>
          {(ancho > 690) ? <>Eliminar</>:<i className="fa-solid fa-xmark"/>}
        </Eliminar>
    </OpcionesProductoDiv>
  );
};

export default OpcionesProducto;