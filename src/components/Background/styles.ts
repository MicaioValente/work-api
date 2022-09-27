import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;

  place-items: center;

  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const Container2 = styled.div`
  width: 100%;

  @media (orientation: portrait) {
    height: 100%;

    svg {
      padding-top: 80px;
      transform: scale(300%);
    }
  }

  @media (max-width: 700px) {
    height: 100%;

    svg {
      padding-top: 80px;
      transform: scale(300%);
    }
  }

  stop {
    stop-opacity: 0.5%;
    animation: animate-stop 8s infinite linear;

    &.stop-1 {
      animation-delay: 8s;
    }
    &.stop-2 {
      animation-delay: 6s;
    }
    &.stop-3 {
      animation-delay: 4s;
    }
    &.stop-4 {
      animation-delay: 2s;
    }
    &.stop-5 {
    }
  }

  @keyframes animate-stop {
    20% {
      stop-opacity: 0.5%;
    }
    50% {
      stop-opacity: 60%;
    }
    80% {
      stop-opacity: 0.5%;
    }
  }
`;
