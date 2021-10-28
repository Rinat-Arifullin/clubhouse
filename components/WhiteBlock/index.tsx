import styles from "./WhiteBlock.module.scss";
import clsx from "clsx";

type TWhiteBlock = {
  className?: string;
};

export const WhiteBlock: React.FC<TWhiteBlock> = ({ children, className }) => {
  return <div className={clsx(styles.block, className)}>{children}</div>;
};

export default WhiteBlock;
