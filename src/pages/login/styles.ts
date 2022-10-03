import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Image = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 150px;
`;

export const Content = styled.div`
  max-width: 500px;
  width: 500px;
  position: absolute;
  left: 50%;
  right: 50%;
  background-color: #fff;
  transform: translate(-50%, 96%);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  @media (max-width: 556px) {
    flex-direction: column;
    width: 300px;
  }
`;

export const ContainerLogin = styled.div`
  max-width: 500px;
  width: 500px;
  background-color: #fff;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  @media (max-width: 556px) {
    flex-direction: column;
    width: 300px;
  }
`;