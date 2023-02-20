import React, {forwardRef} from "react";
import styled from "styled-components";

const Principal = styled.div`
    width: 302px;
    height: auto;
    color: black;
    background: rgba(220,220,220,0.9);
    padding: 8px;
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

const Grid2Secciones = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: 100px 1fr;
    grid-gap: 8px;
`;

const SeccionDatosLocal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 3px;
`;

const ContenedorProducto = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 110px 39px repeat(2, 1fr);
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

/*===============================================================================================================*/
/*========================================== Funcion JSX del componente =========================================*/
 const TicketVenta = forwardRef((props, ref) => {
   
     // Desestructurar los datos de la venta
     const {
            ID,
            ATIENDE,
            CLIENTE,
            DESCUENTO, 
            DIRECCION, 
            FECHA,
            HORA,
            MONTO_TOTAL,
            OBSERVACIONES,
            PRODUCTOS_VENTA,
            REPARTIDOR,
            SERVICIO_EXTRA,
            SUBTOTAL,
            TIPO_PAGO,
            TIPO_VENTA} = props.datosVenta;
        
    const productos = PRODUCTOS_VENTA; 

    return(
        <Principal ref = {ref}>
            <LogoContenedor>
                <Logo src= {'../imagenes/Logo.png'}/>
            </LogoContenedor>
            <Texto alineación= {'center'} tamaño= {'20px'}>TICKET DE COMPRA</Texto>
            <Grid2Secciones>
                <SeccionDatosLocal>
                    <Texto negrita= {600} tamaño= {'15px'} alineación= {'left'}>DIRECCIÓN</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'} top= {'3px'} height= {'20px'}>
                        {DIRECCION.CALLE + ' N° ' + DIRECCION.NUMERO}
                    </Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'}>{DIRECCION.COLONIA}</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'}>
                        {DIRECCION.MUNICIPIO + ', ' + DIRECCION.ESTADO + ' ' + DIRECCION.CP}
                    </Texto>
                </SeccionDatosLocal>
                <SeccionDatosLocal>
                    <Texto negrita= {600} tamaño= {'15px'} alineación= {'center'}>ATENCIÓN AL CLIENTE</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'} top= {'3px'} height= {'20px'}>524 0028/01 800 GP HIELO</Texto>
                    <Texto alineación= {'left'} tamaño= {'11.8px'}>www.hielogranpacifico.com</Texto>
                    <Texto alineación= {'left'} tamaño= {'11.8px'}>contacto@hielogranpacifico.com</Texto>
                </SeccionDatosLocal>
            </Grid2Secciones>
            <Texto negrita= {600} alineación= {'center'} tamaño= {'12px'} top= {'-2px'} height= {'12px'}>
                RFC {DIRECCION.RFC}
            </Texto>
            <Separador doble= {true}/>

            <Grid2Secciones>
                <Texto alineación= {'left'} tamaño= {'13.5px'}>
                    {FECHA}
                </Texto>
                <Texto alineación= {'center'} tamaño= {'13.5px'}>
                    {`${HORA} hrs`}
                </Texto>
            </Grid2Secciones>
            
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'}>ID: {ID}</Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-5px'}>
                ATIENDE: <span>{ATIENDE.NOMBRE}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-8px'}>
                CLIENTE: <span>{CLIENTE.NOMBRE}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-3px'}>
                REPARTIDOR: <span>{REPARTIDOR.NOMBRE}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400}>
                PRODUCTOS:  <span>{contarProductos(productos)}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-5px'}>
                TIPO PAGO:  <span>{TIPO_PAGO}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-8px'} height= {'14px'}>
                TIPO VENTA:  <span>{TIPO_VENTA}</span>
            </Texto>
            <Separador doble= {true}/>

            <ContenedorProducto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>PRODUCTO</Texto>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'}>CANT.</Texto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>PRECIO</Texto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>TOTAL</Texto>
            </ContenedorProducto>

            <ContenedorProducto>
                {productos.map(producto => {
                    return(<>
                        <Texto alineación= {'left'} tamaño= {'12px'} bottom= {'8px'}>
                            {producto.NOMBRE}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            {producto.CANTIDAD}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            ${producto.PRECIO.toFixed(2)}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            ${(producto.CANTIDAD*producto.PRECIO).toFixed(2)}
                        </Texto></>
                    )
                })}
            </ContenedorProducto>
            <Separador/>

            <Texto alineación= {'center'} tamaño= {'15px'} negrita= {600}>
                SUBTOTAL: ${SUBTOTAL}
            </Texto>
            <Texto alineación= {'center'} tamaño= {'15px'} negrita= {600}>
                SERV. EXTRA: ${SERVICIO_EXTRA}
            </Texto>
            <Texto alineación= {'center'} tamaño= {'15px'} negrita= {600}>
                DESCUENTO: {DESCUENTO}%
            </Texto>
            <Texto alineación= {'center'} tamaño= {'19px'} negrita= {600}>
                TOTAL: ${MONTO_TOTAL}
            </Texto>
            <Separador/>

            <Texto alineación= {'left'} tamaño= {'11.4px'}>
                Es importante que conserve su ticket para hacer válida cualquier aclaración.
            </Texto>
            <Texto alineación= {'left'} tamaño= {'11.4px'} top= {'-7px'}>
                En caso de NO recibir su ticket, quejas con el servicio o anomalías con su compra, comuníquese al teléfono de Atención al Cliente
            </Texto>
            <Separador/>

            <Texto alineación= {'left'} tamaño= {'14px'}>
                {OBSERVACIONES}
            </Texto>
        </Principal>
    )});

/*==============================================================================================================*/
/*================================================ Funciones ===================================================*/

const contarProductos = (productos) => {
    let cantidadProductos = 0;
    productos.forEach(producto => {
        cantidadProductos += producto.CANTIDAD;
    });
    return cantidadProductos;
}
    
export default TicketVenta;