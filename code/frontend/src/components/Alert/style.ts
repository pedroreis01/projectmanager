import styled from 'styled-components';

interface AlertCardThemeData {
  borderColor: string;
}

const AlertCard = styled.div`
  color: #ffffff;
  background-color: #012025;
  border-color: #00404a;

  border: 1px solid ${(props) => props.theme.borderColor};

  display: flex;

  border-radius: 16px;

  padding: 5px;
  margin: 10px;
  width: 250px;
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(0, 0, 0, 0.3);
`;

export const AlertIcon = styled.div`
  display: flex;
  padding: 5px;
  margin: 5px;
  height: 100%;
`;

export const ContentAlerts = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column-reverse;
`;

export const ContentAlertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  /* margin-left: 5px; */
  /* gap: 25px; */
`;

export const AlertClose = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;

  svg {
    cursor: pointer;
  }
`;

export const AlertTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

export const TitleAlert = styled.div`
  display: flex;
  margin: auto;
  padding: 0;
  width: 100%;

  font-style: normal;
  font-weight: 600;
  font-size: 15px;
`;

export const BodyAlert = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  padding: 5px 0;
  width: 100%;
  margin: auto;
  padding: 5px 0;

  font-style: normal;
  font-weight: 300;
  font-size: 12px;
`;

export { AlertCard };
export type { AlertCardThemeData };
