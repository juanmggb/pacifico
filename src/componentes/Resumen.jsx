import React from 'react';
import styled from 'styled-components';

/*=====================================================================================================*/
/*========================================= Estilos CSS ===============================================*/

const TablaEstilo = styled.table`
  text-align: left;
	background-color: silver;
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.3);
	border-collapse: collapse;
	th {
		text-align: left;
		min-width: 200px;
		border-radius: 0px;
		padding: 10px;
		border-bottom: 3px solid black;
	
	}
	td{
		border-radius: 0px;
		padding: 5px 10px 5px 10px;
		background-color: white;
		min-width: 200px;
		font-weight: bold;
	}
	td:nth-child(even){
		font-weight: normal;
	}
`;


/*======================================================================================================*/
/*================================== Funcion JSX del componente ========================================*/

function Resumen ({datos, listaCampos, encabezado}){
  
  if(datos){

  const campos = Object.keys(listaCampos)
  
  return(
    <TablaEstilo>
      <thead>
        <tr>
          <th>{encabezado}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {campos.map((campo, index) => (
          <tr key={index}>
            <td>{listaCampos[campo]}</td>
            <td>{datos[campo].toString()}</td>
          </tr> ))}
      </tbody>
    </TablaEstilo>
  )}};

export default Resumen;