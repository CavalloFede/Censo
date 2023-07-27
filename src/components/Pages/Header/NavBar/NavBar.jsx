import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const sections = [
    { title: "Section 1", link: "section-1" },
    { title: "Section 2", link: "section-2" },
  ];

  return (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      {sections.map(({ title, link }, index) => (
        <NavBarItem title={title} link={link} key={`navmenu-item-${index}`} />
      ))}
    </ul>
  );
};

export default NavBar;
