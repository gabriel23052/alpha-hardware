import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Placas de Vídeo</Link>
        </li>
        <li>
          <Link to="/">Placas-mãe</Link>
        </li>
        <li>
          <Link to="/">Processadores</Link>
        </li>
        <li>
          <Link to="/">Memórias RAM</Link>
        </li>
        <li>
          <Link to="/">SSDs</Link>
        </li>
        <li>
          <Link to="/">HDs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
