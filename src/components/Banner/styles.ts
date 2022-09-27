import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-height: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  position: relatiae;
  overflow: hidden;
  box-shadow: inset 0 100px 60px -60px ${({ theme }) => theme.colors.text};

  @media (max-width: 1100px) {
    padding: 30px;
    min-height: 536px;
  }

  a {
    text-align: center;
    width: 100%;
    max-width: 514px;
    min-height: 62px;
    display: grid;
    place-items: center;

    font-size: ${({ theme }) => theme.typography.sizes[2]};
    font-weight: ${({ theme }) => theme.typography.weights[3]};
    font-family: ${({ theme }) => theme.typography.family1};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    border-radius: 8px 32px;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    transition: ease-in-out 0.3s;

    @media (max-width: 500px) {
      font-size: ${({ theme }) => theme.typography.sizes[1]};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const Text = styled.p`
  max-width: 1045px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes[5]};
  font-family: ${({ theme }) => theme.typography.family1};
  font-weight: ${({ theme }) => theme.typography.weights[2]};
  color: ${({ theme }) => theme.colors.white};
  line-height: 150%;

  @media (max-width: 1100px) {
    font-size: ${({ theme }) => theme.typography.sizes[3]};
  }

  strong {
    font-family: ${({ theme }) => theme.typography.family1};
  }
`;
