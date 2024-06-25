import { ClipLoader } from 'react-spinners';
import * as C from './style';
import * as React from 'react';


interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  id: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

interface SelectOptionProps extends React.HTMLProps<HTMLOptionElement> {
  children: React.ReactNode;
  value: string;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ children, value, ...rest }) => {
  return <C.SelectOption value={value} {...rest}>
    {children}
  </C.SelectOption>
}


const Select: React.FC<SelectProps> = ({
  id,
  label,
  error,
  errorMessage,
  isLoading,
  ...rest
}) => {
  return (
    <C.FormControl>
      {label &&
        <C.Label htmlFor={id}>{label}</C.Label>
      }
      {isLoading ?
        <C.LoadingWrapper>
          <ClipLoader />
          <C.Select
            id={id}
            $error={error}
            {...rest}
          />
        </C.LoadingWrapper>
        :
        <>
          <C.Select
            id={id}
            $error={error}
            {...rest}
          />
          {error && <C.Error>{errorMessage ?? 'Campo não pode ser vazio!'}</C.Error>}
        </>
      }
    </C.FormControl>
  )
}

export default Select;
