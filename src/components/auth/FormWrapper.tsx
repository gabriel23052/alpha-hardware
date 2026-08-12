import type { PropsWithChildren } from "react";

import UnderlinedTitle from "@components/ui/UnderlinedTitle";

import classes from "./FormWrapper.module.css";

type Props = PropsWithChildren & {
  title: string;
};

const FormWrapper = ({ children, title }: Props) => {
  return (
    <section className={classes.container}>
      <UnderlinedTitle className={classes.title} align="center">
        {title}
      </UnderlinedTitle>
      {children}
    </section>
  );
};

export default FormWrapper;
