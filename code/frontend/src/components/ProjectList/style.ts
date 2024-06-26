import styled from 'styled-components';

export const ProjectListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ProjectInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const ProjectButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

export const NoProjectsText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 40px;
`;

export const DivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  gap: 20px;
`;

export const FilterDiv = styled.div``;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 5px;
`;
