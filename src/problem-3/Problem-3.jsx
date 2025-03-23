/** -----------------Here are some issues of Button component or Problem-3---------------------:
 * Unnecessary function wrapper
 * Too many `if-else`
 * Button with mostly the same logic.
 * Used inline styles
 * fixed button attributes
 * fixed icon
 * Code duplication
 *
 */

import React from "react";

/** ---------------Solution 1---------------
 *
 * Used inline styles
 * fixed icon
 * fixed button attributes
 * Not manage button attributes
 *
 */
const VARIANT_STYLES = {
  primary: { backgroundColor: "blue", color: "white" },
  secondary: { backgroundColor: "gray", color: "black" },
};

export const Button = ({
  variant = "primary",
  showArrowIcon,
  children,
  onClick,
}) => {
  const btnStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  return (
    <button style={btnStyle} onClick={onClick}>
      {children}
      {showArrowIcon && <span>&rarr;</span>}
    </button>
  );
};

/** ------------------Solution 2---------------
 *
 * Used class styles
 * Used fixable icon
 * Managed button attributes
 *
 */

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export const Button2 = ({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}) => {
  const buttonVariantClass = variantClasses[variant] || variantClasses.primary;

  return (
    <button {...props} className={`${buttonVariantClass} ${className}`}>
      {children}
      {icon && <span>{icon === "array" ? "→" : icon}</span>}
    </button>
  );
};

export default Button2;
