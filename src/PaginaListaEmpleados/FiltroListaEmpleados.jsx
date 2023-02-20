// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaEmpleadosEstilo = styled.form`
	width: 100%;
	height: 100%;
	padding: 50px 0px 50px 0px;
	/* Estilo del layout */
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		'Nombre'
		'Ordenar';
	align-items: center;
`;

// Estilo para la entrada de texto
const BuscarNombreEstilo = styled.div`
	grid-area: Nombre;
	display: grid;
	grid-gap: 15px;
`;

const SeleccionarOrdenEstilo = styled.div`
	grid-area: Ordenar;
	display: grid;
	grid-gap: 15px;
`;

// Estilo para el texto 
const Label = styled.label`
    justify-self: center;
	align-self: center;
	color: white;
	font-weight: bold;
	user-select: none;
	font-size: 15px;
`;

// Estilo para el select de buscar 
const Select = styled.select`
     width: 70%;
	 height: 40px;
	 background-color: white;
	 color: rgb(50, 50, 50);
	 box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
	 justify-self: center;
	 align-self: center;
	 text-align: center;
	 font-weight: bold;

	 &:hover{
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
	 }
`;

// Estilo para el input de buscar
const Input = styled.input`
     width: 70%;
	 height: 40px;
	 background-color: white;
	 color: rgb(50, 50, 50);
	 box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
	 justify-self: center;
	 align-self: center;
	 text-align: center;
	 font-weight: bold;

	 &:hover{
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
	 }
`;


// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaEmpleados = ({ manejarFiltros }) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			ordenarPor: 0
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado
	// Observar el valor de las entradas
	const { buscar, ordenarPor } = watch();

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);

	};
	// Usamos la data en el formulario para cambiar el estado de filters en UserList
	useEffect(() => {
		manejarFiltros(buscar, ordenarPor);
	}, [buscar, ordenarPor]);

	// Parte 3. HTML que va a ser renderizado 
	return (
		<FiltroListaEmpleadosEstilo onSubmit={handleSubmit(onSubmit)}>
			{/* BUSCAR POR NOMBRE EMPLEADO */}
			<BuscarNombreEstilo>
				<Label>NOMBRE DEL EMPLEADO:</Label>
				<Input type='text' {...register('buscar')}></Input>
			</BuscarNombreEstilo>
			
			{/* SELECT PARA SELECCIONAR ORDEN */}

			<SeleccionarOrdenEstilo>
				<Label>SELECCIONAR ORDEN: </Label>
				<Select
					{...register('ordenarPor', {
						valueAsNumber: true
					})}
				>
					<option value={0}>Por defecto</option>
					<option value={1}>Por nombre</option>
				</Select>
			</SeleccionarOrdenEstilo>
		</FiltroListaEmpleadosEstilo>
	);
};

export default FiltroListaEmpleados;
