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
`;

export const TaskText = styled.p<{ $done?: boolean }>`
  text-decoration-line: ${({ $done }) => ($done ? 'line-through' : 'none')};
  margin-bottom: 0;
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
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
