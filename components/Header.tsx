import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ReactElement } from "react";
import { ImHome2 } from "react-icons/im";
import styled from "styled-components";

import Winner from "./Winner";

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;

  > div:first-child {
    z-index: 1;
  }

  .title {
    font-size: 1.5em;
    margin: auto 0;
    font-weight: bold;
  }
`;

const Bar = styled.div`
  position: relative;
  color: #fff;
  padding: 10px;
  display: flex;
  display: flex;
  background-color: ${(props) => props.color};
`;

const Icons = styled.div`
  margin-left: auto;
  display: flex;
`;

type IconProps = {
  disabled?: boolean;
};

const Icon = styled.div<IconProps>`
  margin-left: 10px;
  padding: 5px;
  text-align: center;
  font-size: 20px;
  opacity: ${(props) => (props.disabled ? ".5" : "1")};
`;

type HeaderTitleProps = {
  title: string;
  winner?: string;
};

const Header = ({ title, winner }: HeaderTitleProps): ReactElement => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -54]);

  return (
    <>
      <StyledHeader>
        <Bar color="#e20600">
          <Link href="/" className="title">
            Racetijden
          </Link>
          <Icons>
            <Link href="/">
              <Icon>
                <ImHome2 />
              </Icon>
            </Link>
          </Icons>
        </Bar>
        <motion.div style={{ y }}>
          <Bar color="#15151e">
            {title}
            {winner && <Winner title={winner} animate />}
          </Bar>
        </motion.div>
      </StyledHeader>
    </>
  );
};
export default Header;
