import { Link } from "react-router";

import SVGGpu from "@svg/gpu.svg?react";
import SVGMotherBoard from "@svg/motherBoard.svg?react";
import SVGCpu from "@svg/cpu.svg?react";
import SVGRam from "@svg/ram.svg?react";
import SVGSsd from "@svg/ssd.svg?react";
import SVGHdd from "@svg/hdd.svg?react";

import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <nav className={`${classes.categories}`}>
      <div className={`${classes.titleWithLine}`}>
        <h2 className={`bg-white dneutral-xlight text-large ${classes.title}`}>
          O que você precisa?
        </h2>
      </div>
      <ul className={`text-default ${classes.list}`}>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGGpu />
            <span className="dneutral">Placas de Vídeo</span>
          </Link>
        </li>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGMotherBoard />
            <span className="dneutral">Placas-Mãe</span>
          </Link>
        </li>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGCpu />
            <span className="dneutral">Processadores</span>
          </Link>
        </li>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGRam />
            <span className="dneutral">Memórias</span>
          </Link>
        </li>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGSsd />
            <span className="dneutral">SSDs</span>
          </Link>
        </li>
        <li>
          <Link className="bg-lneutral-xlight" to="/">
            <SVGHdd />
            <span className="dneutral">HDs</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Categories;
