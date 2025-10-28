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

const HeaderNavBar = () => {
  return (
    <div className="bg-dneutral-xdark" id="ariaHeaderNavBar">
      <nav className="lneutral-light text-default defaultContainer">
        <ul className={`${classes.links}`}>
          {CATEGORIES.map(({ name, label }) => (
            <li key={name}>
              <Link
                className="lneutral-light"
                to={`/products?category=${name}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavBar;
