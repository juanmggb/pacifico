import React from "react";
import styled from "styled-components";

import { ClienteRutaEmpleado } from "./ClienteRutaEmpleado";

/*=======================Estilos CSS==============================*/
const ListaClientes = styled.div`
    position: relative;
    width: 100%;
    height: 130px;
    display: ${props => props.estado ? 'grid':'none'};
    grid-template-columns: 1fr;
    grid-auto-rows: 130px;
    grid-gap: 25px;
    @media screen and (max-width: 900px){
        height: 150px;
        @media screen and (max-width: 340px){
            grid-auto-rows: 150px;
        }
    }
`;

const ListaVacia =  styled.p`
    user-select: none;
    font-weight: bold;
    font-size: 15px;
`;

export const ListaClienteRepartidor = ({clientes, seccionSeleccionada, cantidadClientes}) => {
    return(
        <ListaClientes estado= {seccionSeleccionada === 'Clientes'}>
            {(cantidadClientes > 0) ?
                (clientes.map(cliente => (
                    <ClienteRutaEmpleado key= {cliente.ID} cliente= {cliente}/>
                )))
                :
                <ListaVacia>No hay clientes por visitar</ListaVacia>
            }
        </ListaClientes>
    );
}
