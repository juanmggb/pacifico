import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

//Estilos generales de la barra de navegación
const TaskBarEstilos = styled.nav`
  grid-area: BarraTareas;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px 0;
  height: 9.5vh;
  @media screen and (max-width: 900px){
    height: 5.5vh;
  }
`;

// Estilos generales de las secciones
const Seccion = styled.div`
  position: relative;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #f0f0f0;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  }
  
  & nav {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & a{
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      user-select: none;
    }
  }
`;

//Estilos del contenedor de los botones para dispositivos móviles
const ContenedorMov = styled.div`
  display: none;
  justify-content: space-between;
  padding: 0 15px;
  padding-bottom: 2px;
  @media screen and (max-width: 900px){
    display: flex;
  }
`;

//Estilos botones para dispositivos móviles
const BtnMenBarras = styled.button`
font-size: 25px;
color: rgb(10,0,180);
background: none;
border: 1px solid transparent;
display: inline-block;
cursor: pointer;
&:hover{
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
}
`;

//Estilos contenedor de enlaces principales
const ContenedorEnlaces = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1fr 2.5fr 1.5fr 1fr;
  grid-template-areas: "Ventas BD Listas Ruta Logo Usuario Sesion";
  max-height: 4vh;
  @media (max-width: 900px){
    padding: 20px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: fixed;
    height: 100vh;
    width: 80%;
    background: rgba(220,220,220,0.95);
    z-index: 2000;
    left: 10px;
    transition: .3s ease all;
    max-height: 100vh;
    row-gap: 5px;
    box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.3);
    transform: ${props => props.estado ? 'translate(0%)':'translate(-150%)'}
  }
`;

//Estilos contenedor del menu desplegable para administrar inventarios
const AdminInv = styled(Seccion)`
  grid-area: BD;
  padding: 7px;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 2px;
  height: 8vh;
  & span{
    display: block;
    font-size: 1.14em;
    font-weight: bold;
    color: rgb(61,61,61);
  }
  @media screen and (max-width: 900px){
    display: none;
  }
`;

//Estilos contenedor del menu desplegable para administrar listas
const AdminListas = styled(Seccion)`
  grid-area: Listas;
  padding: 7px;
  border-radius: 5px;
  display:flex;
  align-items: flex-end;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 2px;
  height: 8vh;
  & span{
    display: block;
    font-size: 1.14em;
    font-weight: bold;
    color: rgb(61,61,61);
  }
  @media screen and (max-width: 900px){
    display: none;
  }
`;

//Estilo ícono para menus desplegables
const IconoDesplegable = styled.i`
  margin-left: 10px;
  position: relative;
  bottom: 10px;
  @media screen and (max-width: 900px){
    position: static;
    margin-left: 20px;
    transform: rotate(-90deg);
  }
`;

//Estilos contenedor auxiliar para los links de los menus desplegables
const ContenedorDesplegables = styled.div`
  position: relative;
`;

//Estilos contenedor de los links de los menus desplegables
const ContenedorGrid = styled.div`
  width: 28%;
  justify-items: left;
  text-align: left;
  padding: 5px;
  position: absolute;
  top: 4vh;
  z-index: 1000;
  left: 11%;
  display: ${(props) => (props.estado ? 'grid' : 'none')};
  grid-template-columns: repeat(2,1fr);
  grid-template-areas: "InventarioDiv ListasDiv";
  grid-gap: 9px;
  min-height: 15vh;
`;

//Estilos contenedor de los links para administracion de inventarios
const EnlacesInv = styled.div`
  grid-area: InventarioDiv;
  height: 100%;
  width: 100%;
  display: ${(props) => (props.estado ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(220,220,220,0.9);
  height: 15vh;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 900px){
    width: 100%;
    & a{
      display: block;
      margin: 10px 0;
      padding: 10px;
    }
  }
`;

//Estilos contenedor de los links para la administración de listas
const EnlacesListas = styled.div`
  grid-area: ListasDiv;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(220,220,220,0.9);
  height: 20vh;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.estado ? 'flex': 'none')};
`;

// Estilos seccion Ventas
const Ventas = styled(Seccion)`
  grid-area: Ventas;
  height: 8vh;
  left: 3px;
  @media screen and (max-width: 900px){
    display: none;
  }
`;

const VentasRuta = styled(Seccion)`
  display: none;
  @media screen and (max-width: 900px){
    display: inline;
    width: 100%;
    height: 8vh;
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.5);
    background-color: rgba(255,255,255,0.7);
  }
