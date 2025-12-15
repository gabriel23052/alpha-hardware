import classes from "./LoadingBox.module.css";

const LoadingBox = ({ height }: { height: string }) => {
  return <div className={`defaultContainer ${classes.container}`} style={{ height }}></div>;
};

export default LoadingBox;
