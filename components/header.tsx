import Link from 'next/link';
import { ReactElement } from 'react';
import { ImHome2, ImTrophy, ImUser } from 'react-icons/im';
import styled from 'styled-components';

const StyledHeader = styled.div`
  border-top: 10px solid #fff;
  background-color: #e10600;
  color: #fff;
  padding: 10px;
  display: flex;

  .title {
    font-size: 1.5em;
    margin: auto 0;
    font-weight: bold;
  }

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

const Title = styled.div`
  background: #15151e;
  color: #fff;
  padding: 10px;
  display: flex;
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
      <div className="title">Racetijden.nl</div>
      <Icons>
        <Link href="/">
          <a><Icon><ImHome2 /></Icon></a>
        </Link>
        <Icon disabled><ImUser /></Icon>
      </Icons>
    </StyledHeader>

    <Title>
      {title}
      {winner && (
      <Winner>
        {winner}

        <ImTrophy />

      </Winner>

      )}
    </Title>

  </>
);
export default Header;
