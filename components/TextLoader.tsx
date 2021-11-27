import styled from 'styled-components';

type LoaderType = {
  width: string;
  height: string;
}

const StyledTextLoader = styled.div<LoaderType>`
  margin: 2px 0;
  background: linear-gradient( 90deg, rgba(0,0,0,.1), rgba(0,0,0,.2));
  background-size: 200%;
  border-radius: 3px;
  height: ${(props) => (props.height)};
  width: ${(props) => (props.width)};
  animation: portfolio 1s linear infinite;

  @keyframes portfolio {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient( 90deg, rgba(0,0,0,.2), rgba(0,0,0,.4));
  }
`;

const TextLoader = ({ width, height }: LoaderType) => (<StyledTextLoader width={width} height={height} />);

export default TextLoader;
