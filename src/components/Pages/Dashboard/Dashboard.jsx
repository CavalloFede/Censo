import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetPersonasByUser,
  fetchGetDepartamentos,
  fetchGetOcupaciones,
} from "../../../services/censoAPI";
import { Link } from "react-router-dom";
import { onInitial as iniciarDepartamentos } from "../../../app/slices/departamentosSlice";
import { onInitial as iniciarCensados } from "../../../app/slices/censoSlice";

import Button from "../../UI/Button";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.userLogged);

  useEffect(() => {
    if (userLogged) {
      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          dispatch(iniciarCensados(users.personas));
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

      fetchGetOcupaciones(userLogged.apiKey, userLogged.id)
        .then((ocupaciones) => {
          dispatch(iniciarDepartamentos(ocupaciones.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged, dispatch]);

  return (
    <>
      <div className="container justify-content-center align-items-center">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Menú Censista</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <Link to="/dashboard/register">
              <Button className="btn-primary" cta="Censar" />
            </Link>
            <br />
            <Link to="/dashboard/listado">
              <Button className="btn-primary" cta="Listado" />
            </Link>
            <br />
            <Link to="/dashboard/stats">
              <Button className="btn-primary" cta="Stats" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
