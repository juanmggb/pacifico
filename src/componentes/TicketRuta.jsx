import React, {forwardRef} from "react";
import styled from "styled-components";

const Principal = styled.div`
    width: 300px;
    height: auto;
    color: black;
    background: rgba(220,220,220,0.9);
    padding: 10px;
    padding-top: 15px;
    font-weight: 400;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    row-gap: 15px;
`;

const LogoContenedor = styled.div`
    width: 100%;
    border-radius: none;
    padding: 0 65px 0 65px;
`;

const Logo = styled.img`
    width: 150px;
`;

const Texto = styled.p`
    font-weight: ${props => props.negrita};
    font-size: ${props => props.tamaño};
    color: black;
    text-align: ${props => props.alineación};
    width: 100%;
    overflow-x: hidden;
    height: ${props => props.height};
    top: ${props => props.top};
    position: relative;
    margin-bottom: ${props => props.bottom};
    margin-top: ${props => props.top};
    & span{
        display: inline-block;
        position: relative;
        top: ${props => props.topSpan};
        height: ${props => props.heightSpan};
        font-weight: ${props => props.spanFont};
        color: ${props => props.color};
    }
`;

const ContenedorGrid = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 50px repeat(2, 1fr);
`;

const ContenedorProducto = styled(ContenedorGrid)`
    display: grid;
    grid-template-columns: 75px 130px 75px;
`;

const Separador = ({doble}) => {
    return(
        (doble) ?
            <Texto tamaño= {'17px'} alineación= {'center'} topSpan= {'-15px'} 
                    height= {'25px'} heightSpan= {'4px'} top= {'-5px'}>
                {'_'.repeat(40)}<span>{'_'.repeat(40)}</span>
            </Texto>
            :
            <Texto tamaño= {'17px'} alineación= {'center'} top= {'-5px'}>{'.'.repeat(80)}</Texto>
    );
}

const TicketRuta = forwardRef((props, ref) => {

    // Desestructurar los datos de la salida ruta
    // Desestructurar los datos de la venta
    const {
       ID,
       ATIENDE,
       FECHA,
       HORA,
       REPARTIDOR,
       PRODUCTOS
        } = props.datosSalidaRuta;

    const productos = PRODUCTOS;

    return(
        <Principal ref = {ref}>
            <LogoContenedor>
                <Logo src= {'../imagenes/Logo.png'}/>
            </LogoContenedor>

            <Texto alineación= {'center'} tamaño= {'16px'}>VALE DE CARGA</Texto>
            <Separador doble= {true}/>
            
            <ContenedorGrid>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'14px'}>ID:</Texto>
                <Texto alineación= {'center'} tamaño= {'14px'}>{ID}</Texto>
            </ContenedorGrid>
            
            <ContenedorGrid>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'14px'}>FECHA:</Texto>
                <Texto alineación= {'center'} tamaño= {'14px'}>
                    {FECHA}
                </Texto>
                <Texto alineación= {'center'} tamaño= {'14px'}>
                    {`${HORA} hrs`}
                </Texto>
            </ContenedorGrid>
            <Separador doble= {false}/>

            <ContenedorProducto>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'14.5px'}>CLAVE</Texto>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'14.5px'}>PRODUCTO</Texto>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'14.5px'}>CANTIDAD</Texto>
            </ContenedorProducto>
            
            <ContenedorProducto>
                {productos.map(producto => {
                    return(
                      <>
                        <Texto alineación= {'left'} tamaño= {'13px'} bottom= {'8px'}>
                            {producto.CLAVE}
                        </Texto>
                        <Texto alineación= {'left'} tamaño= {'13px'} bottom= {'8px'}>
                            {producto.NOMBRE}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'13px'} bottom= {'8px'}>
                            {producto.CANTIDAD}
                        </Texto>
                      </>)
                    })
                }
            </ContenedorProducto>
            <Separador doble={true}/>
            
            <Texto tamaño= {'15px'} color= {'rgba(0,0,0,0)'}><span>.</span></Texto>
            <Texto alineación= {'left'} negrita= {600} tamaño= {'14.5px'} color= {'rgba(0,0,0,0)'}>
                ENTREGA:<span>{'_'.repeat(3)}</span>{'_'.repeat(26)}
            </Texto>
            <Texto tamaño= {'13px'} alineación= {'left'} top= {'-5px'}>{ATIENDE.NOMBRE}</Texto>
            <Texto tamaño= {'13px'} alineación= {'left'} top= {'-8px'}>{ATIENDE.PUESTO}</Texto>

            <Texto tamaño= {'15px'} color= {'rgba(0,0,0,0)'}><span>.</span></Texto>
            <Texto alineación= {'left'} negrita= {600} tamaño= {'14.5px'} color= {'rgba(0,0,0,0)'}>
                ENTREGA:<span>{'_'.repeat(3)}</span>{'_'.repeat(26)}
            </Texto>
            <Texto tamaño= {'13px'} alineación= {'left'} top= {'-5px'}>{REPARTIDOR.NOMBRE}</Texto>
            <Texto tamaño= {'13px'} alineación= {'left'} top= {'-8px'}>{REPARTIDOR.PUESTO}</Texto>
        </Principal>
)});


export default TicketRuta;