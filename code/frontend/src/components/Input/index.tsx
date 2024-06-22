import { forwardRef } from 'react';
import * as C from './style';
import * as React from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, errorMessage, ...rest }, ref) => {
    return (
      <C.FormControl>
        {label && <C.Label htmlFor={id}>{label}</C.Label>}
        <C.Input
          id={id}
          $error={error}
          ref={ref}
          {...rest}
        />
        {error && (
          <C.Error>{errorMessage ?? 'Campo não pode ser vazio!'}</C.Error>
        )}
      </C.FormControl>
    );
  }
);

export default Input;
