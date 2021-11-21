import { ImTrophy } from 'react-icons/im';
import styled from 'styled-components';

const StyledWinner = styled.div`
  display: flex;
  margin-left: auto;

  svg {color: #c99128; margin-left: 5px; position: relative; top: 1px;}
`;

type WinnerType = {
  title: string;
}

const Winner = ({ title }: WinnerType) => (
  <StyledWinner>
    {title}
    <ImTrophy />
  </StyledWinner>
);

export default Winner;