`;

// Estilos seccion Ruta
const RutaAdm = styled(Seccion)`
  grid-area: Ruta;
  height: 8vh;
  @media screen and (max-width: 900px){
    display: none;
  }
`;

const Ruta = styled(Seccion)`
  display: none;
  height: 8vh;
  @media screen and (max-width: 900px){
    display: inline;
    width: 100%;
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.5);
    background-color: rgba(255,255,255,0.7); 
  }
`;

// Estilos seccion Logo
const Logo = styled(Seccion)`
  grid-area: Logo;
  height: 8vh;
  &:hover{
    background: none;
    height: 8vh;
    box-shadow: none;
  }
  @media screen and (max-width: 900px){
    display: none;
  }
`;

const LogoMov = styled(Seccion)`
  display: none;
  height: 4.5vh;
  &:hover{
    background: none;
    height: 4.5vh;
    box-shadow: none;
  }
  @media screen and (max-width: 900px){
    display: inline;
  }
`;


//Estilos seccion Usuario
const Usuario = styled.div`
  grid-area: Usuario;
  height: 8vh;
  width: 20%;
  margin-left: 10vw;
  &:hover{
    background: none;
  }
  @media screen and (max-width: 900px){
    margin-top: 38vh;
    margin-left: 35vw;
  }
`;

const UsuarioMov = styled.div`
  display: none;
  height: 4.5vh;
  &:hover{
    background: none;
  }
  @media screen and (max-width: 900px){
    display: inline;
    min-width: 50px;
    & img{
      display: ${props => props.estado ? 'none' : 'inline'};
      transition: .3s ease all;
      width: 35px;
    }
  }
`;

//Estilos botón de usuario
const BotonUsuario = styled.button`
  border-radius: 95px;
  height: 8vh;
  width: 50px;
  background: none;
  &:hover{
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  }
  @media screen and (max-width: 900px){
    width: 60px;  
  }
`;

//Estilos seccion Sesion
const Sesion = styled(Seccion)`
  grid-area: Sesion;
  height: 8vh;
  width: 98%;
  font-size: 100%;
  font-weight: bold;
  color: rgb(61,61,61);
  cursor: pointer;
  @media screen and (max-width: 900px){
    width: 30%;
    top: -8.5vh;
    background: rgba(10,0,110,0.5);
    left: 52vw;
    box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.5);
    
    & a{
      user-select: none;
      color: white;
    }
  }
`;

//Estilos sección de productos
const Productos = styled(Seccion)`
  height: 32%;
  font-size: 14px;
`;

//Estilos sección de empleados
const Empleados = styled(Seccion)`
  height: 32%;
  font-size: 14px;
`;

//Estilos sección de clientes
const Clientes = styled(Seccion)`
  height: 32%;
  font-size: 14px;
`;

//Estilos sección lista de ventas
const ListaVentas = styled(Seccion)`
  height: 25%;
  font-size: 14px;
`;

//Estilos sección lista de productos
const ListaProductos = styled(Seccion)`
  height: 25%;
  font-size: 14px;
`;

//Estilos sección lista de empleados
const ListaEmpleados = styled(Seccion)`
  height: 25%;
  font-size: 14px;
`;

//Estilos sección lista de clientes
const ListaClientes = styled(Seccion)`
  height: 25%;
  font-size: 14px;
`;

//Estilos íconos decorativos de los menus desplegables
const IconoCuadro1 = styled.div`
  height: 4%;
  background: none;
  position: absolute;
  left:10%;
  color: rgba(150,150,150,0.98);
  top: -2px;
  display: ${(props) => (props.estado ? 'inline' : 'none')};
`;

const IconoCuadro2 = styled.div`
  height: 4%;
  background: none;
  position: absolute;
  left:61.5%;
  color: rgba(150,150,150,0.98);
  top: -2px;
  display: ${(props) => (props.estado ? 'inline' : 'none')};
  }
