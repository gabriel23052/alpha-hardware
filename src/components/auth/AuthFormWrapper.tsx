import type { PropsWithChildren } from "react";

import UnderlinedTitle from "@components/UnderlinedTitle";

import classes from "./AuthFormWrapper.module.css";

type Props = PropsWithChildren & {
  title: string;
};

const AuthFormWrapper = ({ children, title }: Props) => {
  return (
    <section className={`${classes.container}`}>
      <UnderlinedTitle className={classes.title} align="center">
        {title}
      </UnderlinedTitle>
      {children}
    </section>
  );
};

export default AuthFormWrapper;
