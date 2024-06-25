import { darken } from 'polished';
import styled from 'styled-components';

export const FormControl = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 15px;
  display: inline-block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #000;
`;

export const LoadingWrapper = styled.div`
  position: relative;
  width: 100%;

  & > span {
    height: 0.2rem;
    width: 0.2rem;
    background: #001b20;
    position: absolute;
    box-sizing: border-box;
    top: 5px;
    right: 3px;
    border-color: #fff #fff transparent !important;
  }
`;

export const Select = styled.select<{ $error?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  border-radius: 6px;
  padding: 10px 14px;
  border: 1px solid ${(props) => (props.$error ? '#FF6060' : '#c2c2c2')};

  background: #fff;
  color: #000;

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

export const SelectOption = styled.option`
  color: #000;
  background: #fff;
  font-size: 16px;
  font-weight: 400;
  width: calc(100% - 30px);
  border-radius: 8px;
  padding: 10px 14px;
  &:hover {
    background: ${darken(0.1, '#FFF')};
  }
  border: none;
`;

export const Error = styled.p`
  position: absolute;
  color: #ff6060;
  font-size: 14px;
  font-weight: 400;
  top: 80%;
`;