`;

//Componente de la barra de navegación
export const TaskBar = () => {
    //Estilos del link activo
    const EstiloActivo = ({isActive}) => {
        return {
            fontWeight: isActive ? 'bold' : "normal",
            textDecoration: isActive ? 'none' : 'none',
            fontSize: isActive ? '1.2em' : '1.2em', 
            position: "static",
            justify: "center",
            align: "center",
            backgroundColor: isActive ? "pass" : "pass",
            borderRadius: "5px",
        }
    } 
    
    //Hooks para cambiar el estado de los contenedores para invetarios, listas y el menu desplegable
    //en dispositivos móviles
    const [estadoInv, setEstadoInv] = useState(false);
    const [estadoListas, setEstadoListas] = useState(false);
    const [desplegableMov, setDesplegableMov] = useState(false);


    return (
      <TaskBarEstilos>
        <ContenedorMov>
          <BtnMenBarras onClick= {() => {setDesplegableMov(!desplegableMov)}}>
            <i className="fa-solid fa-bars"/>
          </BtnMenBarras>
          <LogoMov>
            <img src='/imagenes/Logo.png' width= "70px" height= "95%" alt= ""/>          
          </LogoMov>
          <UsuarioMov estado= {desplegableMov}>
            <img src='/imagenes/Logo.png' width='50px' height='95%' border-radius= '50px' alt= ""/>
          </UsuarioMov>
        </ContenedorMov>

        <ContenedorEnlaces estado= {desplegableMov}>
          <Ventas>
            <nav>
              <NavLink style= {EstiloActivo} to= {'/ventas'}>Ventas</NavLink>
            </nav>
          </Ventas>
          <VentasRuta>
            <nav>
              <NavLink style={EstiloActivo} to= {'/ventasruta'}>Ventas</NavLink>
            </nav>
          </VentasRuta>
          <AdminInv onClick= {() => {setEstadoInv(!estadoInv); setEstadoListas(false)}}>
            <p>Administrar <span>Inventarios</span></p>
            <IconoDesplegable>
              <i className="fa-solid fa-caret-down"/>
            </IconoDesplegable>
          </AdminInv>
          <AdminListas onClick = {() => {setEstadoListas(!estadoListas); setEstadoInv(false)}}>
            <p>Administrar <span>Listas</span></p>
            <IconoDesplegable className="fa-solid fa-caret-down"/>
          </AdminListas>
          <RutaAdm>
            <nav>
              <NavLink style= {EstiloActivo} to= {'/adminruta'}>Ruta</NavLink>
            </nav>
          </RutaAdm>
          <Ruta>
            <nav>
              <NavLink style= {EstiloActivo} to= {'/ruta'}>Ruta</NavLink>
            </nav>
          </Ruta>
          <Logo>
            <img src={'/imagenes/Logo.png'} width= "90px" height= "95%" alt= ""/>
          </Logo>
          <Usuario>
            <BotonUsuario>
              <img src={'/imagenes/'+'Logo.png'} width='50px' height='95%' border-radius= '50px' alt= ""/>
            </BotonUsuario>
          </Usuario>
          <Sesion>
            <nav>
              <NavLink to= {'/'}>Cerrar Sesión</NavLink>
            </nav>
          </Sesion>
        </ContenedorEnlaces>

        <ContenedorDesplegables>
          <ContenedorGrid estado = {estadoInv || estadoListas}>
            <IconoCuadro1 estado = {estadoInv}>
              <i className= "fa-solid fa-sort-up"/>
            </IconoCuadro1>
            <EnlacesInv estado= {estadoInv}>
            <Productos>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/productos'}>Productos</NavLink>
              </nav>
            </Productos>
            <Clientes>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/clientes'}>Clientes</NavLink>
              </nav>
            </Clientes>
            <Empleados>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/empleados'}>Empleados</NavLink>
              </nav>
            </Empleados>
          </EnlacesInv>

          <IconoCuadro2 estado= {estadoListas}>
            <i className='fa-solid fa-sort-up'/>
          </IconoCuadro2>
          <EnlacesListas estado= {estadoListas}>
            <ListaVentas>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/listaventas'}>Lista de Ventas</NavLink>
              </nav>
            </ListaVentas>
            <ListaProductos>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/listaproductos'}>Lista de Productos</NavLink>
              </nav>
            </ListaProductos>
            <ListaClientes>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/listaclientes'}>Lista de Clientes</NavLink>
              </nav>
            </ListaClientes>
            <ListaEmpleados>
              <nav>
                <NavLink style= {EstiloActivo} to= {'/listaempleados'}>Lista de Empleados</NavLink>
              </nav>
            </ListaEmpleados>
          </EnlacesListas>
          </ContenedorGrid>
        </ContenedorDesplegables>
      </TaskBarEstilos>
    )    
};