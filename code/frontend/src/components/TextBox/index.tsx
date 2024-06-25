import * as C from './style';
import * as React from 'react';


interface TextBoxProps extends React.HTMLProps<HTMLTextAreaElement> {
  id: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  height?: string;
}

const Input: React.FC<TextBoxProps> = ({
  id,
  label,
  error,
  errorMessage,
  height,
  ...rest
}) => {
  return (
    <C.FormControl>
      {label &&
        <C.Label htmlFor={id}>{label}</C.Label>
      }

      <C.TextBox
        id={id}
        $error={error}
        $height={height}
        {...rest}
      />
      {error && <C.Error>{errorMessage ?? 'Campo não pode ser vazio!'}</C.Error>}
    </C.FormControl>
  )
}

export default Input;
