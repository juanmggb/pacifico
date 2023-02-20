import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormularioSelect from "../componentes/FormularioSelect";
/*===========================================================================*/
/*==================== Estilos de CSS para el formulario ====================*/
const ContenedorFormulario = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 2fr;
  place-items: center;
  @media screen and (max-width: 900px) {
    height: 80%;
    max-width: 400px;
  }
`;

/*============ Codigo de JSX para generar el formulario =======================*/

/*Funcion que retornará el formulario usando la librería 'react-hook-form'*/
function FormularioVentas({
  productosSelect,
  agregarProducto,
  agregarPrecio,
  clientesSelect,
  seleccionarCliente,
  cliente,
}) {
  //  Verificar si ya se seleccionó un cliente
  const [desactivarSeleccionarCliente, setDesactivarSeleccionarCliente] =
    useState(false);

  // useEffect para actualizar los precios de los productos en base al cliente y desactivar el select de clientes
  useEffect(() => {
    if (cliente) {
      setDesactivarSeleccionarCliente(true);
      agregarPrecio(cliente.PRODUCTOS_PRECIOS);
    } else {
      setDesactivarSeleccionarCliente(false);
    }
  }, [cliente]);

  return (
    <>
      <ContenedorFormulario>
        <FormularioSelect
          listaItems={clientesSelect}
          agregarItem={seleccionarCliente}
          textoBoton={"Seleccionar"}
          desactivar={desactivarSeleccionarCliente}
        />
        <FormularioSelect
          listaItems={productosSelect}
          agregarItem={agregarProducto}
          textoBoton={"Agregar"}
          desactivar={!cliente}
        />
      </ContenedorFormulario>
    </>
  );
}
export default FormularioVentas;

/*<DescuentoProducto
productosSelect = {productosSelect}
cliente={cliente}
setActivarDescuento={setActivarDescuento}
agregarConDescuento={agregarConDescuento}
ID = {ID}/>*/
