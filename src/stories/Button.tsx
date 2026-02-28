import React from 'react';
import { tokens } from '../../tokens';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ButtonStyle = 'accent' | 'dark' | 'light' | 'alert';
export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual colour style */
  variant?: ButtonStyle;
  /** Primary = filled, Secondary = outlined, Tertiary = ghost */
  buttonType?: ButtonType;
  /** Stretch to fill container width */
  fullWidth?: boolean;
  /** Button label – omit for icon-only buttons */
  children?: React.ReactNode;
  /** Optional trailing icon element */
  icon?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Colour map                                                         */
/* ------------------------------------------------------------------ */

const colours = {
  accent: {
    bg: tokens.color.orange[500],
    bgHover: tokens.color.orange[400],
    bgPressed: tokens.color.orange[600],
    text: '#FCFCFC',
    border: tokens.color.orange[500],
    borderHover: tokens.color.orange[600],
    textOnBorder: tokens.color.orange[500],
    textOnBorderHover: tokens.color.orange[600],
  },
  dark: {
    bg: '#131313',
    bgHover: '#2F2F2F',
    bgPressed: '#3E3E3E',
    text: '#FCFCFC',
    border: '#131313',
    borderHover: '#2F2F2F',
    textOnBorder: '#131313',
    textOnBorderHover: '#2F2F2F',
  },
  light: {
    bg: '#FCFCFC',
    bgHover: tokens.color.grey[50],
    bgPressed: tokens.color.grey[100],
    text: '#131313',
    border: '#FCFCFC',
    borderHover: tokens.color.grey[50],
    textOnBorder: '#131313',
    textOnBorderHover: '#131313',
  },
  alert: {
    bg: tokens.color.red[500],
    bgHover: tokens.color.red[600],
    bgPressed: tokens.color.red[700],
    text: '#FCFCFC',
    border: tokens.color.red[500],
    borderHover: tokens.color.red[600],
    textOnBorder: tokens.color.red[500],
    textOnBorderHover: tokens.color.red[600],
  },
} as const;

const disabledBg = tokens.color.grey[100];
const disabledText = tokens.color.grey[600];
const disabledBorder = tokens.color.grey[100];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'accent',
      buttonType = 'primary',
      fullWidth = false,
      children,
      icon,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const c = colours[variant];
    const hasIcon = Boolean(icon);
    const hasText = Boolean(children);

    /* ---- base styles ---- */
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: hasText && hasIcon ? 8 : 0,
      height: 46,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: hasText && hasIcon ? 12 : 16,
      borderRadius: 8,
      border: 'none',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '100%',
      letterSpacing: 0,
      width: fullWidth ? '100%' : undefined,
      transition: 'background-color 150ms, border-color 150ms, color 150ms',
      boxSizing: 'border-box',
    };

    /* ---- variant + type styles ---- */
    if (disabled) {
      if (buttonType === 'primary') {
        base.backgroundColor = disabledBg;
        base.color = disabledText;
      } else if (buttonType === 'secondary') {
        base.backgroundColor = 'transparent';
        base.border = `1px solid ${disabledBorder}`;
        base.color = disabledText;
      } else {
        base.backgroundColor = 'transparent';
        base.color = disabledText;
      }
    } else if (buttonType === 'primary') {
      base.backgroundColor = c.bg;
      base.color = c.text;
    } else if (buttonType === 'secondary') {
      base.backgroundColor = 'transparent';
      base.border = `1px solid ${c.border}`;
      base.color = c.textOnBorder;
    } else {
      // tertiary
      base.backgroundColor = 'transparent';
      base.color = c.textOnBorder;
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        style={{ ...base, ...style }}
        onMouseEnter={(e) => {
          if (disabled) return;
          const el = e.currentTarget;
          if (buttonType === 'primary') {
            el.style.backgroundColor = c.bgHover;
          } else if (buttonType === 'secondary') {
            el.style.borderColor = c.borderHover;
            el.style.color = c.textOnBorderHover;
          } else {
            el.style.color = c.textOnBorderHover;
          }
          rest.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (disabled) return;
          const el = e.currentTarget;
          if (buttonType === 'primary') {
            el.style.backgroundColor = c.bg;
          } else if (buttonType === 'secondary') {
            el.style.borderColor = c.border;
            el.style.color = c.textOnBorder;
          } else {
            el.style.color = c.textOnBorder;
          }
          rest.onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          if (disabled) return;
          const el = e.currentTarget;
          if (buttonType === 'primary') {
            el.style.backgroundColor = c.bgPressed;
          }
          rest.onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          if (disabled) return;
          const el = e.currentTarget;
          if (buttonType === 'primary') {
            el.style.backgroundColor = c.bgHover;
          }
          rest.onMouseUp?.(e);
        }}
        {...rest}
      >
        {hasText && <span>{children}</span>}
        {hasIcon && (
          <span style={{ display: 'flex', width: 14, height: 14, flexShrink: 0 }}>
            {icon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
