import React from "react";

import parsePrice from "@utils/parsePrice";

import SVGDisclaimer from "@svg/disclaimer.svg?react";

import classes from "./Freight.module.css";

// Temporário
const freightData: IFreight = {
  cep: "12345-678",
  options: [
    {
      name: "Correios",
      price: 1599,
      deliveryTime: 12,
    },
    {
      name: "Ecma Logística",
      price: 2599,
      deliveryTime: 4,
    },
    {
      name: "Sigmalog",
      price: 0,
      deliveryTime: 8,
    },
  ],
};

const Freight = () => {
  const [cep, setCep] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (freightData)
    return (
      <div className={classes.freight}>
        <h3 className="text-small-b dneutral-xlight">
          Opções de frete para o CEP {freightData.cep} (
          <button className="text-small dneutral-xlight">alterar</button>
          ):
        </h3>
        <ul className={classes.options}>
          {freightData.options.map((option) => (
            <li className="dneutral-dark" key={option.name}>
              <h4 className="text-small-b">{option.name}</h4>
              <span className="text-small">
                {option.deliveryTime} dias úteis
              </span>
              {option.price === 0 ? (
                <span className="text-default feedback-positive">
                  Frete grátis
                </span>
              ) : (
                <span className="text-default">
                  R$ {parsePrice(option.price)}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className={classes.disclaimer}>
          <SVGDisclaimer width={16} height={16} aria-hidden="true" />
          <span className="text-small lneutral-xdark">
            Prazos válidos a partir da data de envio
          </span>
        </div>
      </div>
    );

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.input}>
        <label className="text-default dneutral" htmlFor="cep">
          Calcule o frete e o prazo de entrega:
        </label>
        <input
          className="text-default dneutral-dark"
          type="text"
          id="cep"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <button className="text-default dneutral-light bg-white">OK</button>
      <a
        className="text-small lneutral-xdark"
        href="https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php"
        target="_blank"
        rel="external noreferrer"
      >
        Descubra seu CEP aqui
      </a>
    </form>
  );
};

export default Freight;
