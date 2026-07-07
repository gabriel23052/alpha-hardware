import usePageTitle from "@hooks/usePageTitle";

import classes from "./Institutional.module.css";

const InstitutionalReturns = () => {
  usePageTitle("Alpha Hardware | Política de Devolução");

  return (
    <main className={`defaultContainer ${classes.container}`}>
      <header className={classes.header}>
        <h1 className="text-verylarge-m dneutral-dark">
          Política de Devolução
        </h1>
        <p className="text-default dneutral">
          Esta política é demonstrativa e não possui valor legal. Ela usa uma
          estrutura comum de políticas de troca e devolução para simular uma
          loja virtual de hardware.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Arrependimento de compra</h2>
        <p className="text-default dneutral">
          Em operações reais de e-commerce, políticas de devolução costumam
          prever prazo para arrependimento em compras feitas fora de loja
          física, com orientações sobre solicitação, embalagem, postagem e
          reembolso.
        </p>
        <p className="text-default dneutral">
          Na Alpha Hardware demonstrativa, não há pedidos reais, pagamentos,
          envio de produtos ou processo efetivo de devolução.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Condições do produto</h2>
        <p className="text-default dneutral">
          Uma política real pode solicitar que o produto seja enviado com nota,
          acessórios, embalagem, manuais e sem sinais de mau uso. Também pode
          diferenciar troca por defeito, devolução por arrependimento e
          divergência entre produto recebido e pedido.
        </p>
        <p className="text-default dneutral">
          Produtos de hardware costumam exigir atenção extra com lacres,
          componentes sensíveis, cabos, conectores e embalagem adequada para
          transporte.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Reembolso e atendimento</h2>
        <p className="text-default dneutral">
          Em um cenário real, o reembolso normalmente segue o meio de pagamento
          utilizado e pode depender de análise do item devolvido. O atendimento
          informa prazos, status e eventuais documentos necessários.
        </p>
        <p className="text-default dneutral">
          Este texto não cria direitos, deveres, prazos ou garantias. Ele existe
          apenas para completar a experiência institucional da aplicação.
        </p>
      </section>
    </main>
  );
};

export default InstitutionalReturns;
