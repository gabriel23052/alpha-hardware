import { Link } from "react-router";

import SVGGpu from "@svg/gpu.svg?react";
import SVGMotherBoard from "@svg/motherBoard.svg?react";
import SVGCpu from "@svg/cpu.svg?react";
import SVGRam from "@svg/ram.svg?react";
import SVGSsd from "@svg/ssd.svg?react";
import SVGHdd from "@svg/hdd.svg?react";

import classes from "./Categories.module.css";

const CATEGORIES = [
  { name: "gpu", label: "Placas de Vídeo", Svg: SVGGpu },
  { name: "moba", label: "Placas-mãe", Svg: SVGMotherBoard },
  { name: "cpu", label: "Processadores", Svg: SVGCpu },
  { name: "ram", label: "Memórias RAM", Svg: SVGRam },
  { name: "ssd", label: "SSD's", Svg: SVGSsd },
  { name: "hdd", label: "HD's", Svg: SVGHdd },
];

const Categories = () => {
  return (
    <nav className={`${classes.categories}`}>
      <div className={`${classes.titleWithLine}`}>
        <h2 className={`bg-white dneutral-xlight text-large ${classes.title}`}>
          O que você precisa?
        </h2>
      </div>
      <ul className={`text-default ${classes.list}`}>
        {CATEGORIES.map(({ name, label, Svg }) => (
          <li key={name}>
            <Link
              className="bg-lneutral-xlight"
              to={`/products?category=${name}`}
            >
              <Svg />
              <span className="dneutral">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
