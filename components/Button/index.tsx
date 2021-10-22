import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Button.module.scss";

type TButton = {
  children?: ReactNode;
  disabled?: boolean;
  color?: "green" | "gray";
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, disabled, color, className, onClick }: TButton) => {
  const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(className, styles.button, colors[color])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
