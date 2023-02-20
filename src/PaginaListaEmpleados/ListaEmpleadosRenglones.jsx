// Importar modulo
import styled from 'styled-components';

// Importar componente
import EmpleadoRenglon from './EmpleadoRenglon';

// Estilos //////////////////////////////////////////////////
const ListaEmpleados = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  grid-auto-rows: 60px;
  grid-gap: 15px;
`;

// Componente ///////////////////////////////////////////////////////////////
const ListaEmpleadosRenglones = ({ empleados, mostrarDetallesEmpleado }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza
	// Si no hay usuarios, regresa el parrafo no hay empleados
	if (!empleados.length) return <p>No hay empleados</p>;
	// Si hay usuarios regresa los componentes UserRow por cada uno
	// No usamos return en map si todo se escribe en una linea
	return (
		<ListaEmpleados>
			{empleados.map(empleado => (
				<EmpleadoRenglon
					key={empleado.ID}
					empleado={empleado}
					mostrarDetallesEmpleado={mostrarDetallesEmpleado}
				/>
			))}
		</ListaEmpleados>
	);
};

export default ListaEmpleadosRenglones;
