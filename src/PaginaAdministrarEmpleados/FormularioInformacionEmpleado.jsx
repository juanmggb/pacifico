import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

/*========================================================================================================*/
/*============================================ Estilos CSS ===============================================*/

// Estilos del Formulario

const Formulario = styled.form`
  width: 100%;
  padding: 20px 50px 20px 50px;

  // Estructura
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 70px repeat(6, 55px) 50px;
  grid-template-areas:
    "Encabezado Encabezado"
    "Empleado Empleado"
    "Puesto TipoEmpleo"
    "Fecha Acceso"
    "Telefono Movil"
    "Direccion Colonia"
    "Region CP"
    "Reset Reset";

  @media screen and (max-width: 900px) {
    padding: 10px 20px 20px 20px;
    grid-gap: 15px;
    grid-template-rows: 60px repeat(7, 40px) 40px;
  }
`;

// Estilos del encabezado de la seccion 'Informacion del cliente'
const Encabezado = styled.div`
  grid-area: Encabezado;
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: left;

  border-bottom: 3px solid #2e78d2;
  border-radius: 0px;

  font-size: 1.3rem;
  font-weight: bold;
`;

// Estilos del campo Nombre
const Empleado = styled.div`
  grid-area: Empleado;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Puesto
const Puesto = styled.div`
  grid-area: Puesto;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Tipo de Empleo
const TipoEmpleo = styled.div`
  grid-area: TipoEmpleo;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 140px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Accesi
const Acceso = styled.div`
  grid-area: Acceso;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 140px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Fecha de ingreso
const Fecha = styled.div`
  grid-area: Fecha;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Telefono
const Telefono = styled.div`
  grid-area: Telefono;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Movil
const Movil = styled.div`
  grid-area: Movil;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos de la seccion Direccion
const Direccion = styled.div`
  grid-area: Direccion;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "Calle Numero";
`;

// Estilos de la seccion Region
const Region = styled.div`
  grid-area: Region;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "Ciudad Municipio";
`;

// Estilos del campo Calle
const Calle = styled.div`
  grid-area: Calle;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 40px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Calle
const Numero = styled.div`
  grid-area: Numero;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Colonia
const Colonia = styled.div`
  grid-area: Colonia;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Ciudad
const Ciudad = styled.div`
  grid-area: Ciudad;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo Ciudad
const Municipio = styled.div`
  grid-area: Municipio;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;
`;

// Estilos del campo CP
const CP = styled.div`
  grid-area: CP;
  display: grid;

  grid-gap: 5px;
  grid-template-columns: 60px 1fr;
  grid-template-areas: "Texto Input";

  align-items: center;
  justify-items: center;

  > input {
    width: 50%;
    justify-self: left;
  }
`;

// Estilos del Boton para resetear
const Reset = styled.input`
  grid-area: Reset;
  height: 80%;
  width: 150px;
  background-color: #e90000;
  color: white;
  font-weight: bold;

  align-self: center;
  justify-self: center;

  &:hover:enabled {
    background-color: #ff0000;
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
  }

  &:disabled {
    background: transparent;
    color: transparent;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0);
    border: none;
  }
