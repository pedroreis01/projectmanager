import { darken } from 'polished';
import styled from 'styled-components';

export const FormControl = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 15px;
  display: block;
  margin-bottom: 8px;
  color: #000;
`;

export const TextBox = styled.textarea<{ $error?: boolean; $height?: string }>`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  width: calc(100% - 30px);
  border-radius: 6px;
  padding: 10px 14px;
  resize: none;
  height: ${(props) => (props.$height ? props.$height : '100%')};
  border: 1px solid ${(props) => (props.$error ? '#FF6060' : '#c2c2c2')};
  background: #fff;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    cursor: pointer;
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
  margin: 4px 0 0px 2px;
  top: 100%;
`;
