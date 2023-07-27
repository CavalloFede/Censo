import "./NavBarItem.css";

const NavBarItem = ({ title, link }) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={link}>
        {title}
      </a>
    </li>
  );
};

export default NavBarItem;
