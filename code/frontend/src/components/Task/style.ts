import styled from 'styled-components';

export const TaskItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  width: calc(100% - 20px);
`;

export const TaskCheckbox = styled.input`
  margin-right: 10px;
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

export const TaskBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

export const TaskText = styled.p<{ $done?: boolean }>`
  font-size: 1rem;
  text-decoration-line: ${({ $done }) => ($done ? 'line-through' : 'none')};
  margin: 0;
  padding-top: 0;

  &.name-project {
    font-size: 0.7rem;
    font-weight: 500;
    background: #f1f1f1;
    width: fit-content;
    padding: 2px 7px;
    border-radius: 20px;
  }
`;

export const TaskGroupDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TaskDate = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
  gap: 5px;
  margin: 0;
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
