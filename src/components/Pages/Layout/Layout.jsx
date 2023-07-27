import Button from '../../UI/Button';
import Dashboard from '../Dashboard';

const Layout = ({ userLogged }) => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card text-center" style={{ width: '300px' }}>
          <div className="card-header">
            <h5 className="card-title">Menú Censista</h5>
          </div>
          <div className="card-body">
            <Button className="btn-primary btn-block mb-3" cta="Censar" />
            <Button className="btn-primary btn-block mb-3" cta="Listado" />
            <Button className="btn-primary btn-block mb-3" cta="Stats" />
          </div>
          <div className="card-body">
            <Dashboard userLogged={userLogged} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
