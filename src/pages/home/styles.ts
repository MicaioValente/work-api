import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ContainerLogin = styled.div`
  max-width: 500px;
  width: 500px;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 40%);
  background-color: #fff;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const Image = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 150px;
`;
