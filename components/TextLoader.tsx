import styled from 'styled-components';

type LoaderType = {
  width: string;
  height: string;
}

const StyledTextLoader = styled.div<LoaderType>`
  margin: 2px 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 33%, rgba(0,0,0,0.15) 66%);
  background-size: 200%;
  border-radius: 3px;
  height: ${({ height }) => (height)};
  width: ${({ width }) => (width)};
  animation: portfolio 1s linear infinite;

  @keyframes portfolio {
    0% {
      background-position: 200%;
    }
    100% {
      background-position: 0%;
    }
  }

`;

const TextLoader = ({ width, height }: LoaderType) => (<StyledTextLoader width={width} height={height} />);

export default TextLoader;
