import { Link } from "react-router-dom";

import Button from "../../UI/Button";
import Counters from "./Counters";

const Dashboard = () => {
  return (
    <>
      <div className="container justify-content-center align-items-center ">
        <div className="card text-center ">
          <div className="card-header">
            <h5 className="card-title">Menú Censista</h5>
          </div>
          <div className="card-body d-flex flex-sm-column ">
            <Link to="/dashboard/register">
              <Button classColor="btn-info" cta="Censar" width="200px" />
            </Link>
            <br />
            <Link to="/dashboard/listado">
              <Button classColor="btn-info" cta="Censados" width="200px" />
            </Link>
            <br />
            <Link to="/dashboard/stats">
              <Button classColor="btn-info" cta="Análisis" width="200px" />
            </Link>
            <br />
            <Counters />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
