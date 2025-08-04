import React from "react";

import parsePrice from "@utils/parsePrice";

import SVGDisclaimer from "@svg/disclaimer.svg?react";

import classes from "./ProductFreight.module.css";

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

const ProductFreight = () => {
  const [cep, setCep] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (freightData)
    return (
      <div className={`${classes.freight}`}>
        <h3 className="dneutral-xlight text-small-b">
          Opções de frete para o CEP {freightData.cep} (
          <button className="dneutral-xlight text-small">alterar</button>
          ):
        </h3>
        <ul className={`${classes.options}`}>
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
        <div className={`${classes.disclaimer}`}>
          <SVGDisclaimer />
          <span className="lneutral-xdark text-small">
            Prazos válidos a partir da data de envio
          </span>
        </div>
      </div>
    );

  return (
    <form className={`${classes.form}`} onSubmit={handleSubmit}>
      <div className={`${classes.input}`}>
        <label className="dneutral text-default" htmlFor="cep">
          Calcule o frete e o prazo de entrega:
        </label>
        <input
          className="dneutral-dark text-default"
          type="text"
          id="cep"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <button className="dneutral-light bg-white text-default">OK</button>
      <a
        className="lneutral-xdark text-small"
        href="https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php"
        target="_blank"
        rel="external noreferrer"
      >
        Descubra seu CEP aqui
      </a>
    </form>
  );
};

export default ProductFreight;
