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
  width: calc(100% - 32px);
  border-radius: 6px;
  padding: 10px 14px;
  border: 0.0005px solid ${(props) => (props.$error ? '#FF6060' : '#c2c2c2')};
  background: #fff;
  &::placeholder {
    font-size: 13px;
    font-weight: 400;
    color: #8f8f8f;
  }

  &:focus {
    border-color: #000;
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
