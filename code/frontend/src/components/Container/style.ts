import styled, { css } from 'styled-components';

export const Container = styled.div<{
  $background?: string;
  $p?: string;
  $pt?: string;
  $pr?: string;
  $pb?: string;
  $pl?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: ${(props) => (props.$pt ? props.$pt : 0)};
  padding-right: ${(props) => (props.$pr ? props.$pr : 0)};
  padding-bottom: ${(props) => (props.$pb ? props.$pb : 0)};
  padding-left: ${(props) => (props.$pl ? props.$pl : 0)};
  padding: ${(props) => (props.$p ? props.$p : '5% 10%')};

  flex: 1;

  ${(props) => {
    if (props.$background == 'green') {
      return css`
        background: #0c9f96;
      `;
    } else if (props.$background == 'light') {
      return css`
        background: #f9f9f9;
      `;
    } else {
      return css`
        background: #ffffff;
      `;
    }
  }};
`;
