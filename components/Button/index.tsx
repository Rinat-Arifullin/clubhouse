import clsx from "clsx";
import React from "react";
import styles from "./Button.module.scss";

const colors = {
  green: styles.buttonGreen,
  gray: styles.buttonGray,
  blue: styles.buttonBlue,
};

interface IButtonProps {
  disabled?: boolean;
  color?: keyof typeof colors;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled,
  color,
  className,
  onClick,
}) => {
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
