import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container-fluid max-height: 100%">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
