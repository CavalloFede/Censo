import { Link } from 'react-router-dom';

import Button from '../../UI/Button';

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
