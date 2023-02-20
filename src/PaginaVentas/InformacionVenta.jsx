import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

/*==============================================================================================================*/
/*================================================ Estilos CSS =================================================*/
const DatosVenta = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
`;

// Estilos del select
const TipoPago = styled.select`
  width: 100%;
  height: 50px;
  background-color: #000000;
  color: white;
  border-bottom: 3px solid #2e78d2;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
  &:enabled:hover {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
  }
`;

const Seccion = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  column-gap: 10px;
  justify-content: center;
  align-items: flex-end;
`;

const Operacion = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
`;

const Texto = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Descripcion = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 5px;
  border: 1px solid black;
  outline: none;
`;

const Confirmar = styled.input`
  width: 100px;
  height: 40px;
  text-align: center;
  background-color: green;
  border: none;
  color: white;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  &:hover:enabled {
    background-color: #00a900;
  }
  &:disabled {
    background-color: #012b00;
  }
`;

/*================================================================================================================*/
/*======================================== Funcion JSX del componente ============================================*/

function InformacionVenta({
  submitRef,
  cliente,
  productos,
  crearVenta,
  activarTicket,
  desactivarVentana,
  enviarVenta,
}) {
  // Metodo para guardar la informacion de la venta
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tipoPago: "EFECTIVO",
      descuento: 0,
    },
  });

  // Almacenar el valor actual del descuento
  const descuento = watch("descuento");
  // Almacenar el valor actual del descuento
  const montoRecibido = watch("recibido");

  // Calcular el monto de la venta
  let subtotal = 0;
  for (let i = 0; i < productos.length; i++) {
    subtotal += productos[i].CANTIDADSELECCIONADA * productos[i].PRECIO;
  }

  const total = subtotal;

  // Crear venta
  const onSubmit = (data) => {
    // Crear la venta con los datos finales del formulario
    crearVenta(cliente, productos, data);

    enviarVenta();
    // Activar la ventana para imprimir el ticket
    activarTicket(true);
    // Desactivar la ventana del resumen
    desactivarVentana(false);
  };

  return (
    <DatosVenta onSubmit={handleSubmit(onSubmit)}>
      <Seccion>
        <Operacion>
          <Texto>Aplicar descuento</Texto>
          <Input
            type="number"
            {...register("descuento", {
              valueAsNumber: true,
              min: 0,
              max: 100,
            })}
          />
        </Operacion>
        <Texto>
          <b>Total con descuento: </b>
          {`$ ${((total * (100 - descuento)) / 100).toFixed(2)}`}
        </Texto>
      </Seccion>
      <Seccion>
        <Operacion>
          <Texto>Monto recibido</Texto>
          <Input
            type="number"
            {...register("recibido", {
              valueAsNumber: true,
              validate: {
                minimo: (value) =>
                  value >= ((total * (100 - descuento)) / 100).toFixed(2),
              },
            })}
          />
        </Operacion>
        <Texto>
          <b>Cambio: </b>
          {`$ ${
            montoRecibido - ((total * (100 - descuento)) / 100).toFixed(2)
          }`}
        </Texto>
      </Seccion>
      <TipoPago {...register("tipoPago")}>
        <option key={"EFECTIVO"} value={"EFECTIVO"}>
          Efectivo
        </option>
        <option key={"CREDITO"} value={"CREDITO"}>
          Crédito
        </option>
        <option key={"CORTESIA"} value={"CORTESIA"}>
          Cortesía
        </option>
      </TipoPago>
      <Descripcion
        type="text"
        placeholder="Descripcion de la venta"
        defaultValue=""
        {...register("observaciones", {
          required: false,
        })}
      />
      <Confirmar type="submit" value="Confirmar" ref={submitRef} />
    </DatosVenta>
  );
}

export default InformacionVenta;
