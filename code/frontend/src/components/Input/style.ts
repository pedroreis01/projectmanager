import { darken } from 'polished';
import styled from 'styled-components';

export const FormControl = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 15px;
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #000;
`;

export const Input = styled.input<{ $error?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  width: calc(100% - 30px);
  border-radius: 6px;
  padding: 10px 14px;
  border: 1px solid ${(props) => (props.$error ? '#FF6060' : '#c2c2c2')};

  background: #fff;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #8f8f8f;
  }

  &:focus {
    border-color: ${(props) =>
      props.$error ? darken(0.1, '#FF6060') : '#000'};
    outline: none;
  }
`;

export const Error = styled.p`
  position: absolute;
  color: #ff6060;
  font-size: 14px;
  font-weight: 400;
  top: 80%;
`;
