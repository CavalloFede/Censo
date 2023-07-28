import Dashboard from "../Dashboard";
import Header from "../Header";

const Layout = ({ userLogged, onLogout }) => {
  return (
    <>
      <Header onLogout={onLogout} />
      <div className="container-fluid max-height: 100%">
        <Dashboard userLogged={userLogged} />
      </div>
    </>
  );
};

export default Layout;
