import { motion } from 'framer-motion';
import { ImTrophy } from 'react-icons/im';
import styled from 'styled-components';

const StyledWinner = styled.div`
  display: flex;
  margin-left: auto;

  svg {color: #c99128; margin-left: 5px; position: relative; top: 1px;}
`;

type WinnerType = {
  title: string;
  animate?: boolean;
}

const Winner = ({ title, animate }: WinnerType) => (
  <StyledWinner>
    {title}
    {animate ? (
      <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -10, 0] }}>
        <ImTrophy />
      </motion.div>
    ) : <ImTrophy />}

  </StyledWinner>
);

export default Winner;
