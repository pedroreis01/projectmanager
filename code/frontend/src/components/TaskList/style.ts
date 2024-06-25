import styled from 'styled-components';

export const TaskListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TaskInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const TaskButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

export const NoTasksText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 40px;
`;
