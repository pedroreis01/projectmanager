import React, { forwardRef } from 'react';
import * as C from './style';
import { ClipLoader } from 'react-spinners';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  color?: 'primary' | 'submit' | 'danger' | 'cancel' | 'white';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onlyIcon?: boolean;
  isRound?: boolean;
  isLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color,
      startIcon,
      endIcon,
      onlyIcon,
      size,
      fullWidth,
      isRound,
      isLoading,
      ...props
    },
    ref
  ) => {
    return (
      <C.Button
        $color={color}
        $size={size}
        $fullWidth={fullWidth}
        $round={isRound}
        ref={ref}
        {...props}
        disabled={isLoading ?? props.disabled}
      >
        {startIcon && <C.IconDiv $mr={5}>{startIcon}</C.IconDiv>}
        {onlyIcon && <C.IconDiv>{onlyIcon}</C.IconDiv>}
        {children}
        {endIcon && !isLoading && <C.IconDiv $ml={5}>{endIcon}</C.IconDiv>}
        {isLoading && (
          <C.IconDiv $ml={20}>
            {<ClipLoader color="#dfdfdf" size={20} />}
          </C.IconDiv>
        )}
      </C.Button>
    );
  }
);

export default Button;
