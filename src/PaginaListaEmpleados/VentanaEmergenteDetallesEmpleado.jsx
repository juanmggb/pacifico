// Importar modulo
import styled from 'styled-components';
import Resumen from '../componentes/Resumen';

// Estilos //////////////////////////////////////////////////////////////
const Overlay = styled.div`
	width: 100vw;
	height: 100svh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.4);
	padding: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
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
  grid-template-areas: 'TituloOperacion'
                        'Resumenes'
                        'Aceptar';
  @media screen and (max-width: 900px ){
    grid-template-rows: 60px 200px 60px;
                    
    @media screen and (max-width: 500px){
      min-width: 100vw;
      
      @media screen and (max-width: 350px){
        padding: 20px 10px 20px 10px;
        
        @media screen and (max-width: 320px){
          padding: 20px 4px 20px 4px;
      }
     }
    }
   }
`;

const Resumenes = styled.div`
  grid-area: Resumenes;
  display: grid;
  grid-gap: 30px;
  justify-items: center;
  justify-content: center;
  padding: 10px 10px 10px 10px;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

const TituloOperacion = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 2px solid #d9d9d9;

	h3 {
		font-weight: bold;
		font-size: 1.2em;
		color: #000000;
	}
`;

const BotonCerrar = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
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

// Lista de campos
const camposInformacion = 
            {NOMBRE: 'Nombre:',
            PUESTO: 'Puesto:',
            TIPO_EMPLEO: 'Tipo de empleo:',
            ACCESO_SISTEMA: 'Acceso al sistema:', 
            FECHA_INGRESO: 'Fecha de ingreso:',
            TELEFONO: 'Telefono:',
            MOVIL: 'Movil:'};

// Campos de la direccion del cliente
const camposDireccion = { 
  CALLE: 'Calle:',
  NUMERO: 'Numero:',
  COLONIA: 'Colonia:',
  MUNICIPIO: 'Municipio:',
  CIUDAD: 'Ciudad',
  CP: 'C.P:'};


// Componente ///////////////////////////////////////////////////////////
const VentanaEmergenteDetallesEmpleado = ({
	estado,
	cambiarEstado,
	empleadoDetalles
}) => {

	const {DIRECCION, ID, ...informacionEmpleado} = empleadoDetalles;


	return (
		<>
			{estado && (
				<Overlay>
					<ContenedorVentana>
						<TituloOperacion>
							<h3>{informacionEmpleado.NOMBRE}</h3>
						</TituloOperacion>
            <Resumenes>
            <Resumen
              key = {'Informacion'}
              datos = {informacionEmpleado}
              listaCampos = {camposInformacion}
              encabezado = {'Informacion del empleado'}/>
             <Resumen
              key = {'Direccion'}
              datos = {DIRECCION}
              listaCampos = {camposDireccion}
              encabezado = {'Direccion del empleado'}/>
            </Resumenes>
						<BotonCerrar onClick={() => cambiarEstado(false)}>
							Cerrar
						</BotonCerrar>
					</ContenedorVentana>
				</Overlay>
			)}
		</>
	);
};

export default VentanaEmergenteDetallesEmpleado;
