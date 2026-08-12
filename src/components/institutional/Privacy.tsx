import usePageTitle from "@hooks/usePageTitle";

import classes from "./Institutional.module.css";

const Privacy = () => {
  usePageTitle("Alpha Hardware | Política de Privacidade");

  return (
    <main className={`defaultContainer ${classes.container}`}>
      <header className={classes.header}>
        <h1 className="text-verylarge-m dneutral-dark">
          Política de Privacidade
        </h1>
        <p className="text-default dneutral">
          Este texto é demonstrativo, foi escrito para simular uma política de
          privacidade comum em lojas virtuais e não possui valor legal. Para uso
          real, o conteúdo deve ser revisado por profissionais responsáveis.
        </p>
      </header>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">
          Dados que poderiam ser usados
        </h2>
        <p className="text-default dneutral">
          Em uma operação real, uma loja poderia tratar dados como nome, e-mail,
          endereço, telefone, histórico de pedidos, preferências de navegação e
          informações necessárias para pagamento, entrega, atendimento e
          segurança da conta.
        </p>
        <p className="text-default dneutral">
          Nesta aplicação, esses dados não representam um cadastro real. As
          telas e formulários existem apenas para demonstrar fluxos de uso e
          comportamento da interface.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Finalidade e segurança</h2>
        <p className="text-default dneutral">
          Em políticas reais, os dados costumam ser usados para processar
          pedidos, responder solicitações, prevenir fraudes, personalizar a
          experiência e cumprir obrigações aplicáveis. Também é comum informar
          que medidas técnicas e administrativas são adotadas para reduzir
          riscos de acesso indevido.
        </p>
        <p className="text-default dneutral">
          Como este projeto é uma demonstração, não há promessa de tratamento
          jurídico, comercial ou operacional de dados pessoais.
        </p>
      </section>

      <section className={classes.section}>
        <h2 className="text-large-m dneutral-dark">Direitos do titular</h2>
        <p className="text-default dneutral">
          Uma política real deve explicar como titulares podem solicitar acesso,
          correção, exclusão, portabilidade, informação sobre compartilhamento e
          outros direitos previstos pela legislação aplicável.
        </p>
        <p className="text-default dneutral">
          Na Alpha Hardware demonstrativa, esses canais não substituem
          mecanismos formais de atendimento, privacidade ou proteção de dados.
        </p>
      </section>
    </main>
  );
};

export default Privacy;