`;

// Estilos del input
const Input = styled.input`
  grid-area: Input;
  width: 100%;
  height: 80%;
  background-color: #efefef;
  border-radius: 0px;
  border-bottom: 3px solid #2e78d2;

  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;

  &:enabled:hover {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
`;

// Estilos del select
const Selector = styled.select`
  grid-area: Input;
  width: 100%;
  height: 80%;
  background-color: #efefef;
  border-radius: 0px;
  border-bottom: 3px solid #2e78d2;

  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;

  &:enabled:hover {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
    cursor: pointer;
  }
`;

// Estilos del nombre de los campos
const Texto = styled.div`
  grid-area: Texto;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  background-color: white;
  font-weight: bold;

  display: flex;
  justify-content: left;
  align-items: center;
`;

// Valores por defecto:

const formValues = {
  NOMBRE: "",
  PUESTO: "ADMINISTRADOR",
  TIPO_EMPLEO: "FIJO",
  ACCESO_SISTEMA: "True",
  FECHA_INGRESO: "01-04-2022",
  TELEFONO: NaN,
  MOVIL: NaN,
  CALLE: "",
  NUMERO: NaN,
  COLONIA: "",
  CIUDAD: "",
  MUNICIPIO: "URUAPAN",
  CP: NaN,
};

// Tipo de puestos
const Puestos = {
  ADMINISTRADOR: "Administrador",
  VENTAS: "Ventas",
  TANQUERO: "Tanquero",
  REPARTIDOR: "Repartidor",
  SECRETARIA: "Secretaria",
  CAJERO: "Cajero",
};

// Campos
const campos = Object.keys(Puestos);

/*========================================================================================================*/
/*=================================== Funcion JSX del componente =========================================*/

function FormularioInformacionEmpleado({
  datosEmpleado,
  opcion,
  submitRef,
  agregarDireccion,
  agregarInformacion,
}) {
  // Funciones de la librería react-hook-form para el formulario
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...formValues,
    },
  });

  // Cambiar los valores por defecto cuando se va a modificar la informacion de un cliente
  useEffect(() => {
    if (opcion !== 0 && datosEmpleado) {
      // Desestructurar el cliente en informacion general y direccion
      const { DIRECCION, ...Informacion } = datosEmpleado;

      reset({ ...DIRECCION, ...Informacion });
    } else {
      reset({ ...formValues });
    }
  }, [datosEmpleado, opcion]);

  // Datos que se van a enviar del formulario

  const onSubmit = (data) => {
    const { CALLE, NUMERO, COLONIA, CIUDAD, MUNICIPIO, CP, ...Informacion } =
      data;

    const Direccion = {
      CALLE,
      NUMERO,
      COLONIA,
      CIUDAD,
      MUNICIPIO,
      CP,
    };

    agregarDireccion(Direccion);
    agregarInformacion(Informacion);
  };

  // Resetear el formulario cuando ya se realizó la operacion

  return (
    <>
      <Formulario onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/*SECCION DE LOS DATOS DEL EMPLEADO*/}
        <Encabezado>Informacion del empleado:</Encabezado>
        {/*NOMBRE DEL EMPLEADO*/}
        <Empleado>
          <Texto>Nombre:</Texto>
          <Input
            disabled={opcion === 2}
            type="text"
            {...register("NOMBRE", {
              required: true,
              minLength: 8,
            })}
          />
        </Empleado>
        {/*PUESTO DEL EMPLEADO*/}
        <Puesto>
          <Texto>Puesto:</Texto>
          <Selector disabled={opcion === 2} {...register("PUESTO")}>
            {campos.map((campo, index) => (
              <option key={index} value={campo}>
                {Puestos[campo]}
              </option>
            ))}
          </Selector>
        </Puesto>
        {/*Tipo de empleo de la persona*/}
        <TipoEmpleo>
          <Texto>Tipo de Empleo:</Texto>
          <Selector
            Selector
            disabled={opcion === 2}
            {...register("TIPO_EMPLEO")}
          >
            <option key="FIJO" value="FIJO">
              Fijo
            </option>
            <option key="TEMPORAL" value="TEMPORAL">
              Temporal
            </option>
          </Selector>
        </TipoEmpleo>
        {/*ACCESO AL SISTEMA*/}
        <Acceso>
          <Texto>Acceso al sistema:</Texto>
          <Selector
            Selector
            disabled={opcion === 2}
            {...register("ACCESO_SISTEMA")}
          >
            <option key={true} value={true}>
              Sí
            </option>
            <option key={false} value={false}>
              No
            </option>
          </Selector>
        </Acceso>
        {/*FECHA DE INGRESO*/}
        <Fecha>
          <Texto>Fecha de ingreso:</Texto>
          <Input
            type="date"
            {...register("FECHA_INGRESO", { required: true })}
          ></Input>
        </Fecha>
        {/*TELEFONO*/}
        <Telefono>
          <Texto>Telefono:</Texto>
          <Input
            disabled={opcion === 2}
            type="number"
            {...register("TELEFONO", {
              required: true,
            })}
          />
        </Telefono>
        {/*MOVIL*/}
        <Movil>
          <Texto>Movil:</Texto>
          <Input
            disabled={opcion === 2}
            type="number"
            {...register("MOVIL", {
              required: true,
            })}
          />
        </Movil>
        {/*CALLE Y NUMERO DEL EMPLEADO*/}
        <Direccion>
          <Calle>
            <Texto>Calle:</Texto>
            <Input
              disabled={opcion === 2}
              type="text"
              {...register("CALLE", {
                required: true,
              })}
            />
          </Calle>
          <Numero>
            <Texto>Numero:</Texto>
            <Input
              disabled={opcion === 2}
              type="number"
              {...register("NUMERO", {
                required: true,
              })}
            />
          </Numero>
        </Direccion>
        {/*C.P DEL EMPLEADO*/}
        <CP>
          <Texto>C.P:</Texto>
          <Input
            disabled={opcion === 2}
            type="number"
            {...register("CP", {
              required: true,
              minLength: 5,
              maxLength: 5,
            })}
          />
        </CP>
        {/*COLONIA DEL EMPLEADO*/}
        <Colonia>
          <Texto>Colonia:</Texto>
          <Input
            disabled={opcion === 2}
            type="text"
            {...register("COLONIA", {
              required: true,
            })}
          />
        </Colonia>
        <Region>
          {/*CIUDAD DEL EMPLEADO*/}
          <Ciudad>
            <Texto>Ciudad:</Texto>
            <Input
              disabled={opcion === 2}
              type="text"
              {...register("CIUDAD", {
                required: true,
              })}
            />
          </Ciudad>
          {/*MUNICIPIO DEL EMPLEADO*/}
          <Municipio>
            <Texto>Municipio:</Texto>
            <Selector
              Selector
              disabled={opcion === 2}
              {...register("MUNICIPIO", { required: true })}
            >
              <option key="URUAPAN" value="URUAPAN">
                Uruapan
              </option>
              <option key="LAZARO" value="LAZARO">
                Lazaro Cardenas
              </option>
              <option key="MORELIA" value="MORELIA">
                Morelia
              </option>
            </Selector>
          </Municipio>
        </Region>
        <Reset
          disabled={opcion === 2}
          type="button"
          value="Reiniciar formulario"
          onClick={() => {
            reset();
          }}
        />
        <input
          style={{ display: "none" }}
          type="submit"
          value="Agregar informacion"
          ref={submitRef}
        />
      </Formulario>
    </>
  );
}

export default FormularioInformacionEmpleado;
