import styled, { css } from 'styled-components';

export const Container = styled.div<{
  $background?: string;
  $p?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: ${(props) => (props.$p ? props.$p : '5% 10%')};

  flex: 1 1 0%;

  ${(props) => {
    if (props.$background == 'gray') {
      return css`
        background: #f1f1f1;
      `;
    } else {
      return css`
        background: #ffffff;
      `;
    }
  }};
`;
