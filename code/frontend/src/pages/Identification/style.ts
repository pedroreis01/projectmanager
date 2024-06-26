import { lighten } from 'polished';
import styled from 'styled-components';

export const Logo = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 100px;
  }
`;

export const ContentForm = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FormTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  width: 70%;
  gap: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;

  & > img {
    max-width: 450px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    & > img {
      max-width: 200px;
    }
  }
`;

export const Click = styled.div`
  text-decoration-line: underline;
  display: inline;
  cursor: pointer;

  &:hover {
    color: ${lighten(0.5, '#000')};
  }
`;
