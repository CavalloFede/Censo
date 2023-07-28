import Dashboard from "../Dashboard";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container-fluid max-height: 100%">
        <Dashboard />
      </div>
    </>
  );
};

export default Layout;
