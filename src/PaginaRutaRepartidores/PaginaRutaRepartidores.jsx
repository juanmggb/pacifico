import React from "react";
import { useState } from "react";
import styled from "styled-components";

import { TaskBar } from "../BarraTareas/BarraTareas";
import { ListaClienteRepartidor } from "./ListaClienteRepartidor";
import { ListaProductoRepartidor } from "./ListaProductoRepartidor";

const Principal = styled.div`
    background: linear-gradient(rgb(54, 54, 82), 15%,rgb(84, 106, 144), 60%, rgb(68, 111, 151));
    color: black;
    font-weight: 400;
    border-radius: 0px;
    width: 100vw;
    height: 100vh;
    padding: 10px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 2fr 5fr 4fr;
    grid-template-rows: 0.5fr 0.8fr 5.7fr 1.5fr;
    grid-template-areas: 'BarraTareas BarraTareas BarraTareas'
                        'PanelControl ContenidoPrincipal ContenidoPrincipal'
                        'PanelControl ContenidoPrincipal ContenidoPrincipal'
                        'Herramientas ContenidoPrincipal ContenidoPrincipal';
    
    @media screen and (max-width:900px){
        grid-template-rows: 0.5fr 10px 19px 5.7fr 1.5fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'BarraTareas BarraTareas'
                             'gap gap'
                             'CambioSeccion CambioSeccion'
                             'ContenidoPrincipal ContenidoPrincipal'
                             'ContenidoPrincipal ContenidoPrincipal';
        grid-gap: 0;
    }
`;

const ContenidoPrincipal = styled.div`
  grid-area: ContenidoPrincipal;
  overflow: auto;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  background: white;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
  @media screen and (max-width: 900px){
    width: 100%;
    height: 100%;
    border-top-left-radius: 0 0;
  }
`;

const CambioSeccion = styled.div`
  grid-area: CambioSeccion;
  position: relative;
  display: none;
  background-color: transparent;
  max-width: 220px;
  @media screen and (max-width:900px){
    display: flex;
    flex-direction: row;
    width: 40vw;
    height: 19px;
    font-size: 13px;
    color: black;
    border-top-right-radius: 5% 10%;
    z-index: 100;
    @media screen and (max-width: 350px){
      width: 140px;
    }
  }
`;

const SeccionProductos = styled.div`
    border-top-left-radius: 0 0;
    border-bottom-left-radius: 0 0;
    border-bottom-right-radius: 0 0;
    background-color: ${props => props.estado ? 'rgb(250,250,250)' : 'rgb(245,245,245)'};
    box-shadow: ${props => props.estado ? '1px 1px 3px 1px rgba(0,0,0,0.3) inset' : '0 1px 3px 1px rgba(0,0,0,0.2)'};
    font-weight: ${props => props.estado ? 'bold':'normal'};
    width: 20vw;
    text-align: center;
    @media screen and (max-width: 350px){
      width: 70px;
    }
`;

const SeccionClientes = styled.div`
  border-top-right-radius: 0 0;
  border-bottom-right-radius: 0 0;
  border-bottom-left-radius: 0 0;
  font-weight: ${props => props.estado ? 'bold':'normal'};
  background-color: ${props => props.estado ? 'rgb(245,245,245)' : 'rgb(245,245,245)'};
  box-shadow: ${props => props.estado ? '1px 1px 3px 1px rgba(0,0,0,0.4) inset' : '0 1px 3px 1px rgba(0,0,0,0.2)'};
  text-align: center;
  width: 20vw;
  @media screen and (max-width: 350px){
    width: 70px;
  }
`;

export const PaginaRutaRepartidores = (clientesIniciales, productosIniciales) => {    
    const [estadoSeccionProductos, setEstadoSeccionProductos] = useState(false);
    const [estadoSeccionClientes, setEstadoSeccionClientes] = useState(true);
    const [seccionMostrada, setSeccionMostrada] = useState('Clientes');    

    const preciosPublicos = clientesIniciales[0].PRECIOS;
    const productosActualizados = productosIniciales.map(producto => {
      return {...producto, PRECIO: preciosPublicos[producto.NOMBRE]}
    })

    return(
     <Principal>
        <TaskBar/>

        <CambioSeccion>
            <SeccionClientes 
              estado= {estadoSeccionClientes} 
              onClick= {() => {setEstadoSeccionClientes(true); setEstadoSeccionProductos(false); setSeccionMostrada('Clientes');}}>
                Clientes
            </SeccionClientes>
            <SeccionProductos 
              estado= {estadoSeccionProductos} 
              onClick= {() => {setEstadoSeccionClientes(false); setEstadoSeccionProductos(true); setSeccionMostrada('Productos');}}>
                Productos
            </SeccionProductos>
        </CambioSeccion>
        <ContenidoPrincipal>
          <ListaClienteRepartidor seccionSeleccionada= {seccionMostrada} clientes= {clientes} cantidadClientes= {clientes.length}/>
          <ListaProductoRepartidor seccionSeleccionada= {seccionMostrada} productos= {productosActualizados} cantidadProductos= {productosActualizados.length}/>
        </ContenidoPrincipal>
     </Principal>
    )
};