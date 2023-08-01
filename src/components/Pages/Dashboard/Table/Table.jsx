import { useEffect } from "react";
import Alert from "../../../UI/Alert";
import ToDoItemRow from "./ItemRow";
import "./Table.css";

const Table = ({ usersData, ocupacionesData }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Ocupacion</th>
          <th scope="col">Borrar</th>
        </tr>
      </thead>

      {usersData.length > 0 ? (
        <tbody>
          {usersData.map(({ id, nombre, ocupacion }) => (
            <ToDoItemRow
              key={id}
              id={id}
              nombre={nombre}
              ocupacion={ocupacion}
              ocupaciones={ocupacionesData}
            />
          ))}
        </tbody>
      ) : (
        <Alert
          classColor={"primart"}
          message={"Aún no tienes Usuarios Censados"}
        />
      )}
    </table>
  );
};
export default Table;
