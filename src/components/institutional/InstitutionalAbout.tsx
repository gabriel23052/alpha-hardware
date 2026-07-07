import usePageTitle from "@hooks/usePageTitle";

import classes from "./Institutional.module.css";

const InstitutionalAbout = () => {
  usePageTitle("Alpha Hardware | Sobre");

  return (
    <main className={`defaultContainer ${classes.container}`}>
      <header className={classes.header}>
        <h1 className="text-verylarge-m dneutral-dark">
          Sobre a Alpha Hardware
        </h1>
        <p className="text-default dneutral">
          Esta página faz parte de uma aplicação demonstrativa. A história
          apresentada é fictícia e não possui valor legal, comercial ou
          institucional.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Nossa história</h2>
        <p className="text-default dneutral">
          A Alpha Hardware nasceu em 2024 como uma loja criada por entusiastas
          de computadores que queriam aproximar tecnologia, curadoria e
          informação clara. A ideia inicial era simples: organizar componentes
          de hardware de forma objetiva para ajudar pessoas a montar, atualizar
          ou comparar configurações de PC.
        </p>
        <p className="text-default dneutral">
          Com o tempo, a marca passou a simular uma operação completa de
          e-commerce, reunindo placas de vídeo, processadores, memórias,
          unidades de armazenamento e placas-mãe em uma experiência pensada para
          estudo de interface, catálogo e fluxo de compra.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">O que buscamos</h2>
        <p className="text-default dneutral">
          A proposta da Alpha Hardware é apresentar produtos com nomes,
          categorias, preços e especificações de forma consistente. Cada página
          foi planejada para demonstrar como uma loja de hardware pode organizar
          filtros, busca, promoções, páginas de produto e informações
          institucionais.
        </p>
        <p className="text-default dneutral">
          Por se tratar de um projeto demonstrativo, nenhuma informação exibida
          representa oferta real, disponibilidade de estoque, obrigação de venda
          ou vínculo com fabricantes.
        </p>
      </section>
    </main>
  );
};

export default InstitutionalAbout;
