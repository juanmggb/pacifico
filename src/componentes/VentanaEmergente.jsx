import React from "react";
import styled from "styled-components";

/*======================================== Estilos CSS de la ventana emergente ========================================*/
const Overlay = styled.div`
  width: 100vw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    z-index: 3500;
  }
`;

const ContenedorVentana = styled.div`
  position: relative;
  min-width: 500px;
  min-height: 100px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0px 7px 30px 0px rgba(0, 0, 0, 0.5);
  padding: 20px 20px 20px 20px;
  user-select: none;
  display: grid;
  grid-template-rows: 60px 350px 60px;
  grid-template-areas:
    "TituloOperacion"
    "Resumen"
    "Aceptar";
  @media screen and (max-width: 900px) {
    grid-template-rows: 60px 200px 60px;

    @media screen and (max-width: 500px) {
      min-width: 100vw;

      @media screen and (max-width: 350px) {
        padding: 20px 10px 20px 10px;

        @media screen and (max-width: 320px) {
          padding: 20px 4px 20px 4px;
        }
      }
    }
  }
`;

const Resumen = styled.div`
  grid-area: Resumen;
  display: grid;
  grid-gap: 30px;
  justify-items: center;
  justify-content: center;
  padding: 10px 10px 10px 10px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TituloOperacion = styled.div`
  grid-area: TituloOperacion;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #d9d9d9;
  border-radius: 0px;
  h3 {
    font-weight: bold;
    font-size: 1.2em;
    color: #000000;
  }
  button {
    justify-content: right;
  }
`;

const BotonCerrar = styled.button`
  width: 70px;
  height: 30px;
  background-color: #b10000;
  font-weight: bold;
  font-size: 0.9em;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const BotonAceptar = styled.button`
  grid-area: Aceptar;
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
    display: none;
  }
`;

/* ===================================== Funcion JSX de la ventana emergente ===============================*/
function VentanaEmergente({
  operacion,
  children,
  estado,
  cambiarEstado,
  reset,
  desactivarBoton = false,
}) {
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorVentana>
            <TituloOperacion>
              <h3>{operacion}</h3>
              <BotonCerrar onClick={() => cambiarEstado(!estado)}>
                Cancelar
              </BotonCerrar>
            </TituloOperacion>
            <Resumen>{children}</Resumen>
            <BotonAceptar
              disabled={desactivarBoton}
              onClick={() => {
                reset();
                cambiarEstado(!estado);
              }}
            >
              Aceptar
            </BotonAceptar>
          </ContenedorVentana>
        </Overlay>
      )}
    </>
  );
}

export default VentanaEmergente;
