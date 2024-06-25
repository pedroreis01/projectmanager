import styled from 'styled-components';

export const CardContent = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  transition: 0.3s;
  background-color: #fff;
  padding: 2% 3%;
  border-radius: 20px;
`;
