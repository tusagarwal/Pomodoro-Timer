/*
 * Next.js Reusable Button Component
 * 
 * Requirements:
 * - Customizable with three variants: primary, danger, default
 * - Props: onClick, children, variant, disabled
 * - Structure: dynamic styles based on props
 * - Base: padding, rounded corners, focus ring, transition effects
 * 
 * Variants:
 * - Primary: blue background, white text
 * - Danger: red background, white text  
 * - Default: gray background, dark gray text
 * - Disabled: reduced opacity and not-allowed cursor
 */

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'default';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'default', 
  disabled = false,
  type = 'button',
  className = ''
}) => {
  // Base styles applied to all buttons
  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out";
  
  // Variant-specific styles
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500", 
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
  };
  
  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed hover:bg-current";
  
  // Combine all styles
  const buttonClasses = `
    ${baseStyles} 
    ${disabled ? disabledStyles : variantStyles[variant]} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
