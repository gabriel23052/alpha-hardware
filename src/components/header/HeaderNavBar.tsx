import { Link } from "react-router";

import classes from "./HeaderNavBar.module.css";

const CATEGORIES = [
  { name: "gpu", label: "Placas de Vídeo" },
  { name: "moba", label: "Placas-mãe" },
  { name: "cpu", label: "Processadores" },
  { name: "ram", label: "Memórias RAM" },
  { name: "ssd", label: "SSD's" },
  { name: "hdd", label: "HD's" },
];

type Props = { maxHeight: string; id: string };

const HeaderNavBar = ({ maxHeight, id }: Props) => {
  return (
    <nav
      className={`bg-dneutral-xdark ${classes.container}`}
      id={id}
      style={{ maxHeight }}
    >
      <ul
        className={`lneutral-light text-default defaultContainer ${classes.links}`}
      >
        {CATEGORIES.map(({ name, label }) => (
          <li key={name}>
            <Link className="lneutral-light" to={`/products?category=${name}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavBar;
