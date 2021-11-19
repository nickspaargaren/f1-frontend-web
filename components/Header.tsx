import Link from 'next/link';
import { ReactElement } from 'react';
import { ImHome2, ImTrophy, ImUser } from 'react-icons/im';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: #e10600;
  position: sticky;
  top: 0;
  z-index: 1;

  .title {
    font-size: 1.5em;
    margin: auto 0;
    font-weight: bold;
  }

`;

const Bar = styled.div`
  color: #fff;
  padding: 10px;
  display: flex;
  display: flex;
  background-color: ${(props) => (props.color)};
`;

const Icons = styled.div`
  margin-left: auto;
  display: flex;
`;

type IconProps = {
  disabled?: boolean
}

const Icon = styled.div<IconProps>`
  margin-left: 10px;
  padding: 5px;
  text-align: center;
  font-size: 20px;
  opacity: ${(props) => (props.disabled ? '.5' : '1')};
`;

const Winner = styled.div`
  display: flex;
  margin-left: auto;

  svg {color: #c99128; margin-left: 5px; position: relative; top: 1px;}
`;

type HeaderTitleProps = {
  title: string,
  winner?: string
}

const Header = ({ title, winner }: HeaderTitleProps): ReactElement => (
  <>

    <StyledHeader>
      <Bar color="#e20600">
        <div className="title">Racetijden</div>
        <Icons>
          <Link href="/">
            <a><Icon><ImHome2 /></Icon></a>
          </Link>
          <Icon disabled><ImUser /></Icon>
        </Icons>
      </Bar>
      <Bar color="#15151e">
        {title}
        {winner && (
        <Winner>
          {winner}

          <ImTrophy />

        </Winner>

        )}
      </Bar>

    </StyledHeader>

  </>
);
export default Header;
