import classes from './UnderlinedTitle.module.css';

const UnderlinedTitle = ({ children }: { children: string }) => {
  return <h2 className={`dneutral-dark text-large ${classes.underlinedTitle}`}>{children}</h2>;
};

export default UnderlinedTitle;
