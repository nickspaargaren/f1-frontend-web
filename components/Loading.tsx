import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
    margin: 0 auto;
    width: 134px;
    height: 134px;
    position: relative;
    display: block;
    padding: 30px;
    text-align: center;
    font-size: 13px;
`;

const Loading = (): ReactElement => (
  <StyledLoading>
    <svg xmlns="http://www.w3.org/2000/svg" width="58px" height="58px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#e20600" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
      </circle>
    </svg>
    <div>Laden...</div>
  </StyledLoading>
);

export default Loading;
