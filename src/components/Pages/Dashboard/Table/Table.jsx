import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchGetPersonasByUser,
  fetchGetOcupaciones,
  fetchGetDepartamentos,
} from "../../../../services/censoAPI";
import { onInitial as iniciarCensados } from "../../../../app/slices/censoSlice";
import { onInitial as iniciarOcupaciones } from "../../../../app/slices/ocupacionesSlice";
import { onInitial as iniciarDepartamentos } from "../../../../app/slices/departamentosSlice";

import Alert from "../../../UI/Alert";
import Select from "../../../UI/Select";
import ToDoItemRow from "./ItemRow";

const Table = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const usersData = useSelector((state) => state.censo.censados);
  const ocupacionesData = useSelector(
    (state) => state.ocupaciones.ocupacionesData
  );
  const departamentosData = useSelector(
    (state) => state.departamentos.departamentosData
  );

  const [ocupacion, setOcupacion] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOcupacion(value);
  };

  useEffect(() => {
    if (userLogged) {
      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          dispatch(iniciarCensados(users.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchGetOcupaciones(userLogged.apiKey, userLogged.id)
        .then((ocupaciones) => {
          dispatch(iniciarOcupaciones(ocupaciones.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
        });
      fetchGetDepartamentos(userLogged.apiKey, userLogged.id)
        .then((departamentos) => {
          dispatch(iniciarDepartamentos(departamentos.departamentos));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    if (ocupacion !== "") {
      const filteredUsersData = usersData.filter(
        (user) => user.ocupacion === parseInt(ocupacion)
      );
      setFilteredUsers(filteredUsersData);
    } else {
      setFilteredUsers(usersData);
    }
  }, [ocupacion, usersData]);

  return (
    <>
      <section className="d-flex flex-md justify-content-center ventana">
        <div className="card shadow-p">
          <h3>Listado de personas censadas</h3>
          <section className="card-body">
            <Select
              options={ocupacionesData}
              value={ocupacion}
              name={ocupacion}
              onChange={handleInputChange}
            ></Select>
            <div className="table-responsive" style={{ maxHeight: "600px" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Departamento</th>
                    <th scope="col">Ocupacion</th>
                    <th scope="col">Borrar</th>
                  </tr>
                </thead>

                {filteredUsers.length > 0 ? (
                  <tbody>
                    {filteredUsers.map(
                      ({ id, nombre, ocupacion, departamento }) => (
                        <ToDoItemRow
                          key={id}
                          id={id}
                          nombre={nombre}
                          ocupacion={ocupacion}
                          ocupaciones={ocupacionesData}
                          departamento={departamento}
                          departamentos={departamentosData}
                        />
                      )
                    )}
                  </tbody>
                ) : (
                  <Alert
                    classColor={"primary"}
                    message={"Aún no tienes Usuarios Censados"}
                  />
                )}
              </table>
            </div>
            <Link to="/dashboard">Volver</Link>
          </section>
        </div>
      </section>
    </>
  );
};
export default Table;
