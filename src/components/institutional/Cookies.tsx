import usePageTitle from "@hooks/usePageTitle";

import classes from "./Institutional.module.css";

const Cookies = () => {
  usePageTitle("Alpha Hardware | Política de Cookies");

  return (
    <main className={`defaultContainer ${classes.container}`}>
      <header className={classes.header}>
        <h1 className="text-verylarge-m dneutral-dark">Política de Cookies</h1>
        <p className="text-default dneutral">
          Esta política é um texto demonstrativo baseado na estrutura comum de
          avisos de cookies. Ela não possui valor legal e não substitui uma
          política preparada para uma operação real.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">O que são cookies</h2>
        <p className="text-default dneutral">
          Cookies são pequenos arquivos armazenados no dispositivo do usuário
          para lembrar preferências, manter sessões, medir uso do site ou apoiar
          recursos de segurança e desempenho.
        </p>
        <p className="text-default dneutral">
          Em uma loja virtual real, eles podem ajudar a manter itens no
          carrinho, registrar filtros selecionados, lembrar autenticação e
          entender quais páginas precisam de melhoria.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Tipos de cookies</h2>
        <p className="text-default dneutral">
          Cookies necessários mantêm funções básicas do site. Cookies de
          desempenho ajudam a medir navegação e estabilidade. Cookies de
          preferência lembram escolhas como filtros, busca ou exibição. Cookies
          de marketing, quando existentes, apoiam campanhas e personalização de
          anúncios.
        </p>
        <p className="text-default dneutral">
          Nesta aplicação, qualquer referência a cookies serve apenas como
          exemplo de conteúdo institucional e não representa uma ferramenta real
          de consentimento.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Controle pelo usuário</h2>
        <p className="text-default dneutral">
          Em sites reais, o usuário pode receber opções para aceitar, rejeitar
          ou gerenciar categorias de cookies, além de configurar bloqueios pelo
          próprio navegador.
        </p>
        <p className="text-default dneutral">
          Para uma implementação real, a gestão de consentimento deve refletir
          as tecnologias usadas no site e a legislação aplicável.
        </p>
      </section>
    </main>
  );
};

export default Cookies;
