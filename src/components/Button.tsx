// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export default function Button({ onClick, children, active = false, disabled = false }: ButtonProps) {
  const baseColor = '#c34a7f';
  const textColor = active ? '#ffffff' : baseColor;
  const bgColor = active ? baseColor : '#ffffff';
  const borderColor = baseColor;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '16px',
        margin: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: active ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        transition: 'background-color 0.2s, color 0.2s, transform 0.1s',
      }}
      onMouseOver={(e) => {
        if (!disabled && !active) e.currentTarget.style.backgroundColor = '#f2d4e2';
      }}
      onMouseOut={(e) => {
        if (!disabled && !active) e.currentTarget.style.backgroundColor = '#ffffff';
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}
