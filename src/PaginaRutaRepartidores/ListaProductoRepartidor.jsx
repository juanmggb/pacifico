import React from "react";
import styled from "styled-components";

import { ProductoRutaEmpleado } from "./ProductoRutaEmpleado";

/*============================Estilos CSS===================================*/
const ListaProductos = styled.div`
    position: relative;
    width: 100%;
    height: 130px;
    display: ${props => props.estado ? 'grid':'none'};
    grid-template-columns: 1fr;
    grid-auto-rows: 130px;
    grid-gap: 15px;
    @media screen and (max-width: 900px){
        height: 140px;
    }
`;

const ListaVacia =  styled.p`
    user-select: none;
    font-weight: bold;
    font-size: 15px;
`;

export const ListaProductoRepartidor = ({productos, seccionSeleccionada, cantidadProductos}) => {
    return(
        <ListaProductos estado= {seccionSeleccionada === 'Productos'}>
            {(cantidadProductos > 0) ?
                (productos.map (producto  =>
                    <ProductoRutaEmpleado key= {producto.ID} producto= {producto}/>
                ))
                :
                (<ListaVacia>No hay productos en el inventario</ListaVacia>) 
            }
        </ListaProductos>
    );
}
