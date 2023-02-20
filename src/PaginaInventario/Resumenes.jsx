import React from "react";

import ResumenCrear from "./ResumenCrear";
import ResumenModificacion from "./ResumenModificacion";
import ResumenEliminar from "./ResumenEliminar";

/*=======================================================================================================*/
/*================================== Funcion JSX del componente =========================================*/

function Resumenes({ opcion, productos }) {
  switch (opcion) {
    case 0:
      return <ResumenCrear productos={productos} />;
    case 1:
      return <ResumenModificacion productos={productos} />;
    case 2:
      return <ResumenEliminar productos={productos} />;
    default:
      return 0;
  }
}

export default Resumenes;
