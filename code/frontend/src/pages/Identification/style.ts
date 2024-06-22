import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #0c9f96;
`;

export const Card = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 56px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  /* transition: box-shadow 0.25s; */

  /* border: 1px solid; */
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const DivInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > img {
    max-width: 500px;
  }
`;
