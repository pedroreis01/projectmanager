import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-height: calc(100vh - 13vh);
`;

export const ContentWithoutLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
