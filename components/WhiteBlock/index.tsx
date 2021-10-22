import { ReactNode } from "react";
import styles from "./WhiteBlock.module.scss";
import clsx from "clsx";

type TWhiteBlock = {
  children?: ReactNode;
  className?: string;
};

export const WhiteBlock = ({ children, className }: TWhiteBlock) => {
  return <div className={clsx(styles.block, className)}>{children}</div>;
};

export default WhiteBlock;
